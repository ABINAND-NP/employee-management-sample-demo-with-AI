import express from "express";

import {
    addEmployee,
    getEmployees,
    deleteEmployee,
    getITEmloyees,
    getDepartmentEmployeeList,
    getDepartmentAverageSalary,
    sortEmployeesBySalary,
    getEmployeeBasicDetails
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

router.get("/it",getITEmloyees);
router.get("/group",getDepartmentEmployeeList);
router.get("/avg",getDepartmentAverageSalary);
router.get("/sort",sortEmployeesBySalary);
router.get("/project",getEmployeeBasicDetails);

export default router;