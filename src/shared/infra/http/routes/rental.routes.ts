import { Router } from "express";
import { ListRentalByUserController } from "../../../../modules/cars/useCases/ListRentalByUser/ListRentalByUserController";
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRentals/DevolutionRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();
rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get('/user', ensureAuthenticated, listRentalByUserController.handle);
export { rentalRoutes }