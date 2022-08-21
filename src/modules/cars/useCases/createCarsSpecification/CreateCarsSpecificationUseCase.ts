import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../infra/repositories/ICarsRepository";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

//@injectable()
class CreateCarsSpecificationUseCase {
    constructor(
        //@inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}
    async execute({car_id, specifications_id}: IRequest): Promise<void> {
        const carExists = await this.carsRepository.findById(car_id);

        if(!carExists){
            throw new AppError("Car does not exists");
        }
    }
}

export { CreateCarsSpecificationUseCase }