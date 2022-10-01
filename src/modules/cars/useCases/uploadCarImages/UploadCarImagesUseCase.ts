import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/provider/StorageProvider/IStorageProvider";
import { ICarImagesRepository } from "../../infra/repositories/ICarImagesRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}
@injectable()
class UploadCarImagesUseCase {

    constructor
        (@inject("CarImagesRepository")
        private carImagesRepository: ICarImagesRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider

    ){}
    async execute({car_id, images_name}: IRequest): Promise<void> {
        images_name.forEach(async (image)=>{
            await this.carImagesRepository.create(car_id, image);
            await this.storageProvider.save(image, "cars");   
        });
    }
}

export { UploadCarImagesUseCase }