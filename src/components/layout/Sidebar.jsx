import { NavLink } from "react-router-dom";
import { Users, LayoutDashboard, Building2, Settings } from "lucide-react";

const Sidebar = ({ onClose }) => {
    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
            isActive
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`;

    return (
        <aside className="h-screen flex flex-col">
            <div className="p-6 border-b border-slate-700">
                <div className="flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-blue-400" />
                    <h3 className="text-2xl font-bold">EMS</h3>
                </div>
                <p className="text-slate-400 text-sm mt-1">
                    Employee Management
                </p>
            </div>

            <nav className="flex-1 p-4">
                <NavLink
                    to="/dashboard"
                    className={linkClass}
                    onClick={onClose}
                >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/employees"
                    className={linkClass}
                    onClick={onClose}
                >
                    <Users className="w-5 h-5" />
                    Employees
                </NavLink>
                <NavLink
                    to="/settings"
                    className={linkClass}
                    onClick={onClose}
                >
                    <Settings className="w-5 h-5" />
                    Settings
                </NavLink>

            </nav>
        </aside>
    );
};

export default Sidebar;
