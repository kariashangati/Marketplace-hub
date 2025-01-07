import { useEffect, useState } from "react";
import { AdminSideBar } from "../../layouts/AdminSideBar";
import { LinearProgress } from "@mui/material";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { getTeamMembers } from "../../services/adminServices";
import { Button } from "../../components/ui/Button";
import { AddAdminModal } from "../../components/modals/AddAdminModal";


export const TeamList = () => {

    const [adminsList,setAdminsList] = useState([]);
    const [loading,setLoading] = useState(false);
    const [openAddAdmin,setOpenAddAdmin] = useState(false);

    const getTeam = async () =>{
        setLoading(true);
        const response = await getTeamMembers(localStorage.getItem("token"));
        setLoading(false);
        
        if(response.data.admins){
            setAdminsList(response.data.admins);
        }
    }

    useEffect(() =>{
        getTeam();
    },[])
  return (
    <div>
        <div>
            <AdminSideBar />
        </div>
        <div className="lg:ml-[21%] px-2">
            <div className="pt-6">
                <h1 className="text-3xl font-semibold">Team List</h1>
                <div className="w-[30%] mt-5">
                    <Button text={"Add admin"} width={"40%"} onClick={() => setOpenAddAdmin(true)}/>
                </div>
            </div>
            
            <div className="mt-5 pr-5">{loading && <LinearProgress />}</div>
            <div className="mt-6 pr-5">
            {!loading && adminsList.length ? (
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
                    {adminsList && adminsList.length
                    ? adminsList.map((user) => {
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
                                <EyeIcon className="w-8 h-8 text-green-600 cursor-pointer hover:text-green-800 duration-200" />
                                <TrashIcon className="w-8 h-8 text-red-600 cursor-pointer hover:text-red-800 duration-200" />
                                </div>
                            </td>
                            </tr>
                        );
                        })
                    : null}
                </tbody>
                </table> 
            ) : <span className="text-lg font-semibold">No admins founded except you!</span>}
            </div>
            {
                openAddAdmin && <AddAdminModal setOpenAddAdmin={setOpenAddAdmin} />
            }
        </div>
    </div>
  );
};
