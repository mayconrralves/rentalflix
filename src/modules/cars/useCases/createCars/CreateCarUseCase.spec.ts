import { CarsRepositoryInMemory } from "../../infra/repositories/in-memories/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase : CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", ()=>{
    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async ()=>{
            await createCarUseCase.execute({
                name: "car",
                description: "car description",
                daily_rate: 100,
                license_plate: "aab-1234",
                fine_amount: 65,
                brand: "brand car",
                category_id: "category",
            });
    });

    it("should not be able to create a new car that already has a registered"
     + "licence plate", async()=>{
        
        expect(async ()=> {
            await createCarUseCase.execute({
                name: "car",
                description: "car description",
                daily_rate: 100,
                license_plate: "aab-1234",
                fine_amount: 65,
                brand: "brand car",
                category_id: "category",
            });
            await createCarUseCase.execute({
                name: "car",
                description: "car description",
                daily_rate: 100,
                license_plate: "aab-1234",
                fine_amount: 65,
                brand: "brand car",
                category_id: "category",
            });
        })
        
    });

    it("should be able to create a new car with  available by default",async()=>{
        const car = await createCarUseCase.execute({
            name: "car",
            description: "car description",
            daily_rate: 100,
            license_plate: "aab-1234",
            fine_amount: 65,
            brand: "brand car",
            category_id: "category",
        });
        expect(car.available).toBe(true);
    });
});