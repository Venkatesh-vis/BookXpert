import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

const AppLayout = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="h-screen overflow-hidden bg-slate-100">
            <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b">
                <button
                    onClick={() => setOpen(true)}
                    className="p-2 rounded-lg hover:bg-slate-100"
                >
                    <Menu className="w-6 h-6 text-slate-700" />
                </button>
                <h1 className="font-semibold text-slate-800">
                    EMS Dashboard
                </h1>
            </header>

            <div className="flex h-full">
                <aside
                    className={`
            fixed inset-y-0 left-0 z-40 w-[240px] bg-slate-900 text-white
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            md:static md:translate-x-0
          `}
                >
                    <Sidebar onClose={() => setOpen(false)} />
                </aside>

                {open && (
                    <div
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    />
                )}

                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
