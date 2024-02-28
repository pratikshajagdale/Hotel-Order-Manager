import { Router } from "express";
import ownerController from "../controllers/owner.controllers.js";

const router = Router();
router.post('/', ownerController.create);

export default router;
