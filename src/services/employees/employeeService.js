import axios from "axios";

export const fetchEmployees = async () => {
    const { data } = await axios.get("/data/mockData.json");
    return data.employees;
};

