import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUsersUseCase } from "../createUsers/CreateUsersUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserCase: CreateUsersUseCase;


describe("Authenticate user", ()=>{
    beforeEach(()=>{
        userRepositoryInMemory = new UserRepositoryInMemory();;
        authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepositoryInMemory
        );
        createUserCase = new CreateUsersUseCase(userRepositoryInMemory);
    });
    it("should be able to authenticate an user", async ()=>{
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@test.com",
            password: "1234",
            name: "User Test"
        };

        await createUserCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });
    
    it("should not able to authenticate an nonexistent user", ()=> {
        expect(async()=>{
            await authenticateUserUseCase.execute({
                email: "user@test.com",
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able authenticate with incorrect password", ()=>{
        expect(async ()=> {
            const user: ICreateUserDTO = {
                driver_license: "999999",
                email: "user@test.com",
                password: "1234",
                name: "User Test Error"
            };
            await createUserCase.execute(user);
            await authenticateUserUseCase.execute({
                email: "user@test.com",
                password: "incorrect",
            });
        }).rejects.toBeInstanceOf(AppError);

    });
});