import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">

            <h1
                className="text-xl font-bold cursor-pointer"
                onClick={() => navigate("/dashboard")}
            >
                Employee Management
            </h1>

            <div className="flex items-center gap-6">

                <span>
                    {user?.name} ({user?.role})
                </span>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>

            </div>

        </nav>
    );
};

export default Navbar;