import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICategoriesRepository } from '../../infra/repositories/ICategoriesRepository';
import { Category } from '../../infra/typeorm/entities/Category';

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {
        this.categoriesRepository = categoriesRepository;
    }
    async execute({ name, description }: IRequest): Promise<Category> {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name)
        if (categoryAlreadyExists) {
            throw new AppError('Category already exists')
        }
       const category = await this.categoriesRepository.create({ name, description });
       return category;
    }
}

export { CreateCategoryUseCase }
