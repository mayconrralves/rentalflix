
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/provider/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepository } from "../../../cars/infra/repositories/CarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rentals";
import { IRentalRepository } from "../../infra/typeorm/repositories/IRentalRepository";



interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: CarsRepository,
    ){}
    async execute({user_id, car_id, expected_return_date}:IRequest): Promise<Rental> {
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
        if(carUnavailable){
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
            user_id
        );
        if(rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user");
        }
        
        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(dateNow,expected_return_date);
        if(compare < 24){
            throw new AppError("Invalid return time!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false)
      
        return rental;
    }
}

export { CreateRentalUseCase  }