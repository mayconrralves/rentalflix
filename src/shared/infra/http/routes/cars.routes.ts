import { Router } from "express";
import multer from "multer";
import { CreateCarController } from "../../../../modules/cars/useCases/createCars/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarsSpecification/CreateCarsSpecificationController.";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailabeCarsController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import uploadConfig from "../../../../config/upload";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig);

carsRoutes.post("/", ensureAuthenticated,ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post("/specifications/:id", ensureAuthenticated,ensureAdmin,createCarSpecificationController.handle);
carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin,upload.array("images"), uploadCarImagesController.handle);

export { carsRoutes }
