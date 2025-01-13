import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

export const SingleUserData = ({userData}) => {
    const navigate = useNavigate();
    
  return (
    <div className="flex justify-between w-[100%] px-2 py-1 rounded-md items-center bg-dark hover:bg-black duration-200 cursor-pointer">
        <div className="flex gap-2 items-center">
            <div>
                <img src={userData.store.user.profile_picture} className='w-10 h-10 rounded-full'/>
            </div>
            <div className='flex flex-col'>
                <span className='text-md font-semibold'>{userData.store.user.fullName}</span>
                <span className='font-semibold text-sm text-gray-500'>{userData.store.user.username}</span>
                <span className='font-semibold text-sm text-blue-500'>Total posted products {userData.totalProducts}</span>
            </div>
        </div>
        <div>
            <Button text={'View'} onClick={() => navigate(`/user/userData/${userData.store.user.id}`)}/>
        </div>
    </div>
)
}
