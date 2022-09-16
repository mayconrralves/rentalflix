import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/provider/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayload {
     sub: string;
     email: string;
}
@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DateProvider")
        private DateProvider: IDateProvider,
    )  {} 
    async execute(token: string ): Promise<string>{
        const {email, sub } = verify(token,auth.secret_refresh_token) as IPayload;
        const user_id = sub;

      const userToken =   await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id,token);

      if(!userToken){
        throw new AppError("Refresh token does not exists");
      }

      await this.usersTokensRepository.deleteById(userToken.id);
      const expires_date = this.DateProvider.addDays(
        auth.expires_in_refresh_token_days 
      )
      const refresh_token = sign({ email }, auth.secret_refresh_token,{
        subject: sub,
        expiresIn: auth.expires_in_refresh_token
      });
      await this.usersTokensRepository.create({
        expires_date,
        refresh_token,
        user_id
      });
      return refresh_token;
      
    }
}

export { RefreshTokenUseCase }