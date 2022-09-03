import dayjs from "dayjs";
import { IDateProvider } from "../../../../shared/container/provider/DateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider";

import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/infra/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "../../../cars/infra/repositories/in-memories/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../infra/typeorm/repositories/inMemory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let carsRepository: ICarsRepository;
let dateProvider: IDateProvider;

describe("Create Rental", ()=>{
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(()=>{
        rentalsRepository = new RentalsRepositoryInMemory();
        carsRepository = new CarsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dateProvider, carsRepository);
    });

    it("should be able to create a new rental",async ()=> {
        const car = await carsRepository.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "xxx-2222",
            brand: "test",
            category_id: "1111",
            fine_amount: 100,
        });
      const rental = await createRentalUseCase.execute(
            {
                car_id: car.id,
                user_id: "12345",
                expected_return_date: dayAdd24Hours,
            }
        );
        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it("should not be able to create a new rental if there is another open to the same car", async ()=> {
        
        const car = await carsRepository.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "xxx-2222",
            brand: "test",
            category_id: "1111",
            fine_amount: 100,
        });
        await createRentalUseCase.execute(
           {
               car_id: car.id,
               user_id: "test",
               expected_return_date: dayAdd24Hours,
           }
       );
       await expect ( createRentalUseCase.execute(
                  {
                      car_id: car.id,
                      user_id: "test",
                      expected_return_date: dayAdd24Hours,
                  }
              )
        ).rejects.toEqual(new AppError("Car is unavailable"));
      });

      it("should not be able to create a new rental if there is another open to the same user",async ()=> {
       
          const car = await carsRepository.create({
              name: "Test",
              description: "Car test",
              daily_rate: 100,
              license_plate: "xxx-2222",
              brand: "test",
              category_id: "1111",
              fine_amount: 100,
          });
          const car2 = await carsRepository.create({
              name: "Test",
              description: "Car test",
              daily_rate: 100,
              license_plate: "xxx-3333",
              brand: "test",
              category_id: "1111",
              fine_amount: 100,
          });
          await createRentalUseCase.execute(
              {
                  car_id: car.id,
                  user_id: "12345",
                  expected_return_date: dayAdd24Hours,
              }
          );
          await expect (createRentalUseCase.execute(
                  {
                      car_id: car2.id,
                      user_id: "12345",
                      expected_return_date: dayAdd24Hours,
                  }
              )
        ).rejects.toEqual(new AppError("There's a rental in progress for user"));
      });
   
      it("should not be able to create a new rental with invalid returned time",  async ()=> {
          const car = await carsRepository.create({
              name: "Test",
              description: "Car test",
              daily_rate: 100,
              license_plate: "xxx-2222",
              brand: "test",
              category_id: "1111",
              fine_amount: 100,
          });
            await expect( createRentalUseCase.execute(
                        {
                            car_id: car.id,
                            user_id: "12345",
                            expected_return_date: dayjs().toDate(),
                        }
                    )
               ).rejects.toEqual(new AppError("Invalid return time!"));
      });
});