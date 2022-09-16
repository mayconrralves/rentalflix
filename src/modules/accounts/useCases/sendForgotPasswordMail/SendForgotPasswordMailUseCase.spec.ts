import { DayjsDateProvider } from "../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/provider/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "../../repositories/in-memory/UserTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepository: UserRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;
describe("Send Forgot Mail", ()=>{
    beforeEach(()=>{
        userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
        usersRepository = new UserRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepository,
            userTokensRepositoryInMemory,
            dateProvider,
            mailProvider,
        );     
    });

    it("should be able to send a forgot password mail to user",async ()=>{
          const sendMail = jest.spyOn(mailProvider, "sendMail");
        await usersRepository.create({
            driver_license: "ABC555",
            email: "test@test.com",
            name: "Test",
            password: "123456"
        });
        await sendForgotPasswordMailUseCase.execute("test@test.com");
        expect(sendMail). toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async()=>{
        await expect(
            sendForgotPasswordMailUseCase.execute("test2@test.com")
        ).rejects.toEqual(new AppError("User does not exists"));
    });

    it("should be able to create an users token",async ()=>{
        const generateTokenMail = jest.spyOn(userTokensRepositoryInMemory, "create");

         usersRepository.create({
            driver_license: "ABC666",
            email: "test3@test.com",
            name: "Test3",
            password: "123456"
        });
        await sendForgotPasswordMailUseCase.execute("test3@test.com");
        expect(generateTokenMail).toBeCalled();
    });
});