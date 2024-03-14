import { Router } from "express";
import userController from "../controllers/user.controllers.js";

const router = Router();
router.post('/register', userController.create);
router.post('/login', userController.login);
router.post('/verify', userController.verify);
router.post('/forget', userController.forget);
router.post('/reset', userController.reset);

export default router;
