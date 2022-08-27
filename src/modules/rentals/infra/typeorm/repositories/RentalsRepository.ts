import { getRepository, Repository } from "typeorm";
import { ICreateRentalDtos } from "../../../dtos/ICreateRentalsDtos";
import { Rental } from "../entities/Rentals";
import { IRentalRepository } from "./IRentalRepository";


class RentalsRepository implements IRentalRepository {
    private repository: Repository<Rental>;

    constructor(){
        this.repository = getRepository(Rental);
    }
   async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne(car_id);
        return openByCar;
    }
   async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne(user_id);
        return openByUser;
    }
   async  create({car_id, expected_return_date, user_id}: ICreateRentalDtos): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
        });
        await this.repository.save(rental);

        return rental;
    }

}

export { RentalsRepository }