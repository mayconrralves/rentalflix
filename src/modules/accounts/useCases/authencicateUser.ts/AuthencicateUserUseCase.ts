import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { UsersRepository } from '../../repositories/implementations/UsersRepository'

interface IRequest {
    email: string
    password: string
}
interface IResponse {
    user: {
        email: string
        name: string
    }
    token: string
}
@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)
        if (!user) {
            throw new Error('Email or Password is incorrect')
        }
        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new Error('Email or password is incorrect')
        }
        const token = sign({}, 'qualquercoisa', {
            subject: user.id,
            expiresIn: '1d',
        })
        return {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        }
    }
}

export { AuthenticateUserUseCase }
