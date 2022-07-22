import { ISpecificationsRepository } from "../../repositories/implements/ISpecificationsRepository";

interface IRequest {
    description: string,
    name: string,
}
class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository){}
    execute({ name, description}: IRequest): void{
        
        const specificationAlreadyExists = this.specificationsRepository.findByName(name);
        if(specificationAlreadyExists){
            throw new Error("Specification Category exists");
        }
        this.specificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase }