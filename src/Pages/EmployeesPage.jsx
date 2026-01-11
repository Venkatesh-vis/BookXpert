import {useEffect, useMemo, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmation from "../Reusable/DeleteConfirmation.jsx";
import Modal from "../Reusable/Modal.jsx";
import EmployeeForm from "../components/employees/EmployeeForm.jsx";
import EmployeeCards from "../components/employees/EmployeeCards.jsx";
import Filters from "../components/employees/Filters.jsx";
import { Plus } from "lucide-react";
import {EMPLOYEE_ACTION_TYPE} from "../reducers/employeeReducer.js";
import {fetchEmployees} from "../services/employees/employeeService.js";

const EmployeesPage = () => {
    const employees = useSelector(state => state.employee.list);
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        search: "",
        gender: "",
        status: ""
    });

    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        if (employees.length === 0) {
            fetchEmployees().then(data => {
                dispatch({
                    type: EMPLOYEE_ACTION_TYPE.SET_EMPLOYEES,
                    payload: data
                });
            });
        }

    }, []);


    const filteredEmployees = useMemo(() => {
        return employees.filter(e => {
            const nameMatch = e.fullName
                .toLowerCase()
                .includes(filters.search.toLowerCase());

            const genderMatch = filters.gender
                ? e.gender === filters.gender
                : true;

            const statusMatch =
                filters.status === ""
                    ? true
                    : filters.status === "active"
                        ? e.isActive
                        : !e.isActive;

            return nameMatch && genderMatch && statusMatch;
        });
    }, [employees, filters]);

    const handleSave = (data) => {
        let updatedList;

        if (editing) {
            updatedList = employees.map(e =>
                e.employeeId === data.employeeId ? data : e
            );
        } else {
            updatedList = [data, ...employees];
        }

        dispatch({
            type: editing
                ? EMPLOYEE_ACTION_TYPE.UPDATE_EMPLOYEE
                : EMPLOYEE_ACTION_TYPE.ADD_EMPLOYEE,
            payload: updatedList
        });

        setShowForm(false);
        setEditing(null);
    };

    const handleDelete = () => {
        const updatedList = employees.filter(
            e => e.employeeId !== deleteId
        );

        dispatch({
            type: EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE,
            payload: updatedList
        });

        setDeleteId(null);
    };

    const employeeToDelete = employees.find(
        e => e.employeeId === deleteId
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-7xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">
                        Employees
                    </h1>
                    <p className="text-slate-600">
                        Manage your workforce ({employees.length} total)
                    </p>
                </div>

                <div className="mb-6">
                    <button
                        onClick={() => { setEditing(null); setShowForm(true); }}
                        className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <Plus className="w-5 h-5" />
                        Add Employee
                    </button>
                </div>

                <Filters
                    {...filters}
                    onChange={(k, v) =>
                        setFilters(prev => ({ ...prev, [k]: v }))
                    }
                />

                <EmployeeCards
                    employees={filteredEmployees}
                    onEdit={(emp) => { setEditing(emp); setShowForm(true); }}
                    onDelete={(id) => setDeleteId(id)}
                />

                {showForm && (
                    <Modal
                        onClose={() => { setShowForm(false); setEditing(null); }}
                        title={editing ? "Edit Employee" : "Add New Employee"}
                    >
                        <EmployeeForm
                            initialData={editing}
                            onSave={handleSave}
                            onCancel={() => { setShowForm(false); setEditing(null); }}
                        />
                    </Modal>
                )}

                {deleteId && (
                    <Modal onClose={() => setDeleteId(null)}>
                        <DeleteConfirmation
                            employee={employeeToDelete}
                            onConfirm={handleDelete}
                            onCancel={() => setDeleteId(null)}
                        />
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default EmployeesPage;
