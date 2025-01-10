import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/24/outline";
import storeLogo from "../../../public/assets/storeLogo.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";
export const Store = ({ setSelectedStoreId, storeData, viewUser, setOpen, setOpenUpdate }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-dark my-3.5 px-3 py-2 rounded-md w-[100%] cursor-pointer lg:mb-0 lg:w-[48%] hover:bg-black duration-200"
      onClick={() => navigate(`/store/${storeData.id}`)}
    >
      <div className="flex gap-2 justify-between items-start">
        <div className="flex gap-2 items-center">
          <div>
            <img src={storeLogo} className="w-20 h-20 rounded-md" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">{storeData.storeName}</span>
            <span className="text-gray-600 font-semibold">
              Created {moment(storeData.created_at).fromNow()}
            </span>
          </div>
        </div>
        {viewUser ? null : (
          <div className="flex gap-1">
            <TrashIcon className="w-8 h-8 text-red-500 cursor-pointer hover:text-red-700 duration-200" 
            onClick={(e) => {e.stopPropagation(); setSelectedStoreId(storeData.id);setOpen(true)}}/>
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-gray-500 font-semibold text-sm">
          {storeData.bio.substring(0, 100)}...
        </p>
      </div>
    </div>
  );
};
