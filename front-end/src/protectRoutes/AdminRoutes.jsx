import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () =>{
    const [isAuth,setIsAuth] = useState(null);

    useEffect(() =>{
        const checkUserAuth = async () =>{
            try{
                const response = await axios.get("http://localhost:8000/api/validateToken",{
                    headers:{
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                })               
                if(response.status === 200){
                    if(response.data.role === "admin"){
                        setIsAuth(true);
                    }
                    else{
                        setIsAuth(false);
                    }
                }else{
                    setIsAuth(false);
                }
            }catch(error){
                setIsAuth(false);
            }
        }
        checkUserAuth();
    },[])
    return isAuth;
}

export const AdminRoutes = () =>{
    const isUserAuth = useAuth();
    if (isUserAuth === null) {
        return null;
    }
    return (
        isUserAuth ? <Outlet /> : <Navigate to={"/login"} />);
}

