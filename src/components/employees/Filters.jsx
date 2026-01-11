import { Filter, Search, ChevronDown } from "lucide-react";
import { useState } from "react";

const Filters = ({ search, gender, status, onChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-4 sm:p-6 md:cursor-default md:pointer-events-none"
            >
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-slate-600" />
                    <h3 className="text-base sm:text-lg font-semibold text-slate-800">
                        Filters
                    </h3>
                </div>

                <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform md:hidden ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            <div
                className={`px-4 pb-4 sm:px-6 sm:pb-6 space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4
        ${open ? "block" : "hidden"} md:block`}
            >
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={search}
                        onChange={e => onChange("search", e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <select
                    value={gender}
                    onChange={e => onChange("gender", e.target.value)}
                    className="w-full px-4 py-2.5 cursor-pointer border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <select
                    value={status}
                    onChange={e => onChange("status", e.target.value)}
                    className="w-full px-4 py-2.5 cursor-pointer border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;
