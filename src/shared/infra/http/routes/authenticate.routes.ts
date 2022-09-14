import { Router } from 'express';
import { AuthenticateUserController } from '../../../../modules/accounts/useCases/authencicateUser/AuthenticateUserController';
import { RefreshTokenController } from '../../../../modules/accounts/useCases/refreshToken/RefreshTokenController';


const authenticateRoute = Router();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoute.post('/sessions', authenticateUserController.handle);
authenticateRoute.post('/refresh-token', refreshTokenController.handle);

export { authenticateRoute }
