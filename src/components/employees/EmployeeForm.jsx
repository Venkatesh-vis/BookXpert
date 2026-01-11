import { useState } from "react";
import { Upload } from "lucide-react";

const EmployeeForm = ({ initialData, onSave, onCancel }) => {
    const [form, setForm] = useState(
        initialData || {
            employeeId: "",
            fullName: "",
            gender: "male",
            dob: "",
            state: "",
            profileImage: "https://i.pravatar.cc/150?img=10",
            isActive: true
        }
    );

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () =>
            setForm(prev => ({ ...prev, profileImage: reader.result }));
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.fullName || !form.dob || !form.state) {
            alert("Please fill all required fields");
            return;
        }

        const payload = {
            ...form,
            employeeId: initialData
                ? form.employeeId
                : `EMP${String(Date.now()).slice(-3)}`
        };

        onSave(payload);
    };

    return (
        <div className="px-4 sm:px-6 py-4 overflow-x-hidden">
            <div className="space-y-6">

                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={form.profileImage}
                            alt="Profile"
                            className="w-28 h-28 rounded-full border-4 border-slate-200 object-cover"
                        />
                        <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow">
                            <Upload className="w-4 h-4" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                        Upload profile photo
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            value={form.fullName}
                            onChange={e =>
                                setForm(prev => ({ ...prev, fullName: e.target.value }))
                            }
                            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Gender
                        </label>
                        <select
                            value={form.gender}
                            onChange={e =>
                                setForm(prev => ({ ...prev, gender: e.target.value }))
                            }
                            className="w-full px-4 py-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            value={form.dob}
                            onChange={e =>
                                setForm(prev => ({ ...prev, dob: e.target.value }))
                            }
                            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            State *
                        </label>
                        <input
                            type="text"
                            value={form.state}
                            onChange={e =>
                                setForm(prev => ({ ...prev, state: e.target.value }))
                            }
                            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <div className="flex items-center justify-between rounded-lg border border-slate-300 px-4 py-3 bg-white">
                            <div>
                                <p className="text-sm font-semibold text-slate-700">
                                    Employee Status
                                </p>
                                <p className="text-xs text-slate-500">
                                    {form.isActive
                                        ? "Employee is active"
                                        : "Employee is inactive"}
                                </p>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={form.isActive}
                                onClick={() =>
                                    setForm(prev => ({ ...prev, isActive: !prev.isActive }))
                                }
                                className={`relative cursor-pointer inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${form.isActive ? "bg-blue-600" : "bg-slate-300"}
                `}
                            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
                    ${form.isActive ? "translate-x-6" : "translate-x-1"}
                  `}
                />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 cursor-pointer py-3 bg-slate-100 rounded-lg font-semibold hover:bg-slate-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 py-3 cursor-pointer bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow"
                    >
                        {initialData ? "Update" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeForm;
