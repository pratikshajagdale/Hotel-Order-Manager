import { Router } from "express";
import ownerRoutes from "./owner.routes.js";

const router = Router();
router.use('/owner', ownerRoutes);

export default router
