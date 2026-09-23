import Employee from "../models/Employee.js";

// ADD EMPLOYEE
const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            department,
            designation,
            joiningDate
        } = req.body;

        if (
            !name ||
            !email ||
            !phone ||
            !department ||
            !designation ||
            !joiningDate
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingEmployee = await Employee.findOne({ email });

        if (existingEmployee) {
            return res.status(409).json({
                message: "Employee already exists"
            });
        }

        const employee = await Employee.create({
            name,
            email,
            phone,
            department,
            designation,
            joiningDate
        });

        res.status(201).json({
            message: "Employee added successfully",
            employee
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// GET EMPLOYEES
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            employees
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        await Employee.findByIdAndDelete(id);

        res.status(200).json({
            message: "Employee deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


export {
    addEmployee,
    getEmployees,
    deleteEmployee
};