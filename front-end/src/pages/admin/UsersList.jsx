import { useEffect, useState } from "react";
import { Input } from "../../components/ui/Input";
import { AdminSideBar } from "../../layouts/AdminSideBar";
import { getUsersList } from "../../services/adminServices";
import { LinearProgress } from "@mui/material";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";

export const UsersList = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsersList(localStorage.getItem("token"));
      setLoading(false);
      if (response.data.users.data) {
        setUsersList(response.data.users.data);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setNotification({
          type: "error",
          message: error.response.data.message,
        });
      } else {
        setNotification({ type: "error", message: "Try again later" });
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <div>
        <AdminSideBar />
      </div>
      <div className="lg:ml-[21%] px-2">
        <div className="pt-6">
          <h1 className="text-3xl font-semibold">Users List</h1>
          <div className="w-[60%] pt-6">
            <Input
              type={"text"}
              name={"username"}
              placholder={"Search users by username"}
            />
          </div>
        </div>
        <div className="mt-5 pr-5">{loading && <LinearProgress />}</div>
        <div className="mt-6 pr-5">
<<<<<<< HEAD
          {!loading && (
            <table className="w-[100%] border border-gray-400">
              <thead>
                <tr>
                  <th className="py-2">id</th>
                  <th className="py-2">Profile Picture</th>
                  <th className="py-2">Full Name</th>
                  <th className="py-2">UserName</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList && usersList.length
                  ? usersList.map((user) => {
                      return (
                        <tr key={user.id} className="text-center">
                          <td>{user.id}</td>
                          <td className="flex justify-center">
                            <img
                              src={user.profile_picture}
                              className="w-10 h-10 rounded-full"
                            />
                          </td>
                          <td>{user.fullName}</td>
                          <td>{user.username}</td>
                          <td>
                            <div className="flex justify-center gap-2">
                              <EyeIcon className="w-10 h-10 text-green-600 cursor-pointer hover:text-green-800 duration-200" />
                              <TrashIcon className="w-10 h-10 text-red-600 cursor-pointer hover:text-red-800 duration-200" />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          )}
=======
            {
                !loading && <table className="w-[100%] border border-gray-400">
                                <thead>
                                    <th className="py-2">id</th>
                                    <th className="py-2">Profile Picture</th>
                                    <th className="py-2">Full Name</th>
                                    <th className="py-2">UserName</th>
                                    <th className="py-2">Actions</th>
                                </thead>
                                <tbody>
                                    {
                                        usersList && usersList.length ? 
                                            usersList.map((user)=>{
                                                return <tr className="text-center">
                                                    <td>{user.id}</td>
                                                    <td className="flex justify-center">
                                                        <img src={user.profile_picture} className="w-10 h-10 rounded-full" />
                                                    </td>
                                                    <td>{user.fullName}</td>
                                                    <td>{user.username}</td>
                                                    <td>
                                                        <div className="flex justify-center gap-2">
                                                            <EyeIcon className='w-8 h-8 text-green-600 cursor-pointer hover:text-green-800 duration-200'/>
                                                            <TrashIcon className='w-8 h-8 text-red-600 cursor-pointer hover:text-red-800 duration-200'/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })
                                        :null
                                    }
                                </tbody>
                            </table>
            }
>>>>>>> origin
        </div>
      </div>
    </div>
  );
};
