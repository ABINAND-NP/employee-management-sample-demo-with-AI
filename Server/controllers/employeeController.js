import Employee from "../models/Employee.js";

// ADD EMPLOYEE
const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            age,
            salary,
            department,
            designation,
            joiningDate
        } = req.body;

        if (
            !name ||
            !email ||
            !phone ||
            !age ||
            !salary ||
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
            age,
            salary,
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

        const page = Number(req.query.page) || 1;

        const limit = 5;
        
        const skip = (page - 1) * limit ;

        const employees = await Employee.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalEmployees = await Employee.countDocuments(); 

        const totalPages = Math.ceil(totalEmployees / limit);

        res.status(200).json({
            page,
            limit,
            totalEmployees,
            totalPages,
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

//aggregates 

const getITEmloyees = async (req,res) => {
    try {
        const employees = await Employee.aggregate([
       {
         $match : {
            department : "Finance",
            // salary : {
            //     $gt : 20000
            // }
        }
       }
    ]);

    res.status(200).json({
        employees
    })
        
    } catch (error) {
        console.log("getEmployees error", error);

        res.json({
            message : "server error",
            error : error.message
        })        
        
    }

}

const getDepartmentEmployeeList = async (req,res) => {
    try {

        // const result = await Employee.aggregate([
        //     {
        //         $group : {
        //             _id : "$department",
        //             totalEmployee : {
        //                 $sum : 1
        //             }
        //         }
        //     }
        // ]);

        const result = await  Employee.aggregate([
            {
                $group : {
                    _id : "$department",
                    totalSalary : {
                        $sum : "$salary"
                    }
                }
            }
        ])

        res.json({
            result
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            message : "server error",
            error : error.message

        })
        
        
    }
}

const getDepartmentAverageSalary = async (req, res) => {
    try {
        const result = await Employee.aggregate([
            {
                $group: {
                    _id: "$department",
                    averageSalary: {
                        $avg: "$salary"
                    }
                }
            }
        ]);

        res.status(200).json({
            result
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const sortEmployeesBySalary = async (req, res) => {
    try {

        const result = await Employee.aggregate([
            {
                $sort: {
                    salary: 1
                    // salary: -1
                }
            }
        ]);

        res.status(200).json({
            result
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getEmployeeBasicDetails = async (req, res) => {
    try {

        const result = await Employee.aggregate([
            {
                $project: {
                    name: 1,
                    email: 1,
                    salary: 1,
                    annualSalary: {
                        $multiply: ["$salary", 12]
                    },
                    department: 1
                }
            }
        ]);

        res.status(200).json({
            result
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

export {
    addEmployee,
    getEmployees,
    deleteEmployee,
    getITEmloyees,
    getDepartmentEmployeeList,
    getDepartmentAverageSalary,
    sortEmployeesBySalary,
    getEmployeeBasicDetails
    
};