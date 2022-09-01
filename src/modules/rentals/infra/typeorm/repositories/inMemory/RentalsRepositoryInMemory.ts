
import { ICreateRentalDtos } from "../../../../dtos/ICreateRentalsDtos";
import { Rental } from "../../entities/Rentals";
import { IRentalRepository } from "../IRentalRepository";

class RentalsRepositoryInMemory implements IRentalRepository {
    
    rentals: Rental[] = [];
    async findById(id: string): Promise<Rental> {
       const rental = this.rentals.find(rental=> rental.id === id);
       return rental;
    }

    async create({car_id,expected_return_date,user_id}: ICreateRentalDtos): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            expected_return_date,
            user_id,
            start_date: new Date(),
        });
        this.rentals.push(rental);
        return rental;
    }
    
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const car =  this.rentals.find(
            rental=> rental.car_id === car_id && !rental.end_date
        );
            return car;
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const car = this.rentals.find(
            rental=> rental.user_id === user_id && !rental.end_date
        );
        return car;
    }


}

export { RentalsRepositoryInMemory }