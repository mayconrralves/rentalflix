import { getRepository, Repository } from "typeorm";
import { ICreateRentalDtos } from "../../../dtos/ICreateRentalsDtos";
import { Rental } from "../entities/Rentals";
import { IRentalRepository } from "./IRentalRepository";


class RentalsRepository implements IRentalRepository {
    private repository: Repository<Rental>;

    constructor(){
        this.repository = getRepository(Rental);
    }
    
    async findByUser(user_id: string): Promise<Rental[]> {
       const rentals = await this.repository.find({
        where: { user_id },
        relations: [ 'car' ],   
       });
       console.log(user_id, rentals)
       return rentals;
    }
    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id);
        return rental;
    }
   async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({
            where: {car_id, end_date: null }    
        });
        return openByCar;
    }
   async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({
            where: { end_date: null, user_id }
        });
        return openByUser;
    }
   async  create({car_id, expected_return_date, user_id, end_date, id, total}: ICreateRentalDtos): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
            id,
            end_date,
            total
        });
        await this.repository.save(rental);

        return rental;
    }

}

export { RentalsRepository }