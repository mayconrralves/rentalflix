import { CarsRepositoryInMemory } from "../../infra/repositories/in-memories/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
describe("List Cars ", ()=>{

    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });
    it ("should be able to list all available cars", async ()=>{

        const car = await carsRepositoryInMemory.create({
            name: "car1",
            description: "description",
            daily_rate: 100.0,
            license_plate: "xxx-xxx",
            fine_amount: 10,
            brand: "CAr brand",
            category_id: "category",
        });
        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async ()=>{
        const name = "car2"
        const car = await carsRepositoryInMemory.create({
            name,
            description: "description",
            daily_rate: 100.0,
            license_plate: "xxx-xxx",
            fine_amount: 10,
            brand: "Car brand",
            category_id: "category",
        });
        const cars = await listAvailableCarsUseCase.execute({name});
        expect(cars).toEqual([car]);
    });
    it("should be able to list all available cars by brand", async ()=>{
        const brand = "brand car2";
        const car = await carsRepositoryInMemory.create({
            name: "car3",
            description: "description",
            daily_rate: 100.0,
            license_plate: "xxx-xxx",
            fine_amount: 10,
            brand,
            category_id: "category",
        });
        const cars = await listAvailableCarsUseCase.execute({brand});
        expect(cars).toEqual([car]);
    });
    it("should be able to list all available cars by brand", async ()=>{
        const category_id = "category car2";
        const car = await carsRepositoryInMemory.create({
            name: "car3",
            description: "description",
            daily_rate: 100.0,
            license_plate: "xxx-xxx",
            fine_amount: 10,
            brand: "brand car",
            category_id,
        });
        const cars = await listAvailableCarsUseCase.execute({category_id});
        expect(cars).toEqual([car]);
    });
});