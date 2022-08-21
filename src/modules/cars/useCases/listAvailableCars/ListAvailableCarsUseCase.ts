import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "../../infra/repositories/ICarsRepository";
import { Car } from "../../infra/typeorm/entities/Car";

interface IRequest {
    brand?: string;
    category_id?: string;
    name?: string;
}
@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}
    async execute({brand, category_id, name}: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(
            brand, category_id,name
        );
        return cars;

    }

}

export { ListAvailableCarsUseCase}