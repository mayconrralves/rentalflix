import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../infra/repositories/in-memories/CarsRepositoryInMemory";
import { CreateCarsSpecificationUseCase } from "./CreateCarsSpecificationUseCase";


let createCarsSpecificationUseCase:CreateCarsSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("Create Car Specification", ()=>{
    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarsSpecificationUseCase = new CreateCarsSpecificationUseCase(carsRepositoryInMemory);
    });

    it("should not be able to add a new specification  to the nonexistent car", async ()=>{
        const car_id = "1234";
        const specifications_id = ["54321"];
        expect(async ()=> {
            await createCarsSpecificationUseCase.execute({car_id, specifications_id});
        }).rejects.toBeInstanceOf(AppError);
    });
    
    it("should be able to add a new specification  to the car", async ()=>{
        const car_id = "1234";
        const specifications_id = [ "54321"];
        const car = await carsRepositoryInMemory.create({
            name: "car",
            description: "car description",
            daily_rate: 100,
            license_plate: "aab-1234",
            fine_amount: 65,
            brand: "brand car",
            category_id: "category",
        });
        await createCarsSpecificationUseCase.execute({car_id: car.id, specifications_id});
    });
})

