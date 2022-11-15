import { container } from 'tsyringe';
import './provider';
import { IUsersRepository } from '../../modules/accounts/infra/repositories/IUsersRepository';
import { CategoriesRepository } from '../../modules/cars/infra/repositories/CategoriesRepository';
import { SpecificationRepository } from '../../modules/cars/infra/repositories/SpecificationsRepository';
import { UsersRepository } from '../../modules/accounts/infra/repositories/UsersRepository';
import { ISpecificationsRepository } from '../../modules/cars/infra/repositories/ISpecificationsRepository';
import { ICategoriesRepository } from '../../modules/cars/infra/repositories/ICategoriesRepository';
import { ICarsRepository } from '../../modules/cars/infra/repositories/ICarsRepository';
import { CarsRepository } from '../../modules/cars/infra/repositories/CarsRepository';
import { ICarImagesRepository } from '../../modules/cars/infra/repositories/ICarImagesRepository';
import { CarImagesRepository } from '../../modules/cars/infra/repositories/CarImagesRepository';
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository';

import { UsersTokensRepository } from '../../modules/accounts/infra/repositories/UsersTokensRepository';
import { IUsersTokensRepository } from '../../modules/accounts/infra/repositories/IUsersTokensRepository';

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationRepository
);
container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarImagesRepository>(
    'CarImagesRepository',
    CarImagesRepository
);

container.registerSingleton<RentalsRepository>(
    'RentalsRepository',
    RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
    'UsersTokensRepository',
    UsersTokensRepository
);
