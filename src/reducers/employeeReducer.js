export const EMPLOYEE_ACTION_TYPE = {
    SET_EMPLOYEES: "SET_EMPLOYEES",
    ADD_EMPLOYEE: "ADD_EMPLOYEE",
    UPDATE_EMPLOYEE: "UPDATE_EMPLOYEE",
    DELETE_EMPLOYEE: "DELETE_EMPLOYEE",
};



const initialState = {
    list: []
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMPLOYEE_ACTION_TYPE.SET_EMPLOYEES:
        case EMPLOYEE_ACTION_TYPE.ADD_EMPLOYEE:
        case EMPLOYEE_ACTION_TYPE.UPDATE_EMPLOYEE:
        case EMPLOYEE_ACTION_TYPE.DELETE_EMPLOYEE:
            return {
                ...state,
                list: action.payload
            };

        default:
            return state;
    }
};

export default employeeReducer;
