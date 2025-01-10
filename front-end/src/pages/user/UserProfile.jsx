import { useEffect, useState } from "react";
import { Button } from "../../components/ui/Button"
import { UserSideBar } from "../../layouts/UserSideBar"
import { editProfileData, getAuthenticatedUserData } from "../../services/userServices";
import moment from "moment";
import { UserSkeleton } from "../../components/skeletons/UserSkeleton";
import { createStore, getUserStoresList } from "../../services/storeServices";
import StoreSkeleton from "../../components/skeletons/StoreSkeleton";
import { Store } from "../../components/App/Store";
import { EditProfile } from "../../components/modals/EditProfileModal";
import { Notification } from "../../components/ui/Notification";
import { CreateStore } from "../../components/modals/CreateStore";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { deleteStoreById } from "../../services/adminServices";

export const UserProfile = () => {

    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [notification, setNotification] = useState({});
    const [editLoading, setEditLoading] = useState(false);
    const [storesLoading,setStoresLoading] = useState(true);
    const [stores,setStores] = useState(false);
    const [openCreateStore,setOpenCreateStore] = useState(false);
    const [createStoreLoading,setCreateStoreLoading] = useState(false);
    const [deleteLoading,setDeleteLoading] = useState(false);
    const [openDelete,setOpenDelete] = useState(false);
    const [selectedStoreId,setSelectedStoreId] = useState();

    const [formdata, setFormdata] = useState({
        fullName: "",
        username: "",
        birthday: "",
        bio: "",
    });

    const [storeData,setStoreData] = useState({
        storeName: "",
        storeBio:"",
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


    const handleStoreChange = (e) => {
        const { name, value } = e.target;
        setStoreData((prevState) => ({
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

    const getUserStores = async () =>{
        try{
            const response = await getUserStoresList(localStorage.getItem("token"));
            setStoresLoading(false)
            if(response.data.stores){
                setStores(response.data.stores)
            }
        }catch(error){
            setStoresLoading(false);
            if (error.response) {
            setNotification({
                type: "error",
                message: error.response.data.message,
            });
            } else {
            setNotification({ type: "error", message: "Try again later" });
            }
        }
    }
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

    const handleCreateStoreSubmit = async (e) =>{
        e.preventDefault();
        setNotification(null);
        setCreateStoreLoading(true);
        try {
            const response = await createStore(
            localStorage.getItem("token"),
            storeData
            );
            setCreateStoreLoading(false);
            if (response.status === 200) {
                setOpenCreateStore(false);
                if (response.data.message) {
                    setNotification({ type: "success", message: response.data.message });
                    await getUserStores();
                }
            }
        } catch (error) {
            setCreateStoreLoading(false);
            setOpenCreateStore(false);
            if (error.response) {
            setNotification({
                type: "error",
                message: error.response.data.message,
            });
            } else {
            setNotification({ type: "error", message: "Try again later" });
            }
        }
    }

    const deleteStore = async (storeId) => {
        setNotification(null);
        setDeleteLoading(true);
        try {
            const response = await deleteStoreById(
            localStorage.getItem("token"),
            storeId
            );
            setDeleteLoading(false);
            setOpenDelete(false);
            
            setNotification({ type: "success", message: response.message });
            await getUserStores();
            
        } catch (error) {
            setOpenDelete(false);
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
    

    useEffect(() => {
        getUserData();
        getUserStores();
    }, []);


  return (
    <div>
          <div>
            <UserSideBar />
          </div>
          <div className="lg:ml-[21%] px-2">
            <div className="pt-6 w-[100%] flex justify-between">
              <h1 className="text-3xl font-semibold">Your Profile</h1>
              <Button
                text={"Edit profile Data"}
                onClick={() => setOpenEditProfile(true)}
                width={"10%"}
              />
            </div>
           
            <div>
                {
                    loading && <UserSkeleton />
                }
                {
                    !loading ?
                    <>
                        <div className="flex gap-4 items-center mt-4">
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
                    </>
                    :null
                }
                <div>
                    <div className="mt-4 flex justify-between">
                        <h1 className="text-3xl font-semibold">Your stores</h1>
                        <Button text={'Create Store'} width={'10%'} onClick={() => setOpenCreateStore(true)}/>
                    </div>
                    <div>
                        {
                            storesLoading ? <div className="flex flex-wrap gap-2">
                                <StoreSkeleton />
                                <StoreSkeleton />
                                <StoreSkeleton />
                                <StoreSkeleton />
                                <StoreSkeleton />
                                <StoreSkeleton />
                            </div>:null
                        }
                    </div>
                    <div>
                        {!storesLoading && (
                            <div className="py-2 flex flex-wrap justify-start gap-2">
                            {stores && stores.length
                                ? stores.map((storeData) => {
                                    return (
                                    <Store
                                        key={storeData.id}
                                        storeData={storeData}
                                        viewUser={false}
                                        setSelectedStoreId={setSelectedStoreId}
                                        setOpen={setOpenDelete}
                                    />
                                    );
                                })
                                : "You don't have any stores"}
                            </div>
                        )}
                    </div>
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
                {openCreateStore && (
                    <CreateStore
                    createStoreLoading={createStoreLoading}
                    handleCreateStoreSubmit={handleCreateStoreSubmit}
                    handleStoreChange={handleStoreChange}
                    setOpenCreateStore={setOpenCreateStore}
                    />
                )}
                {notification && (
                    <Notification
                    type={notification.type}
                    message={notification.message}
                    />
                )}

                {openDelete && (
                    <DeleteModal
                    loading={deleteLoading}
                    setOpen={setOpenDelete}
                    setSelectedStoreId={setSelectedStoreId}
                    itemType={"Store"}
                    deleteItem={() => deleteStore(selectedStoreId)}
                    />
                )}
            </div>
          </div>
        </div>
  )
}
