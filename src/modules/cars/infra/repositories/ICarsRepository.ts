import { ICreateCarsDTO } from "../../dtos/ICreateCarsDTO";
import { Car } from "../typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarsDTO): Promise<Car>;
    findAvailable(brand?: string, name?: string, category_id?: string): Promise<Car[]>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findById(id: string): Promise<Car>;
}

export { ICarsRepository }