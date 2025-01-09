import moment from "moment";

import { UserSideBar } from "../../layouts/UserSideBar";
import { Store } from "../../components/App/Store";
import { useState } from "react";

export const UserData = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    setLoading(true);
    // try{}catch{}
  };
  //   const store = {
  //     storeLogo: "storeLogo",
  //     storeName: "storeName",
  //     created_at: new Date(),
  //     bio: "biobiobiobiobiobio",
  //   };

  return (
    <div>
      <div>
        <UserSideBar />
      </div>
      <div className="lg:ml-[21%] px-2">
        <div className="mt-6">
          {/* {!loading && ( */}
          <div>
            <div className="flex gap-4 items-center">
              <div>
                <img
                  // src={userData.profile_picture}
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="flex justify-start flex-col">
                <span className="text-2xl font-semibold">fullName</span>
                <span className="font-semibold text-gray-700">username</span>
                <span className="font-semibold text-gray-700">
                  Joined at{" "}
                  {/*{moment(userData.created_at).format("DD-MM-YYYY")} */}
                  moment userData created_at format"DD-MM-YYYY"
                </span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-gray-500">bio</span>
            </div>
            <div className="border border-gray-700 w-[100%] mt-2"></div>
          </div>
        </div>
        <div className="py-2 flex flex-wrap justify-start">
          <Store storeData={store} />
          <Store storeData={store} />
          <Store storeData={store} />
          <Store storeData={store} />
          <Store storeData={store} />
          <Store storeData={store} />
          <Store storeData={store} />
          <Store storeData={store} />
          <Store storeData={store} />
        </div>
      </div>
    </div>
  );
};
