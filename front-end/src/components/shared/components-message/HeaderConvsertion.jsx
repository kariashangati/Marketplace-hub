import React from "react";

import {
  EllipsisHorizontalIcon,
  PhoneIcon,
  ShoppingBagIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

export const HeaderConvsertion = React.forwardRef(({ item }, ref) => {
  const navigate = useNavigate();
  console.log(item);
  
  return (
    <div className="p-5 border-b flex justify-between items-center" ref={ref}>
      <div className="flex justify-between items-center w-[100%]">
        <div className="flex gap-2 items-center">
          <div>
            <img
              className="rounded-full w-14 h-14"
              src={item.profilePic}
              alt=""
            />
          </div>
          <div>
            <Link to={`/user/userData/${item.receiverId}`} className="font-semibold text-black text-[20px] hover:text-blue-600">
              {item.username}
            </Link>
          </div>
        </div>
        <div>
          <button className="bg-blue-500 text-white hover:bg-blue-600 duration-200 px-4 py-2 rounded-md font-semibold flex items-center gap-2" onClick={() => navigate(`/product/productDetails/${item.productId}`)}>
            <ShoppingBagIcon className="w-6 h-6"/>
            View Item
          </button>
        </div>
      </div>
    </div>
  );
});
