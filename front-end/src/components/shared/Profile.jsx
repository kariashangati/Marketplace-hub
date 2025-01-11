import { AdminSideBar } from "../../layouts/AdminSideBar";
import { Button } from "../ui/Button";
import { useEffect, useState } from "react";
import { EditProfile } from "../modals/EditProfileModal";
import { Notification } from "../ui/Notification";
import {
  editProfileData,
  getAuthenticatedUserData,
} from "../../services/userServices";
import moment from "moment";
import { LinearProgress } from "@mui/material";

export const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [notification, setNotification] = useState({});
  const [editLoading, setEditLoading] = useState(false);

  const [formdata, setFormdata] = useState({
    fullName: "",
    username: "",
    birthday: "",
    bio: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const handleChangeProfilePicture = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getUserData = async () => {
    setLoading(true);
    const response = await getAuthenticatedUserData(
      localStorage.getItem("token")
    );
    setLoading(false);
    if (response.data.userData) {
      setUserData(response.data.userData);
      setFormdata({
        fullName: response.data.userData.fullName,
        username: response.data.userData.username,
        birthday: response.data.userData.birthday,
        bio: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    setEditLoading(true);
    try {
      const data = new FormData();
      data.append("fullName", formdata.fullName);
      data.append("username", formdata.username);
      data.append("birthday", formdata.birthday);
      data.append("bio", formdata.bio);

      if (profilePicture !== null) {
        data.append("image", profilePicture);
      }

      const response = await editProfileData(
        localStorage.getItem("token"),
        data
      );
      setEditLoading(false);
      if (response.status === 200) {
        setOpenEditProfile(false);
        if (response.data.message) {
          setNotification({ type: "success", message: response.data.message });
          getUserData();
        }
      }
    } catch (error) {
      setEditLoading(false);
      setOpenEditProfile(false);
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
    getUserData();
  }, []);
  return (
    <div>
      <div>
        <AdminSideBar />
      </div>
      <div className="lg:ml-[21%] px-2">
        <div className="pt-6 w-[100%] flex justify-between">
          <h1 className="text-3xl font-semibold">Your Profile</h1>
          <Button
            text={"Edit profile Data"}
            onClick={() => setOpenEditProfile(true)}
            width={"20%"}
          />
        </div>
        <div className="mt-5 pr-5">{loading && <LinearProgress />}</div>
        <div className="mt-6">
          {!loading && (
            <div>
              <div className="flex gap-4 items-center">
                <div>
                  <img
                    src={userData.profile_picture}
                    className="w-20 h-20 rounded-full"
                  />
                </div>
                <div className="flex justify-start flex-col">
                  <span className="text-2xl font-semibold">
                    {userData.fullName}
                  </span>
                  <span className="font-semibold text-gray-700">
                    {userData.username}
                  </span>
                  <span className="font-semibold text-gray-700">
                    Joined at {moment(userData.created_at).format("DD-MM-YYYY")}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-gray-500">{userData.bio}</span>
              </div>
              <div className="border border-gray-700 w-[100%] mt-2"></div>
              <div className="mt-4">
                <div>
                  <h1 className="text-xl font-semibold">Account overview</h1>
                </div>
                <div className="mt-4">
                  <table className="w-[100%] border-2 border-gray-600">
                    <thead>
                      <tr>
                        <th className="py-2 bg-dark text-lg">Username</th>
                        <th className="py-2 bg-dark text-lg">Email</th>
                        <th className="py-2 bg-dark text-lg">Password</th>
                        <th className="py-2 bg-dark text-lg">Created at</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        <td className="font-semibold py-2">{userData.username}</td>
                        <td className="font-semibold py-2">{userData.email}</td>
                        <td className="font-semibold py-2">●●●●●●●●●●●●</td>
                        <td className="font-semibold py-2">{moment(userData.created_at).format("DD-MM-YYYY")}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <table className="w-[100%] border-2 border-gray-600">
                    <thead>
                      <tr>
                        <th className="py-2 bg-dark text-lg">Role</th>
                        <th className="py-2 bg-dark text-lg w-[70%]">Privileges</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-semibold py-2 text-center">{userData.role}</td>
                        <td className="font-semibold py-3 text-start">
                          {
                            userData.role === 'super admin' &&<div className="flex gap-2">
                                <span className="bg-blue-500 text-white border-2 px-3 py-1 rounded-3xl border-blue-800">Read data</span>
                                <span className="bg-green-500 text-white border-2 px-3 py-1 rounded-3xl border-green-800">Update data</span>
                                <span className="bg-red-500 text-white border-2 px-3 py-1 rounded-3xl border-red-800">Delete data</span>
                                <span className="bg-blue-500 text-white border-2 px-3 py-1 rounded-3xl border-blue-800">Add admins</span>
                                <span className="bg-red-500 text-white border-2 px-3 py-1 rounded-3xl border-red-800">Delete admins</span>
                              </div>
                          }
                          {
                            userData.role === 'admin' &&<div className="flex gap-2 justify-center">
                              <span className="bg-blue-500 text-white border-2 px-3 py-1 rounded-3xl border-blue-800">Read data</span>
                              <span className="bg-green-500 text-white border-2 px-3 py-1 rounded-3xl border-green-800">Update data</span>
                              <span className="bg-red-500 text-white border-2 px-3 py-1 rounded-3xl border-red-800">Delete data</span>
                            </div>
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        {openEditProfile && (
          <EditProfile
            userData={userData}
            loading={editLoading}
            handleChangeProfilePicture={handleChangeProfilePicture}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setOpenEditProfile={setOpenEditProfile}
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
  );
};
