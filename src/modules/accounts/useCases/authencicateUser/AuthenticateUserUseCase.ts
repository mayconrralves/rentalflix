import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import auth from '../../../../config/auth'
import { IDateProvider } from '../../../../shared/container/provider/DateProvider/IDateProvider'

import { AppError } from '../../../../shared/errors/AppError'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'

interface IRequest {
    email: string
    password: string
}
interface IResponse {
    user: {
        email: string
        name: string
    }
    token: string,
    refresh_token: string;
}
@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email)
        if (!user) {
            throw new AppError('Email or Password is incorrect', 401)
        }

        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new AppError('Email or password is incorrect', 401)
        }
        
        const token = sign({}, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token,
        });

        const refresh_token = sign({ email }, auth.secret_refresh_token,{
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token
        });

        const refresh_token_expires_date = this.dateProvider.addDays(
            auth.expires_in_refresh_token_days
        );
        this.usersTokensRepository.create({
            user_id: user.id,
            expires_date: refresh_token_expires_date,
            refresh_token,
        });

        const tokenReturn: IResponse = {
            token,
            refresh_token,
            user: {
                name: user.name,
                email: user.email
            }
        }
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }
