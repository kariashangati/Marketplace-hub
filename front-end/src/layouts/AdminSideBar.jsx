import { useNavigate } from "react-router-dom";
import { SingleLink } from "../components/ui/SingleLink";
import { ADMINLINKS } from "../constants/LINKS";
import { logout } from "../services/authServices";
import { useState } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { CircularProgress } from "@mui/material";
export const AdminSideBar = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);

  const logoutFromApp = async () =>{
    setLoading(true);
    const response = await logout(localStorage.getItem('token'));
    setLoading(false);
    if(response.data.message === 'You have been logged out!'){
        localStorage.clear();
        navigate('/login')
    }
  }
  return (
    <div className="flex flex-row w-[100%] py-2 gap-2 mx-auto flex-wrap justify-center z-10 bottom-0 lg:flex-col lg:justify-center lg:gap-2 lg:w-[20%] bg-dark lg:h-full fixed lg:px-6">
      {ADMINLINKS && ADMINLINKS.length
        ? ADMINLINKS.map((link) => {
            return (
              <div key={link.TEXT} onClick={() => navigate(link.LINK)}>
                <SingleLink svg={link.SVG} text={link.TEXT} link={link.LINK} />
              </div>
            );
          })
        : null}
      <div onClick={logoutFromApp} className={`flex lg:gap-2 items-center cursor-pointer hover:bg-blue-700 duration-200 rounded-lg py-1`}>
          {
            !loading ? 
              <>
                <div>
                  {<ArrowRightOnRectangleIcon className="w-10 h-10" strokeWidth="1"/>}
                </div>
                <div>
                    <span className="text-lg font-normal hidden lg:block">{"Logout"}</span>
                </div> 
              </>:<div className="flex justify-center items-center h-full w-full">
                  <CircularProgress size={"40px"} color="white" />
                </div>
          }
      </div>
    </div>
  );
};
