import React, { useEffect, useState } from "react";
import {
  getStoresList,
  searchStoresByName,
} from "../../services/adminServices";
import { LinearProgress } from "@mui/material";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Input } from "../../components/ui/Input";
import { AdminSideBar } from "../../layouts/AdminSideBar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StoresList() {
  const [storesList, setStoresList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});

  const getStores = async () => {
    setLoading(true);
    try {
      const response = await getStoresList(localStorage.getItem("token"));

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

    searchInput && storesSearch();
  }, [searchInput]);

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

                          <td><Link className="text-blue-500 underline">{store.user.username}</Link></td>
                          <td>{store.bio.substring(0, 50)}...</td>
                          <td>
                            <div className="flex justify-center gap-2">
                              <EyeIcon className="w-8 h-8 text-green-600 cursor-pointer hover:text-green-800 duration-200" />
                              <TrashIcon
                                onClick={() => {
                                  const newStoreList = storesList.filter(
                                    (_store) => _store.id !== store.id
                                  );
                                  setStoresList(newStoreList);
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
        </div>
      </div>
    </div>
  );
}
