import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../infra/typeorm/repositories/inMemory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
describe("Create Rental", ()=>{
    beforeEach(()=>{
        rentalsRepository = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
    });

    it("should be able to create a new rental",async ()=> {
      const rental =   await createRentalUseCase.execute(
            {
                car_id: "12345",
                user_id: "12345",
                expected_return_date: new Date(),
            }
        );
        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it("should not be able to create a new rental if there is another open to the same user",async ()=> {
       
        expect (
            async ()=>{
                await createRentalUseCase.execute(
                    {
                        car_id: "12345",
                        user_id: "test",
                        expected_return_date: new Date(),
                    }
                );
           await createRentalUseCase.execute(
                  {
                      car_id: "12346",
                      user_id: "test",
                      expected_return_date: new Date(),
                  }
              );
            }
        ).rejects.toBeInstanceOf(AppError);
      });

      it("should not be able to create a new rental if there is another open to the same car",async ()=> {
       
        expect (
            async ()=>{
                await createRentalUseCase.execute(
                    {
                        car_id: "test",
                        user_id: "12345",
                        expected_return_date: new Date(),
                    }
                );
            await createRentalUseCase.execute(
                  {
                      car_id: "test",
                      user_id: "12346",
                      expected_return_date: new Date(),
                  }
              );
            }
        ).rejects.toBeInstanceOf(AppError);
      });
});