import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rentals";
import { IRentalRepository } from "../../infra/typeorm/repositories/IRentalRepository";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}
class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalRepository
    ){}
    async execute({user_id, car_id, expected_return_date}:IRequest): Promise<Rental> {
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
        console.log("unavailable", carUnavailable)
        if(carUnavailable){
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
            user_id
        );
        if(rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user");
        }
       // console.log("rentalOpenToUser", rentalOpenToUser)
        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase  }