import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import storeLogo from "../../../public/assets/storeLogo.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const Product = ({ productData, viewUser, deleteItem }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-dark p-3 rounded-md flex gap-5 cursor-pointer hover:bg-black duration-200">
      <div className="w-[25%]">
        <img
          src={storeLogo}
          className="w-full h-[250px] rounded-md object-cover"
          alt="Store Logo"
        />
      </div>
      <div className="w-[75%]">
        <div className="flex gap-1 items-center">
          <img
            src={productData.store.user.profile_picture}
            className="w-8 h-8 rounded-full object-cover"
            alt="User Profile"
          />
          <span className="font-semibold cursor-pointer hover:text-blue-300 duration-200" onClick={() => navigate(`/user/userData/${productData.store.user.id}`)}>
            {productData.store.user.username}
          </span>
        </div>
        <div className="mt-2">
          <h1 className="text-2xl font-semibold">{productData.productName}</h1>
          <p>{productData.description}</p>
        </div>
        <div className="mt-1">
          <span className="bg-blue-500 px-3 rounded-3xl">
            {productData.delivry}
          </span>
          <br />
          <div className="mt-2">
            <span className="text-gray-400">
              Posted {moment(productData.created_at).fromNow()}
            </span>
            <br />
            <span className="text-gray-400">{productData.location}</span>
          </div>
          <div className="mt-2 flex justify-between ">
            <div>
              <span className="text-2xl font-semibold">
                {productData.price} dh
              </span>
            </div>
            {viewUser && (
              <div>
                <TrashIcon
                  className="w-8 h-8 text-red-500 cursor-pointer hover:text-red-700 duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(productData.id);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
