import EmployeeCard from "./EmployeeCard.jsx";
import { User } from "lucide-react";

const EmployeeCards = ({ employees, onEdit, onDelete }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {employees.length === 0 ? (
            <div className="col-span-full text-center py-12">
                <User className="w-14 h-14 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-base">
                    No employees found
                </p>
                <p className="text-slate-400 text-sm">
                    Try adjusting your filters
                </p>
            </div>
        ) : (
            employees.map(emp => (
                <EmployeeCard
                    key={emp.employeeId}
                    employee={emp}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))
        )}
    </div>
);

export default EmployeeCards;
