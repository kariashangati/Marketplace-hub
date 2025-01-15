import { useEffect, useState } from "react";
import { AdminSideBar } from "../../layouts/AdminSideBar";
import {
  addNewCategory,
  deleteCategoryService,
  getCategoryList,
} from "../../services/categoryServices";
import { LinearProgress } from "@mui/material";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { Notification } from "../../components/ui/Notification";
import { Button } from "../../components/ui/Button";
import { AddCategory } from "../../components/modals/AddCategory";

export const CategoryList = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({});
  const [categoryId, setCategoryId] = useState();
  const [addLoading, setAddLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAjoute, setOpenAjoute] = useState(false);

  const [formdata, setFormdata] = useState({
    categoryName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);
    setAddLoading(true);
    try {
      const response = await addNewCategory(
        localStorage.getItem("token"),
        formdata
      );
      setAddLoading(false);
      if (response.status === 200 && response.data.message) {
        setOpenAjoute(false);
        getCategories();
        setNotification({ type: "success", message: response.data.message });
      }
    } catch (error) {
      setAddLoading(false);
      setOpenAjoute(false);
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

  const getCategories = async () => {
    setLoading(true);
    setNotification(null);
    try {
      const response = await getCategoryList(localStorage.getItem("token"));
      setLoading(false);
      if (response.data.categories) {
        setCategoriesList(response.data.categories);
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
  const deleteCategory = async (categoryId) => {
    setNotification(null);
    setDeleteLoading(true);
    try {
      const response = await deleteCategoryService(
        localStorage.getItem("token"),
        categoryId
      );
      setDeleteLoading(false);
      setOpenDelete(false);
      if (response.status === 200) {
        setNotification({ type: "success", message: response.data.message });
        const newCategoriesList = categoriesList.filter((_category) => {
          return _category.id !== categoryId;
        });
        setCategoriesList(newCategoriesList);
      }
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
    getCategories();
  }, []);

  return (
    <div>
      <div>
        <AdminSideBar />
      </div>
      <div className="lg:ml-[21%] px-2">
        <div className="pt-6">
          <h1 className="text-3xl font-semibold">Categories List</h1>
        </div>
        <div className="w-[30%] mt-5">
          <Button
            text={"Add category"}
            width={"40%"}
            onClick={() => setOpenAjoute(true)}
          />
        </div>
        <div className="mt-5 pr-5">{loading && <LinearProgress />}</div>
        <div className="mt-6 pr-5">
          {!loading && (
            <table className="w-[100%] border border-gray-400 h-[300px] overflow-auto">
              <thead>
                <tr>
                  <th className="py-2">id</th>
                  <th className="py-2">categoryName</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoriesList && categoriesList.length
                  ? categoriesList.map((category) => {
                      return (
                        <tr key={category.id} className="text-center">
                          <td>{category.id}</td>
                          <td>{category.categoryName}</td>
                          <td>
                            <div className="flex justify-center gap-2">
                              <TrashIcon
                                className="w-8 h-8 text-red-600 cursor-pointer hover:text-red-800 duration-200"
                                onClick={() => {
                                  setOpenDelete(true);
                                  setCategoryId(category.id);
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
          {openDelete && (
            <DeleteModal
              loading={deleteLoading}
              setOpen={setOpenDelete}
              itemType={"category"}
              deleteItem={() => deleteCategory(categoryId)}
            />
          )}
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
            />
          )}
          {openAjoute && (
            <AddCategory
              loading={addLoading}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              setOpenAjoute={setOpenAjoute}
            />
          )}
        </div>
      </div>
    </div>
  );
};
