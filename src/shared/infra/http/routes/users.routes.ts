import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../config/upload';

import { CreateUsersController } from '../../../../modules/accounts/useCases/createUsers/CreateUsersController';
import { ProfileUserController } from '../../../../modules/accounts/useCases/profileUser/ProfileUserController';
import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/updateUserAvatarUseCase/UpdateUserAvatarController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);
const createUsersController = new CreateUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post('/', createUsersController.handle);
usersRoutes.patch(
    '/avatar',
    ensureAuthenticated,
    uploadAvatar.single('avatar'),
    updateUserAvatarController.handle
);
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
