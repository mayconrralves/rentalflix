import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/AppError'
import { ISpecificationsRepository } from '../../repositories/implements/ISpecificationsRepository'

interface IRequest {
    description: string
    name: string
}
@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}
    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists =
            await this.specificationsRepository.findByName(name)
        if (specificationAlreadyExists) {
            throw new AppError('Specification Category exists')
        }
        await this.specificationsRepository.create({
            name,
            description,
        })
    }
}

export { CreateSpecificationUseCase }
