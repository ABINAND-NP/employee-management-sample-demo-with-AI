import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-8">

                <h1 className="text-3xl font-bold mb-2">
                    Welcome, {user?.name}
                </h1>

                <p className="text-gray-600 mb-8">
                    Role: {user?.role}
                </p>

                <div className="grid md:grid-cols-2 gap-6">

                    {(user?.role === "Admin" ||
                        user?.role === "HR") && (

                        <div
                            onClick={() => navigate("/employees")}
                            className="bg-white p-8 rounded-xl shadow cursor-pointer hover:shadow-lg"
                        >
                            <h2 className="text-2xl font-bold mb-2">
                                Employees
                            </h2>

                            <p className="text-gray-500">
                                View all employees
                            </p>
                        </div>
                    )}

                    {user?.role === "Admin" && (

                        <div
                            onClick={() => navigate("/employees/add")}
                            className="bg-white p-8 rounded-xl shadow cursor-pointer hover:shadow-lg"
                        >
                            <h2 className="text-2xl font-bold mb-2">
                                Add Employee
                            </h2>

                            <p className="text-gray-500">
                                Add a new employee
                            </p>
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
};

export default Dashboard;