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
import { CircularProgress, LinearProgress } from "@mui/material";
import { Store } from "../App/Store";
import { getUserStoresList } from "../../services/storeServices";
export const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [notification, setNotification] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [page, setPage] = useState(false);
  const [stores, setStores] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [getMoreLoading, setGetMoreLoading] = useState(false);

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

  const getUserStores = async (page) => {
    const response = await getUserStoresList(
      localStorage.getItem("token"),
      page
    );

    if (response.data.stores.data) {
      setLastPage(response.data.stores.last_page);
      setStores([...stores, ...response.data.stores.data]);
    }
  };

  const getMore = async () => {
    if (getMoreLoading) {
      return;
    }
    if (page < lastPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      setGetMoreLoading(true);
      await getUserStores(nextPage);
      setGetMoreLoading(false);
    }
  };

  useEffect(() => {
    getUserStores();
  }, []);

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

              <div className="mt-5">
                <div className="flex justify-between">
                  <h1 className="text-xl font-semibold">My stores</h1>
                  <Button text={"New store?"} width={"20%"} />
                </div>
                <div className="flex flex-wrap mt-5 justify-between lg:gap-5">
                  {stores && stores.length
                    ? stores.map((store) => {
                        return <Store storeData={store} />;
                      })
                    : null}
                  <div
                    className="w-[48%] bg-dark border-2 border-gray-700 rounded-sm border-dashed cursor-pointer flex justify-center items-center"
                    onClick={() => getMore()}
                  >
                    <span className="text-gray-500 text-lg font-semibold">
                      {getMoreLoading ? <CircularProgress /> : "Get more"}
                    </span>
                  </div>
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
