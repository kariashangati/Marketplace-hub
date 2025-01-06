import axios from "axios"

export const getUsersList = async (token) => {
    const response = await axios.get("http://localhost:8000/api/user/getUsers",{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
    return response;
}

export const getAdminDashboardData = async (token) => {
    const response = await axios.get("http://localhost:8000/api/admin/getAdminDataDashboard",{
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
    return response;
}