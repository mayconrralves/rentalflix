import { ICreateRentalDtos } from "../../../dtos/ICreateRentalsDtos";
import { Rental } from "../entities/Rentals";

interface IRentalRepository {
    create(data: ICreateRentalDtos): Promise<Rental>;
    findById(id: string): Promise<Rental>;
    findByUser(user_id: string): Promise<Rental[]>;
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalRepository }