import { LinearProgress } from "@mui/material";
import { AdminSideBar } from "../../layouts/AdminSideBar";
import { useEffect, useState } from "react";
import {
  deleteProductById,
  getPendingProducts,
} from "../../services/adminServices";
import moment from "moment";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ResultPagination } from "../../components/ui/ResultPagination";
import { DeleteModal } from "../../components/modals/DeleteModal";

export const PendingProducts = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const [firstPage, setfirstPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getProductsPending = async () => {
    setLoading(true);
    try {
      const response = await getPendingProducts(localStorage.getItem("token"));
      setLoading(false);
      if (response) {
        setPendingProducts(response.products.data);
        // console.log(pendingProducts.length);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setNotification({ type: "error", message: error.response.message });
      } else {
        setNotification({ type: "error", message: "Try again later" });
      }
    }
  };

  useEffect(() => {
    getProductsPending();
  }, []);

  const deleteProduct = async (productId) => {
    setNotification(null);
    setDeleteLoading(true);
    try {
      const response = await deleteProductById(
        localStorage.getItem("token"),
        productId
      );
      if (response) {
        console.log(response);
      } else {
        console.log("im else");
      }
    } catch (error) {
      setOpen(false);
      setDeleteLoading(false);
      getProductsPending();
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
        <div className="mt-5 pr-5">{loading && <LinearProgress />}</div>
        <div className="mt-6 pr-5">
          {!loading && (
            <table className="w-[100%] border border-gray-400">
              <thead>
                <tr>
                  <th className="py-2">id</th>
                  <th className="py-2">productName</th>
                  <th className="py-2">storeName</th>
                  <th className="py-2">posted username</th>
                  <th className="py-2">posted_at</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingProducts && pendingProducts.length
                  ? pendingProducts.map((product) => {
                      return (
                        <tr key={product.id} className="text-center">
                          <td>{product.id}</td>
                          <td>
                            <Link className="text-blue-500 underline">
                              {product.productName.substring(0, 15)} ...
                            </Link>
                          </td>
                          <td className="text-center">
                            {product.store.storeName.substring(0, 15)} ...
                          </td>
                          <td className="text-center">
                            {product.store.user.fullName.substring(0, 15)} ...
                          </td>
                          <td>{moment(product.created_at).fromNow()}</td>
                          <td>
                            <div className="flex justify-center gap-2">
                              <CheckCircleIcon className="w-8 h-8 text-green-600 cursor-pointer hover:text-green-800 duration-200" />
                              <TrashIcon
                                onClick={() => {
                                  setOpen(true),
                                    setSelectedProductId(product.id);
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
          {!loading && <ResultPagination />}
          {open && (
            <DeleteModal
              setOpen={setOpen}
              itemType={"product"}
              loading={deleteLoading}
              deleteItem={() => {
                deleteProduct(selectedProductId);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
