import { useNavigate } from "react-router-dom";
import { SingleLink } from "../components/ui/SingleLink";
import { LINKS } from "../constants/LINKS.jsx";
export const AdminSideBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row w-[100%] py-2 gap-2 mx-auto flex-wrap justify-center z-10 bottom-0 lg:flex-col lg:justify-center lg:gap-2 lg:w-[20%] bg-dark lg:h-full fixed lg:px-6">
      {LINKS && LINKS.length
        ? LINKS.map((link) => {
            return (
              <div key={link.TEXT} onClick={() => navigate(link.LINK)}>
                <SingleLink svg={link.SVG} text={link.TEXT} link={link.LINK} />
              </div>
            );
          })
        : null}
    </div>
  );
};
