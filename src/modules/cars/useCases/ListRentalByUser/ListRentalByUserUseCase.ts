import { inject, injectable } from "tsyringe";
import { Rental } from "../../../rentals/infra/typeorm/entities/Rentals";
import { IRentalRepository } from "../../../rentals/infra/typeorm/repositories/IRentalRepository";

@injectable()
class ListRentalByUserUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalRepository
    ){}
    async execute(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.rentalsRepository.findByUser(user_id);
        return rentalsByUser;
    }
}

export { ListRentalByUserUseCase}