import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { logOut } = useAuth();


    return (
        <nav
            className={`fixed left-0 top-0 h-screen border-r bg-white transition-all duration-300 `}>
                <div className="flex items-center justify-between p-3">
                    <h1 className="text-xl font-bold">GraphixHub</h1>
                    <button onClick={() => setCollapsed(true)} className="rounded-lg p-2 hover:bg-gray-100">☰</button>

                </div>

                <div className="flex flex-col gap-2 p-3">
                    <Link to="/">Dashboard</Link>
                    <Link to="/team">Team</Link>
                    <Link to="/assets">Asset Library</Link>
                </div>

                <div className="border-t p-3">
                    <button onClick={logOut} className="w-full rounded-lg px-3 py-2 text-left hover:bg-gray-100">Logout</button>
                </div>
            
        </nav>
    );
};

export default Navbar;