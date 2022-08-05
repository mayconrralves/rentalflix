import { container } from 'tsyringe'

import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
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

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
)
