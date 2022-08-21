import { Router } from 'express';

import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationRoutes = Router()
const createSpecificationsController = new CreateSpecificationController()
specificationRoutes.post('/', ensureAuthenticated, ensureAdmin, createSpecificationsController.handle)

export { specificationRoutes }
