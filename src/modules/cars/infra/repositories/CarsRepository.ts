import { getRepository, Repository } from "typeorm";
import { ICreateCarsDTO } from "../../dtos/ICreateCarsDTO";
import { Car } from "../typeorm/entities/Car";
import { ICarsRepository } from "./ICarsRepository";


class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;
    constructor(){
        this.repository = getRepository(Car);
    }
    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car;
    }
    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = this.repository.createQueryBuilder("c")
            .where("available = :available", { available: true});

        if(brand){
            carsQuery.andWhere("c.brand = :brand", { brand });
        }
        if(name){
            carsQuery.andWhere("c.name = :name", { name });
        }
        if(category_id){
            carsQuery.andWhere("c.category = :category_id", { category_id });
        }
        const cars = await carsQuery.getMany();

        return cars;
    }
   async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        specifications,
        id,
    }: ICreateCarsDTO): Promise<Car> {
      const car = this.repository.create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        specifications,
        id,
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