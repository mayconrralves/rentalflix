import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../infra/repositories/ICarsRepository";
import { ISpecificationsRepository } from "../../infra/repositories/ISpecificationsRepository";
import { Car } from "../../infra/typeorm/entities/Car";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarsSpecificationUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ){}
    async execute({car_id, specifications_id}: IRequest): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);

        if(!carExists){
            throw new AppError("Car does not exists");
        }
        const specifications = await this.specificationsRepository.findByIds(specifications_id);
        
        carExists.specifications = specifications;

        await this.carsRepository.create(carExists);
        return carExists;
    }

}

export { CreateCarsSpecificationUseCase }