import moment from "moment";
import { UserSideBar } from "../../layouts/UserSideBar";
import { Store } from "../../components/App/Store";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { viewStoresUser, viewUserData } from "../../services/userServices";
import { Notification } from "../../components/ui/Notification";
import { UserSkeleton } from "../../components/skeletons/UserSkeleton";
import { StoreSkeleton } from "../../components/skeletons/StoreSkeleton";
import { AdminSideBar } from "../../layouts/AdminSideBar";
import { getStore } from "../../services/storeServices";
import storeLogo from "../../../public/assets/storeLogo.png";
import { Product } from "../../components/App/Product";
import { ProductSkeleton } from "../../components/skeletons/ProductSkeleton";
import {
  addProductReported,
  addSavedProduct,
  deleteProductById,
  deleteProductReported,
  getProductsByStore,
} from "../../services/productServices";
import { DeleteModal } from "../../components/modals/DeleteModal";

export const StoreData = () => {
  const [storeData, setStoreData] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [selectedReportedProductId, setSelectedReportedProductId] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const getStoreData = async () => {
    setNotification(null);
    setLoading(true);
    try {
      const response = await getStore(localStorage.getItem("token"), id);
      setLoading(false);

      if (response.data.store) {
        setStoreData(response.data.store);
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

  const deleteProduct = async (productId) => {
    setNotification(null);
    try {
      setLoading(true);
      const response = await deleteProductById(
        localStorage.getItem("token"),
        productId
      );
      setLoading(false);

      if (response.status === 200) {
        setNotification({ type: "success", message: response.data.message });
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
  const getProductsByStoreId = async () => {
    setNotification(null);
    setLoading(true);
    try {
      const response = await getProductsByStore(
        localStorage.getItem("token"),
        id
      );
      setLoading(false);

      if (response.data.products) {
        setStoreProducts(response.data.products);
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

  const saveProduct = async (productId) => {
    setLoading(false);
    setNotification(null);
    try {
      const response = await addSavedProduct(
        localStorage.getItem("token"),
        productId
      );

      setNotification({ type: "success", message: response.data.message });
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setNotification({ type: "error", message: error.response.message });
      } else {
        setNotification({ type: "error", message: "Try again later" });
      }
    }
  };

  const reportedProduct = async (productId) => {
    setLoading(false);
    setNotification(null);
    try {
      const response = await addProductReported(
        localStorage.getItem("token"),
        productId
      );

      if (response.status == 201) {
        setOpen(true);
        setMessageAlert(response.data);
      } else {
        setNotification({ type: "success", message: response.data.message });
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

  const deleteReportedProduct = async (productId) => {
    setDeleteLoading(true);
    setNotification(null);
    try {
      const response = await deleteProductReported(
        localStorage.getItem("token"),
        productId
      );
      setDeleteLoading(false);
      setOpen(false);
      setNotification({ type: "success", message: response.data.message });
      setSelectedReportedProductId(0);
    } catch (error) {
      setDeleteLoading(false);
      setSelectedReportedProductId(0);
      if (error.response) {
        setNotification({ type: "error", message: error.response.message });
      } else {
        setNotification({ type: "error", message: "Try again latereee" });
      }
    }
  };

  useEffect(() => {
    getStoreData();
    getProductsByStoreId();
  }, []);

  return (
    <div>
      <div>
        {localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "super admin" ? (
          <AdminSideBar />
        ) : (
          <UserSideBar />
        )}
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
                  <img src={storeLogo} className="w-20 h-20 rounded-md" />
                </div>
                <div className="flex justify-start flex-col">
                  <span className="text-2xl font-semibold">
                    {storeData.storeName}
                  </span>
                  <span className="font-semibold text-gray-700">
                    Created by{" "}
                    <Link
                      className="text-blue-600"
                      to={`/user/userData/${storeData.user.id}`}
                    >
                      {storeData.user.username}
                    </Link>
                  </span>
                  <span className="font-semibold text-gray-700">
                    Created at{" "}
                    {moment(storeData.created_at).format("DD-MM-YYYY")}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-gray-500">{storeData.bio}</span>
              </div>
              <div className="border border-gray-700 w-[100%] mt-2"></div>
            </div>
          </div>
        )}
        {loading ? (
          <div className="py-2 flex flex-wrap justify-start gap-4">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        ) : null}
        {!loading && (
          <div className="py-2 flex flex-col gap-2">
            {storeProducts && storeProducts.length
              ? storeProducts.map((productData) => {
                  return (
                    <Product
                      viewUser
                      key={productData.id}
                      productData={productData}
                      deleteProduct={deleteProduct}
                      methodSaved={saveProduct}
                      methodReported={(productId) => {
                        reportedProduct(productId);
                        setSelectedReportedProductId(productId);
                      }}
                    />
                  );
                })
              : "This store doesn't have any products"}
          </div>
        )}

        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
          />
        )}

        {open && (
          <DeleteModal
            loading={deleteLoading}
            setOpen={setOpen}
            contenuMessage={messageAlert.message}
            deleteItem={() => {
              deleteReportedProduct(selectedReportedProductId);
            }}
          />
        )}
      </div>
    </div>
  );
};
