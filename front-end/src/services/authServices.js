import axios from "axios"

export const checkUserLogin = async (data) =>{
    const response = await axios.post("http://localhost:8000/api/auth/login", data);
    return response;
}

export const sendVerificationCode = async (data) =>{
    const response = await axios.post("http://localhost:8000/api/auth/sendVerificationCode", data);
    return response;
}

export const verifyCode = async (data) =>{
    const response = await axios.post("http://localhost:8000/api/auth/checkVerificationCode", data);
    return response;
}

export const forgotPassword = async (data) =>{
    const response = await axios.post("http://localhost:8000/api/auth/forgotPassword", data);
    return response;
}

export const resetPassword = async (data) =>{
    const response = await axios.post("http://localhost:8000/api/auth/resetPassword", data);
    return response;
}