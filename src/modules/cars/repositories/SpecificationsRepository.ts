import { Specification } from "../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "./implements/ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository{
    private specifications: Specification[];
    private static INSTANCE;
    private constructor(){
        this.specifications = [];
    }
    public static getInstance(){
        if(!SpecificationRepository.INSTANCE){
            SpecificationRepository.INSTANCE = new SpecificationRepository();
        }
        return SpecificationRepository.INSTANCE;
    }
    findByName(name: string): Specification {
       const specification = this.specifications.find(
        (specification)=> specification.name === name);
        return specification;
    }
    
    create({ description, name }: ICreateSpecificationDTO): void {
        const specification = new Specification();
        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });
        this.specifications.push(specification);
    }



}

export { SpecificationRepository };