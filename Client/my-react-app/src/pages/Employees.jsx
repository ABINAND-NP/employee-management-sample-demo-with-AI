import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Employees = () => {

    const [employees, setEmployees] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    const getEmployees = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/employees",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setEmployees(response.data.employees);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to get employees"
            );
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(
                `/employees/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Employee deleted");

            getEmployees();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete employee"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-8">

                <h1 className="text-3xl font-bold mb-6">
                    Employees
                </h1>

                <div className="bg-white rounded-xl shadow overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-900 text-white">

                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Phone</th>
                                <th className="p-4 text-left">Department</th>
                                <th className="p-4 text-left">Designation</th>
                                <th className="p-4 text-left">Joining Date</th>

                                {user?.role === "Admin" && (
                                    <th className="p-4 text-left">
                                        Action
                                    </th>
                                )}
                            </tr>

                        </thead>

                        <tbody>

                            {employees.map((employee) => (

                                <tr
                                    key={employee._id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-4">
                                        {employee.name}
                                    </td>

                                    <td className="p-4">
                                        {employee.email}
                                    </td>

                                    <td className="p-4">
                                        {employee.phone}
                                    </td>

                                    <td className="p-4">
                                        {employee.department}
                                    </td>

                                    <td className="p-4">
                                        {employee.designation}
                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            employee.joiningDate
                                        ).toLocaleDateString()}
                                    </td>

                                    {user?.role === "Admin" && (
                                        <td className="p-4">

                                            <button
                                                onClick={() =>
                                                    handleDelete(employee._id)
                                                }
                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                            >
                                                Delete
                                            </button>

                                        </td>
                                    )}

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default Employees;