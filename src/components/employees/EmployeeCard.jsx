import { User, Calendar, MapPin, Edit, Trash2, Printer } from "lucide-react";

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
    const handlePrint = () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Employee Details - ${employee.fullName}</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 40px; }
                        h1 { color: #1e293b; margin-bottom: 20px; }
                        .detail { margin: 10px 0; }
                        .label { font-weight: bold; color: #475569; }
                    </style>
                </head>
                <body>
                    <h1>Employee Details</h1>
                    <div class="detail"><span class="label">Name:</span> ${employee.fullName}</div>
                    <div class="detail"><span class="label">ID:</span> ${employee.employeeId}</div>
                    <div class="detail"><span class="label">Gender:</span> ${employee.gender}</div>
                    <div class="detail"><span class="label">DOB:</span> ${employee.dob}</div>
                    <div class="detail"><span class="label">State:</span> ${employee.state}</div>
                    <div class="detail"><span class="label">Status:</span> ${employee.isActive ? 'Active' : 'Inactive'}</div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden">
            {/* Header */}
            <div className="relative h-24 sm:h-32 bg-gradient-to-br from-blue-500 to-blue-600">
                <div className="absolute -bottom-10 left-4 sm:left-6">
                    <div className="relative">
                        <img
                            src={employee.profileImage}
                            alt={employee.fullName}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow"
                        />
                        <span
                            className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-white ${
                                employee.isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                        />
                    </div>
                </div>
            </div>

            <div className="pt-14 sm:pt-16 px-4 sm:px-6 pb-4 sm:pb-6">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                    {employee.fullName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-3">
                    {employee.employeeId}
                </p>

                <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                        <User className="w-4 h-4 text-slate-400" />
                        {employee.gender}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {employee.dob}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {employee.state}
                    </div>
                </div>

                <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                        employee.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
          {employee.isActive ? "Active" : "Inactive"}
        </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 border-t">
                    <button
                        onClick={() => onEdit(employee)}
                        className="flex items-center cursor-pointer justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                    >
                        <Edit className="w-4 h-4" />
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(employee.employeeId)}
                        className="flex items-center cursor-pointer justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>

                    <button
                        onClick={handlePrint}
                        className="flex items-center cursor-pointer justify-center py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100"
                    >
                        <Printer className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;
