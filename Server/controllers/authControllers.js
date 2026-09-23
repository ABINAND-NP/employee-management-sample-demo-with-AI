import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => { 
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Only Admin and HR can login
        if (user.role !== "Admin" && user.role !== "HR") {
            return res.status(403).json({
                message: "You are not allowed to login"
            });
        }

        // Compare password
        // const isPasswordCorrect = await bcrypt.compare(
        //     password,
        //     user.password
        // );

        // if (!isPasswordCorrect) {
        //     return res.status(401).json({
        //         message: "Invalid email or password"
        //     });
        // }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role 
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

export { login };