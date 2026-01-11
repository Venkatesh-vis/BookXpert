import {useDispatch, useSelector} from "react-redux";
import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Settings } from "lucide-react";
import {logout} from "../services/auth.service.js";
import {fetchEmployees} from "../services/employees/employeeService.js";
import {EMPLOYEE_ACTION_TYPE} from "../reducers/employeeReducer.js";

const DashboardPage = () => {
    const employees = useSelector(state => state.employee.list);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const totalEmployees = employees.length;

    const activeEmployees = useMemo(
        () => employees.filter(e => e.isActive).length,
        [employees]
    );

    const departmentsCount = useMemo(() => {
        const departments = new Set(
            employees.map(e => e.department).filter(Boolean)
        );
        return departments.size || 0;
    }, [employees]);

    const recentEmployees = useMemo(() => {
        return [...employees].slice(-3).reverse();
    }, [employees]);


    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleSettings = () => {
        setOpen(false);
        navigate("/settings");
    };


    useEffect(() => {
        if (employees.length === 0) {
            fetchEmployees().then(data => {
                dispatch({
                    type: EMPLOYEE_ACTION_TYPE.SET_EMPLOYEES,
                    payload: data
                });
            });
        }
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const StatCard = ({ label, value, footer }) => (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
                {label}
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1 sm:mt-2">
                {value}
            </p>
            <p className="text-sm text-green-600 mt-2">
                {footer}
            </p>
        </div>
    );

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                        Dashboard
                    </h1>
                    <p className="text-slate-500 text-sm sm:text-base mt-1">
                        Overview of your workforce
                    </p>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setOpen(prev => !prev)}
                        className="w-10 h-10 cursor-pointer rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition"
                    >
                        <User className="w-5 h-5" />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-200 z-50">
                            <button
                                onClick={handleSettings}
                                className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 transition"
                            >
                                <Settings className="w-4 h-4" />
                                Settings
                            </button>

                            <div className="h-px bg-slate-200 my-1" />

                            <button
                                onClick={handleLogout}
                                className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <StatCard
                    label="Total Employees"
                    value={totalEmployees}
                    footer={`${activeEmployees} active`}
                />

                <StatCard
                    label="Departments"
                    value={departmentsCount}
                    footer="Derived from employees"
                />

                <StatCard
                    label="Active Employees"
                    value={activeEmployees}
                    footer="Currently working"
                />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4">
                    Recent Activity
                </h2>

                <div className="space-y-3">
                    {recentEmployees.length === 0 && (
                        <p className="text-slate-500 text-sm">
                            No recent activity
                        </p>
                    )}

                    {recentEmployees.map(emp => (
                        <div
                            key={emp.employeeId}
                            className="flex flex-wrap items-center gap-2 sm:gap-3 p-3 bg-slate-50 rounded-lg"
                        >
                            <div className="w-2 h-2 bg-green-500 rounded-full shrink-0" />
                            <p className="text-slate-700 text-sm sm:text-base">
                                New employee onboarded:{" "}
                                <span className="font-semibold">{emp.fullName}</span>
                            </p>
                            <span className="ml-auto text-xs sm:text-sm text-slate-500">
                Recently
              </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
