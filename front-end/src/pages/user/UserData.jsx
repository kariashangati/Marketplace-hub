import moment from "moment";
import { UserSideBar } from "../../layouts/UserSideBar";
import { Store } from "../../components/App/Store";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { viewStoresUser, viewUserData } from "../../services/userServices";
import { Notification } from "../../components/ui/Notification";
import { UserSkeleton } from "../../components/skeletons/UserSkeleton";
import { StoreSkeleton } from "../../components/skeletons/StoreSkeleton";

export const UserData = () => {
  const [userData, setUserData] = useState({});
  const [storesData, setStoresData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Sloading, setSloading] = useState(false);
  const [notification, setNotification] = useState({});
  const { id } = useParams();

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await viewUserData(localStorage.getItem("token"), id);
      setUserData(response.user);
      setLoading(false);
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

  const getStoresUser = async () => {
    setNotification(null);
    setSloading(true);
    try {
      const response = await viewStoresUser(localStorage.getItem("token"), id);
      setSloading(false);
      setStoresData(response.stores);
    } catch (error) {
      setSloading(false);
      if (error.response) {
        console.log("hhhh");

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
    getStoresUser();
  }, []);

  return (
    <div>
      <div>
        <UserSideBar />
      </div>

      <div className="lg:ml-[21%] px-2">
        {loading ? (
          <div>
            <UserSkeleton />
          </div>
        ) : null}

        {!loading && (
          <div className="mt-6">
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
            </div>
          </div>
        )}
        {/* "flex gap-2 flex-wrap" */}
        {Sloading ? (
          <div className="py-2 flex flex-wrap justify-start ">
            <StoreSkeleton />
            <StoreSkeleton />
            <StoreSkeleton />
            <StoreSkeleton />
            <StoreSkeleton />
            <StoreSkeleton />
            <StoreSkeleton />
            <StoreSkeleton />
          </div>
        ) : null}
        {!Sloading && (
          <div className="py-2 flex flex-wrap justify-start">
            {storesData && storesData.length
              ? storesData.map((storeData) => {
                  return (
                    <Store
                      key={storeData.id}
                      storeData={storeData}
                      viewUser={true}
                    />
                  );
                })
              : "This user doesn't any stores"}
          </div>
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
