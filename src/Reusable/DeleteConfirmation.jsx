import { Trash2 } from "lucide-react";

const DeleteConfirmation = ({ employee, onConfirm, onCancel }) => {
    return (
        <div className="p-6">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Employee?</h3>
                <p className="text-slate-600">
                    Are you sure you want to delete <span className="font-semibold">{employee?.fullName}</span>?
                    <br />
                    <span className="text-sm text-slate-500">This action cannot be undone.</span>
                </p>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onCancel}
                    className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};


export default DeleteConfirmation