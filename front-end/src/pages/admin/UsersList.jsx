import { useEffect, useState } from "react";
import { Input } from "../../components/ui/Input";
import { AdminSideBar } from "../../layouts/AdminSideBar";
import { LinearProgress } from "@mui/material";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { searchUsersByUsername } from "../../services/userServices";
import {
  deleteUserService,
  getUsersListByPage,
} from "../../services/adminServices";
import { ResultPagination } from "../../components/ui/ResultPagination";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { Notification } from "../../components/ui/Notification";
import { useNavigate } from "react-router-dom";

export const UsersList = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({});
  const [username, setUsername] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [lastPage, setLastPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const getUsers = async (page) => {
    setLoading(true);
    try {
      const response = await getUsersListByPage(
        localStorage.getItem("token"),
        page
      );
      setTotal(response.data.users.total);
      setLastPage(response.data.users.last_page);
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

  const nextData = async () => {
    if (page < lastPage) {
      setPage(page + 1);
      const response = await getUsers(page + 1);
      if (response.data.users.data) {
        setUsersList(response.data.users.data);
      }
    }
  };

  const previusData = async () => {
    if (page !== 1) {
      setPage(page - 1);
      const response = await getUsers(page - 1);
      if (response.data.users.data) {
        setUsersList(response.data.users.data);
      }
    }
  };

  const deleteUser = async (userId) => {
    setNotification(null);
    setDeleteLoading(true);
    try {
      const response = await deleteUserService(
        localStorage.getItem("token"),
        userId
      );
      setDeleteLoading(false);
      setOpen(false);

      if (response.status === 200) {
        setNotification({ type: "success", message: response.data.message });
        const newUsersList = usersList.filter((_user) => {
          return _user.id !== userId;
        });
        setUsersList(newUsersList);
      }
    } catch (error) {
      setOpen(false);
      setDeleteLoading(false);
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

  const searchUsers = async () => {
    setLoading(true);
    const response = await searchUsersByUsername(
      localStorage.getItem("token"),
      username
    );
    setLoading(false);
    if (response.data.users) {
      setUsersList(response.data.users);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (username !== "") {
      searchUsers();
    } else {
      getUsers();
    }
  }, [username]);

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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type={"text"}
              name={"username"}
              placholder={"Search users by username"}
            />
          </div>
        </div>
        <div className="mt-5 pr-5">{loading && <LinearProgress />}</div>
        <div className="mt-6 pr-5">
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
                              <EyeIcon
                                className="w-8 h-8 text-green-600 cursor-pointer hover:text-green-800 duration-200"
                                onClick={() => {
                                  navigate(`/user/userData/${user.id}`);
                                }}
                              />
                              <TrashIcon
                                className="w-8 h-8 text-red-600 cursor-pointer hover:text-red-800 duration-200"
                                onClick={() => {
                                  setOpen(true);
                                  setSelectedUserId(user.id);
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          )}
          {!loading && username === "" && (
            <ResultPagination
              firstPage={page}
              lastPage={lastPage}
              previus={previusData}
              next={nextData}
              total={total}
            />
          )}
          {open && (
            <DeleteModal
              loading={deleteLoading}
              setOpen={setOpen}
              itemType={"User"}
              deleteItem={() => deleteUser(selectedUserId)}
            />
          )}
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
            />
          )}
        </div>
      </div>
    </div>
  );
};
