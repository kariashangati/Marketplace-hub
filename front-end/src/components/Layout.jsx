import { useNavigate } from "react-router-dom";

import { SingleLink } from "./ui/SingleLink";

import { LINKS } from "../constants/LINKS";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div>
      {LINKS && LINKS.length > 0 && (
        <div className="flex flex-row w-[100%] py-2 gap-2 mx-auto flex-wrap justify-center z-10 bottom-0 lg:flex-col lg:justify-center lg:gap-2 lg:w-[20%] bg-dark lg:h-full fixed lg:px-6">
          {LINKS.map((link) => {
            return (
              <div key={link.TEXT} onClick={() => navigate(link.LINK)}>
                <SingleLink svg={link.SVG} text={link.TEXT} link={link.LINK} />
              </div>
            );
          })}
        </div>
      )}
      {children}
    </div>
  );
};

export default Layout;
