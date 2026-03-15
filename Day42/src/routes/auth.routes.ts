import express from "express";
import { register, login } from "../controllers/auth.controller";
import { validateUser } from "../middlewares/validate.middleware";
import { zodRegisterUser, zodLoginUser } from "../schemas/auth.schema";

const router = express.Router();

// POST /api/auth/register
router.post("/register", validateUser(zodRegisterUser), register);
router.post("/login", validateUser(zodLoginUser), login);
export default router;
