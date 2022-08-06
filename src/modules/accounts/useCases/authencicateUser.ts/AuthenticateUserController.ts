import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUseCase } from './AuthencicateUserUseCase'

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password, email } = request.body
        const authenticateUserUseCase = container.resolve(
            AuthenticateUserUseCase
        )
        const data = await authenticateUserUseCase.execute({
            email,
            password,
        })

        return response.json(data)
    }
}

export { AuthenticateUserController }
