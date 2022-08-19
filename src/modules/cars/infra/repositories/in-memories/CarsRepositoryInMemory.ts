import { Car } from "../../typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(car=> car.license_plate === license_plate);
        return car;
    }


    async create({
        name,
        brand,
        description,
        category_id,
        daily_rate,
        fine_amount,
        license_plate,
    }: ICreateCarsDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            category_id,
            brand,
            daily_rate,
            fine_amount,
            license_plate
        });
        this.cars.push(car);
        return car;
    }

}

export { CarsRepositoryInMemory }