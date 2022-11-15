import { DayjsDateProvider } from '../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '../../infra/repositories/in-memory/UserRepositoryInMemory';
import { UserTokensRepositoryInMemory } from '../../infra/repositories/in-memory/UserTokensRepositoryInMemory';
import { IUsersRepository } from '../../infra/repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../infra/repositories/IUsersTokensRepository';

import { CreateUsersUseCase } from '../createUsers/CreateUsersUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: IUsersRepository;
let userTokensRepositoryInMemory: IUsersTokensRepository;
let createUserCase: CreateUsersUseCase;
let dateProvider: DayjsDateProvider;

describe('Authenticate user', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepositoryInMemory,
            userTokensRepositoryInMemory,
            dateProvider
        );
        createUserCase = new CreateUsersUseCase(userRepositoryInMemory);
    });
    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: 'user@test.com',
            password: '1234',
            name: 'User Test',
        };

        await createUserCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });

    it('should not able to authenticate an nonexistent user', () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'user@test.com',
                password: '1234',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able authenticate with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '999999',
                email: 'user@test.com',
                password: '1234',
                name: 'User Test Error',
            };
            await createUserCase.execute(user);
            await authenticateUserUseCase.execute({
                email: 'user@test.com',
                password: 'incorrect',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
