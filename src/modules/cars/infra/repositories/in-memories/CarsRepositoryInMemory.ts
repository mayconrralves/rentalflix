import { ICreateCarsDTO } from "../../../dtos/ICreateCarsDTO";
import { Car } from "../../typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
  
    async findById(id: string): Promise<Car> {
      return this.cars.find(car=>car.id === id);
    }
    async findAvailable(brand?: string, category_id?: string,name?: string): Promise<Car[]> {
         
      if(brand){
        return this.cars.filter(car=> car.available && car.brand === brand);
      }
      if(category_id){
        return this.cars.filter(car=> car.available && car.category_id === category_id);
      }
      if(name){
        return this.cars.filter(car=> car.available && car.name === name);
      }
        return this.cars.filter(car=> car.available);
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(car=> car.license_plate === license_plate);
        return car;
    }


    async create({
      brand,
      category_id,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      name,
      specifications,
      id
    }: ICreateCarsDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            category_id,
            brand,
            daily_rate,
            fine_amount,
            license_plate,
            specifications,
            id,
        });
        this.cars.push(car);
        return car;
    }

}

export { CarsRepositoryInMemory }