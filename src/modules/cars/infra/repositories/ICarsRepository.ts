import { ICreateCarsDTO } from "../../dtos/ICreateCarsDTO";
import { Car } from "../typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarsDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>
}

export { ICarsRepository }