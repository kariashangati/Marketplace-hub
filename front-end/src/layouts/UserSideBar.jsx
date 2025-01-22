import { useNavigate } from "react-router-dom";
import { SingleLink } from "../components/ui/SingleLink";
import { USERLINKS } from "../constants/LINKS";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { logout } from "../services/authServices";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import projectLogo from "../../public/assets/projectLogo.png";
import productLogoMessage from "../../public/assets/productLogoMessage.png";
export const UserSideBar = ({ viewIcone }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logoutFromApp = async () => {
    setLoading(true);
    const response = await logout(localStorage.getItem("token"));
    setLoading(false);
    if (response.data.message === "You have been logged out!") {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <div
      className={
        viewIcone
          ? "flex z-10 flex-col justify-normal gap-2 w-20  bg-gray-200 h-[100vh] px-2 flex-wrap"
          : "flex pt-4 flex-row w-[100%] gap-2 flex-wrap justify-center z-10 bottom-0 lg:flex-col lg:justify-start lg:gap-2 lg:w-[20%] bg-gray-200 lg:h-full fixed lg:px-6"
      }
    >
      <img
        src={viewIcone ? productLogoMessage : projectLogo}
        className="w-[100%] hidden lg:block mb-8"
      />
      {USERLINKS && USERLINKS.length
        ? USERLINKS.map((link) => {
            return (
              <div
                title={viewIcone && link.TEXT}
                key={link.TEXT}
                onClick={() => navigate(link.LINK)}
              >
                <SingleLink
                  ShowCss
                  svg={link.SVG}
                  text={viewIcone ? null : link.TEXT}
                  link={link.LINK}
                />
              </div>
            );
          })
        : null}
      <div
        title={viewIcone && "logout"}
        onClick={logoutFromApp}
        className={`flex lg:gap-2 items-center cursor-pointer hover:text-blue-700 duration-200 rounded-lg px-2 py-1`}
      >
        {!loading ? (
          <>
            <div>
              {
                <ArrowRightOnRectangleIcon
                  className="w-10 h-10"
                  strokeWidth="1"
                />
              }
            </div>
            <div>
              <span className="text-lg font-normal hidden lg:block">
                {!viewIcone && "Logout"}
              </span>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full w-full">
            <CircularProgress size={"40px"} className="text-blue-700"/>
          </div>
        )}
      </div>
    </div>
  );
};
