import { LinearProgress } from "@mui/material";
import { AdminSideBar } from "../../layouts/AdminSideBar";
import { useEffect, useState } from "react";
import moment from "moment";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ResultPagination } from "../../components/ui/ResultPagination";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { deleteProductById } from "../../services/productServices";
import {
  acceptedPendingProduct,
  getPendingProducts,
} from "../../services/adminServices";
import { Notification } from "../../components/ui/Notification";
import { AcceptModal } from "../../components/modals/AcceptModal";

export const PendingProducts = () => {
  const [pendingProductsList, setPendingProductsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const [page, setPage] = useState(1);
  const [openAccept, setOpenAccept] = useState();
  const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getProductsPending = async (page) => {
    setLoading(true);
    try {
      const response = await getPendingProducts(
        localStorage.getItem("token"),
        page
      );
      setLoading(false);
      if (response.products.data) {
        setPendingProductsList(response.products.data);
        setLastPage(response.products.last_page);
        setTotal(response.products.total);
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

  const nextData = async () => {
    if (page < lastPage) {
      setPage(page + 1);
      await getProductsPending(page + 1);
    }
  };

  const previewsData = async () => {
    if (page !== 1) {
      setPage(page - 1);
      await getProductsPending(page - 1);
    }
  };

  const deleteProduct = async (productId) => {
    setNotification(null);
    setDeleteLoading(true);
    try {
      const response = await deleteProductById(
        localStorage.getItem("token"),
        productId
      );
      setDeleteLoading(false);
      setOpen(false);
      setNotification({ message: response.data.message, type: "success" });
      const newPendingProductsList = pendingProductsList.filter((_product) => {
        return _product.id !== productId;
      });
      setPendingProductsList(newPendingProductsList);
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

  const acceptPendingProduct = async (productId) => {
    setNotification(null);
    setDeleteLoading(true);
    try {
      const response = await acceptedPendingProduct(
        localStorage.getItem("token"),
        productId
      );
      setDeleteLoading(false);
      setOpenAccept(false);
      setNotification({ message: response.data.message, type: "success" });
      const newPendingProductsList = pendingProductsList.filter((_product) => {
        return _product.id !== productId;
      });
      setPendingProductsList(newPendingProductsList);
    } catch (error) {
      setOpenAccept(false);
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
        <div className="pt-6">
          <h1 className="text-3xl font-semibold">Pending Product List</h1>
        </div>
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
                {pendingProductsList && pendingProductsList.length
                  ? pendingProductsList.map((product) => {
                      return (
                        <tr key={product.id} className="text-center">
                          <td>{product.id}</td>
                          <td>{product.productName.substring(0, 15)} ...</td>
                          <td className="text-center">
                            <Link className="text-blue-500 underline">
                              {product.store.storeName.substring(0, 15)} ...
                            </Link>
                          </td>
                          <td className="text-center">
                            <Link className="text-blue-500 underline">
                              {product.store.user.fullName.substring(0, 15)} ...
                            </Link>
                          </td>
                          <td>{moment(product.created_at).fromNow()}</td>
                          <td>
                            <div className="flex justify-center gap-2">
                              <CheckCircleIcon
                                onClick={() => {
                                  setOpenAccept(true),
                                    setSelectedProductId(product.id);
                                }}
                                className="w-8 h-8 text-green-600 cursor-pointer hover:text-green-800 duration-200"
                              />
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
          {!loading && (
            <ResultPagination
              firstPage={page}
              lastPage={lastPage}
              previus={previewsData}
              next={nextData}
              total={total}
            />
          )}
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
          {openAccept && (
            <AcceptModal
              setOpenAccept={setOpenAccept}
              itemType={"product"}
              loading={deleteLoading}
              deleteItem={() => {
                acceptPendingProduct(selectedProductId);
              }}
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
