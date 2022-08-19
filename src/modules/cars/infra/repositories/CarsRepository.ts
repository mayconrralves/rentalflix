import { getRepository, Repository } from "typeorm";
import { ICreateCarsDTO } from "../../dtos/ICreateCarsDTO";
import { Car } from "../typeorm/entities/Car";
import { ICarsRepository } from "./ICarsRepository";


class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;
    constructor(){
        this.repository = getRepository(Car);
    }
   async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name
    }: ICreateCarsDTO): Promise<Car> {
      const car = this.repository.create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name
      });
       await this.repository.save(car);
       return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate
        });
        return car;
    }
}

export { CarsRepository }