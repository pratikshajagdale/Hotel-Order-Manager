import { Router } from "express";
import ownerController from "../controllers/owner.controllers.js";

const router = Router();
router.post('/login', ownerController.login);
router.post('/register', ownerController.create);
router.post('/verify', ownerController.verify);
router.post('/forget', ownerController.forget);
router.post('/reset', ownerController.reset);

export default router;
