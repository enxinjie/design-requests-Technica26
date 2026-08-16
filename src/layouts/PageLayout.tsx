import { Outlet } from "react-router";
import Navbar from "../components/NavBar";

const PageLayout = () => {

    return (
        <div className="min-h-screen min-h-screen bg-[#190d53]">
            <Navbar/>
            <main className="ml-64">
                <Outlet />
            </main>
        </div>
    );
};

export default PageLayout;