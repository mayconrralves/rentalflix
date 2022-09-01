import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/provider/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/infra/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rentals";
import { IRentalRepository } from "../../infra/typeorm/repositories/IRentalRepository";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
    ) {}
    async execute({id, user_id}: IRequest): Promise<Rental>{
        const MINIMUN_DAILY = 1;
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);
        if(!rental){
            throw new AppError("Rental does not exists");
        }
        const dateNow = this.dateProvider.dateNow();
        let daily = this.dateProvider.compareInDays(
            rental.expected_return_date,
            this.dateProvider.dateNow(),
        );

        if(daily < 1) {
            daily = MINIMUN_DAILY;
        }

        const delay = this.dateProvider.compareInDays(
            dateNow,
            rental.expected_return_date
        );
        
        let total = 1000;

        if(delay > 0){
            const calculate_fine = delay + car.fine_amount;
            total = calculate_fine;
        }
        total += daily + car.daily_rate;
        

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);
        return rental;   
    }
}

export { DevolutionRentalUseCase }