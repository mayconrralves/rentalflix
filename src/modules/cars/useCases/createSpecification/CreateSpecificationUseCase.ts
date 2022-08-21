import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ISpecificationsRepository } from '../../infra/repositories/ISpecificationsRepository'
import { Specification } from '../../infra/typeorm/entities/Specification';

interface IRequest {
    description: string;
    name: string;
}
@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}
    async execute({ name, description }: IRequest): Promise<Specification> {
        const specificationAlreadyExists =
            await this.specificationsRepository.findByName(name);
        if (specificationAlreadyExists) {
            throw new AppError('Specification Category exists');
        }
       const specification =  await this.specificationsRepository.create({
            name,
            description,
        });
        return specification;
    }
}

export { CreateSpecificationUseCase }
