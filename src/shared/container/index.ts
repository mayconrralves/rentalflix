import { container } from 'tsyringe'

import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { CategoriesRepository } from '../../modules/cars/infra/repositories/CategoriesRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository'
import { SpecificationRepository } from '../../modules/cars/infra/repositories/SpecificationsRepository'
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository'

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
