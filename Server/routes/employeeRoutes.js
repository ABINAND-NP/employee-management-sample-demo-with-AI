import express from "express";

import {
    addEmployee,
    getEmployees,
    deleteEmployee
} from "../controllers/employeeController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import rateLimitMiddleware from "../middleware/rateLimitMiddleware.js";

const router = express.Router();

router.post(
    "/add",
    rateLimitMiddleware,
    authMiddleware,
    roleMiddleware("Admin"),
    addEmployee
);

router.get(
    "/",
    rateLimitMiddleware,
    authMiddleware,
    roleMiddleware("Admin", "HR"),
    getEmployees
);

router.delete(
    "/delete/:id",
    rateLimitMiddleware,
    authMiddleware,
    roleMiddleware("Admin"),
    deleteEmployee
);

export default router;