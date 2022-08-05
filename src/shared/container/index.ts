import { container } from 'tsyringe'

import { CategoriesRepository } from '../../modules/cars/repositories/CategoriesRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/implements/ICategoriesRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/implements/ISpecificationsRepository'
import { SpecificationRepository } from '../../modules/cars/repositories/SpecificationsRepository'

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationRepository
)
container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
)
