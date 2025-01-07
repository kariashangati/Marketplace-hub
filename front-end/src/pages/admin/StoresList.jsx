import React, { useEffect, useState } from "react";
import {
  deleteStoreById,
  getStoresListByPage,
  searchStoresByName,
} from "../../services/adminServices";
import { LinearProgress } from "@mui/material";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Input } from "../../components/ui/Input";
import { AdminSideBar } from "../../layouts/AdminSideBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { ResultPagination } from "../../components/ui/ResultPagination";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { Notification } from "../../components/ui/Notification";

export default function StoresList() {
  const [storesList, setStoresList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [lastPage, setLastPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedStoreId, setSelectedUserId] = useState(0);
  const [deleteLoading, setdeleteLoading] = useState(0);

  const getStores = async (page) => {
    setLoading(true);
    try {
      const response = await getStoresListByPage(
        localStorage.getItem("token"),
        page
      );
      setTotal(response.stores.total);
      setLastPage(response.stores.last_page);
      setLoading(false);
      if (response.stores.data) {
        setStoresList(response.stores.data);
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
      const response = await getStores(page + 1);
      if (response.stores.data) {
        setStoresList(response.stores.data);
      }
    }
  };

  const previusData = async () => {
    if (page !== 1) {
      setPage(page - 1);
      const response = await getStores(page - 1);
      if (response.stores.data) {
        setStoresList(response.stores.data);
      }
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  const handlChandeSearch = (e) => {
    setLoading(true);
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const storesSearch = async () => {
      try {
        const response = await searchStoresByName(
          localStorage.getItem("token"),
          searchInput
        );
        setLoading(false);
        if (response.storesSearched) {
          setStoresList(response.storesSearched);
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
    if (searchInput !== "") {
      storesSearch();
    } else {
      getStores();
    }
  }, [searchInput]);

  const deleteStore = async (storeId) => {
    setNotification(null);
    setdeleteLoading(true);
    try {
      const response = await deleteStoreById(
        localStorage.getItem("token"),
        storeId
      );
      setdeleteLoading(false);
      setOpen(false);
      setNotification({ message: response.message, type: "success" });
      const newStoreList = storesList.filter((_store) => _store.id !== storeId);
      setStoresList(newStoreList);
    } catch (error) {
      setOpen(false);
      setdeleteLoading(false);
      getStores();
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
  return (
    <div>
      <div>
        <AdminSideBar />
      </div>
      <div className="lg:ml-[21%] px-2">
        <div className="pt-6">
          <h1 className="text-3xl font-semibold">Stores List</h1>
          <div className="w-[60%] pt-6">
            <Input
              value={searchInput}
              type={"text"}
              name={"storeName"}
              placholder={"Search stores by name"}
              onChange={handlChandeSearch}
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
                  <th className="py-2">storeName</th>
                  <th className="py-2">creator_username</th>
                  <th className="py-2">store description</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {storesList && storesList.length
                  ? storesList.map((store) => {
                      return (
                        <tr key={store.id} className="text-center">
                          <td>{store.id}</td>
                          <td className="flex justify-center">
                            {store.storeName}
                          </td>

                          <td>
                            <Link className="text-blue-500 underline">
                              {store.user.username}
                            </Link>
                          </td>
                          <td>{store.bio.substring(0, 50)}...</td>
                          <td>
                            <div className="flex justify-center gap-2">
                              <EyeIcon className="w-8 h-8 text-green-600 cursor-pointer hover:text-green-800 duration-200" />
                              <TrashIcon
                                onClick={() => {
                                  setSelectedUserId(store.id);
                                  setOpen(true);
                                }}
                                className="w-8 h-8 text-red-600 cursor-pointer hover:text-red-800 duration-200"
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
          {!loading && searchInput === "" && (
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
              itemType={"store"}
              deleteItem={() => deleteStore(selectedStoreId)}
            />
          )}
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}
        </div>
      </div>
    </div>
  );
}
