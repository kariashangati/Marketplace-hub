import { useEffect, useState } from "react";
import { AdminSideBar } from "../../layouts/AdminSideBar";
import { LinearProgress } from "@mui/material";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getreportProductsByPage } from "../../services/adminServices";
import { ResultPagination } from "../../components/ui/ResultPagination";
import { DeleteModal } from "../../components/modals/DeleteModal";
import { Notification } from "../../components/ui/Notification";
import { deleteProductById } from "../../services/productServices";

export const ReporteProducts = () => {
  const [reporteProductsList, setReporteProductsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getReporteProducts = async (page) => {
    setLoading(true);
    try {
      const response = await getreportProductsByPage(
        localStorage.getItem("token"),
        page
      );
      setLoading(false);
      if (response.reportedProducts.data) {
        setLastPage(response.reportedProducts.last_page);
        setTotal(response.reportedProducts.total);
        setReporteProductsList(response.reportedProducts.data);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setNotification({
          type: "error",
          message: error.response.reportedProducts.data.message,
        });
      } else {
        setNotification({ type: "error", message: "Try again later" });
      }
    }
  };
  useEffect(() => {
    getReporteProducts(1);
  }, []);

  const nextData = async () => {
    if (page < lastPage) {
      setPage(page + 1);
      await getReporteProducts(page + 1);
    }
  };

  const previewsData = async () => {
    if (page !== 1) {
      setPage(page - 1);
      await getReporteProducts(page - 1);
    }
  };

  const deleteReporteProduct = async (productId) => {
    setNotification(null);
    setDeleteLoading(true);
    try {
      const response = await deleteProductById(
        localStorage.getItem("token"),
        productId
      );
      setDeleteLoading(false);
      setOpen(false);
      if (response.status === 200) {
        setNotification({ type: "success", message: response.data.message });
        const newReporteProductsList = reporteProductsList.filter(
          (_product) => {
            return _product.product_id !== productId;
          }
        );
        setReporteProductsList(newReporteProductsList);
      }
    } catch (error) {
      setOpen(false);
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

  return (
    <div>
      <div>
        <AdminSideBar />
      </div>
      <div className="lg:ml-[21%] px-2">
        <div className="pt-6">
          <h1 className="text-3xl font-semibold">Reported Products</h1>
        </div>
        <div className="mt-5 pr-5">{loading && <LinearProgress />}</div>
        <div className="mt-6 pr-5">
          {!loading && (
            <table className="w-[100%] border border-gray-400">
              <thead>
                <tr>
                  <th className="py-2">id</th>
                  <th className="py-2">productName</th>
                  <th className="py-2">totalReported</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reporteProductsList && reporteProductsList.length
                  ? reporteProductsList.map((product) => {
                      return (
                        <tr key={product.product_id} className="text-center">
                          <td>{product.product_id}</td>
                          <td>{product.productName}</td>
                          <td>{product.totalReported}</td>
                          <td>
                            <div className="flex justify-center gap-2">
                              <TrashIcon
                                className="w-8 h-8 text-red-600 cursor-pointer hover:text-red-800 duration-200"
                                onClick={() => {
                                  setOpen(true);
                                  setSelectedProductId(product.product_id);
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
              loading={deleteLoading}
              setOpen={setOpen}
              itemType={"ReporteProduct"}
              deleteItem={() => deleteReporteProduct(selectedProductId)}
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
