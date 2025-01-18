import { useEffect, useState } from "react";
import { UserSideBar } from "../../layouts/UserSideBar";
import { getNotifications } from "../../services/notificationServices";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const Notifications = () => {

    const [loading,setLoading] = useState(true);
    const [notifications,setNotifications] = useState([]);
    const navigate = useNavigate();


    const getUserNotifications = async () =>{
        setLoading(true);
        const response = await getNotifications(localStorage.getItem("token"));        
        setLoading(false)
        
        if(response.data.notifications){
            setNotifications(response.data.notifications);
        }
    }

    useEffect(() =>{
        getUserNotifications();
    },[])
  return (
    <div>
      <div>
        <UserSideBar />
      </div>

      <div className="lg:ml-[21%] px-2 mt-8">
        <div>
            <h1 className="text-3xl font-semibold">Your Notifications</h1>
            <div className="flex flex-col lg:flex-wrap lg:flex-row gap-[1%] mt-5">
                {
                    loading && <LinearProgress />
                }
                {
                    !loading && (
                        notifications && notifications.length ?
                            notifications.map((notification) =>{
                                return <div className="flex w-[100%] mb-2 justify-between bg-dark rounded-sm py-5 px-3 hover:bg-black duration-200 cursor-pointer" onClick={() => navigate(`/product/productDetails/${notification.productId}`)}>
                                        <div className="flex items-center gap-2">
                                            <img src={notification.senderProfilePic} className="w-6 h-6 rounded-full"/>
                                            <span className="font-semibold hover:text-sky-500" onClick={(e) =>{navigate(`/user/userData/${notification.senderId}`),e.stopPropagation()}}>{notification.senderUsername}</span>
                                            <span className="text-gray-500 font-semibold">{notification.notificationContent}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500 font-semibold">{moment(notification.createdAt).fromNow()}</span>
                                        </div>
                                    </div>
                            })
                        :<p className="mt-2 font-semibold">No notifications founded</p>
                    )
                }
            </div>
        </div>
      </div>
    </div>
  );
};
