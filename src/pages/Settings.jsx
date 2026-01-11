import {Settings} from "lucide-react";

const SettingsPage = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <div
                className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 sm:p-10 max-w-md w-full text-center">
                <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <Settings className="w-7 h-7 text-blue-600"/>
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mb-2">
                    Settings
                </h1>
                <p className="text-slate-500 mb-6">
                    This section is under development.
                    <br/>
                    More customization options are coming soon.
                </p>
                <span
                    className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full bg-slate-100 text-slate-600">
                    Coming Soon
                </span>
            </div>
        </div>
    );
};

export default SettingsPage;
