import { getRepository, Repository } from "typeorm";
import { Car } from "../typeorm/entities/Car";
import { CarImage } from "../typeorm/entities/CarImage";
import { ICarImagesRepository } from "./ICarImagesRepository";

class CarImagesRepository implements ICarImagesRepository{

    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }
    async create(car_id: string, image_name: string): Promise<CarImage> {
      const carImage = this.repository.create({
        car_id,
        image_name,
      });
      await this.repository.save(carImage);

      return carImage;
    }

}

export { CarImagesRepository }