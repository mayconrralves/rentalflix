import { ICreateRentalDtos } from "../../../dtos/ICreateRentalsDtos";
import { Rental } from "../entities/Rentals";

interface IRentalRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    create(data: ICreateRentalDtos): Promise<Rental>;
}

export { IRentalRepository }