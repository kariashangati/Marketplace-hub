import { useEffect, useRef, useState } from "react";
import { Product } from "../../components/App/Product";
import { UserSideBar } from "../../layouts/UserSideBar";
import {
  addProductReported,
  addSavedProduct,
  deleteProductReported,
  getAllProducts,
  getProductsBy,
} from "../../services/productServices";
import { Button } from "../../components/ui/Button";
import { ProductSkeleton } from "../../components/skeletons/ProductSkeleton";
import { getCategoryList } from "../../services/categoryServices";
import { Notification } from "../../components/ui/Notification";
import { DeleteModal } from "../../components/modals/DeleteModal";
export const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({});
  const [page, setPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [selectedReportedProductId, setSelectedReportedProductId] = useState(0);
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const filtered = useRef(false);
  const hasMore = useRef(true);
  const loadingRef = useRef(false);
  const [data, setData] = useState({
    category_id: 0,
    price: "",
    delivry: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getProducts = async (page) => {
    if (loadingRef.current || !hasMore.current) return;

    loadingRef.current = true;
    setLoading(true);
    try {
      const response = await getAllProducts(page);
      setLoading(false);

      loadingRef.current = false;

      if (response.data.products.data.length === 0) {
        hasMore.current = false;
        return;
      }

      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.products.data,
      ]);
    } catch (error) {
      setLoading(false);
      loadingRef.current = false;
      if (error.response) {
        setNotification({ type: "error", message: error.response.message });
      } else {
        setNotification({ type: "error", message: "Try again later" });
      }
    }
  };

  const getCategories = async () => {
    try {
      const response = await getCategoryList(localStorage.getItem("token"));
      if (response.data.categories) {
        setCategories(response.data.categories);
      }
    } catch (error) {
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
    const handleScroll = async () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
      if (isAtBottom && !loadingRef.current && !filtered.current) {
        const nextPage = page + 1;
        setPage(nextPage);
        await getProducts(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getCategories();
    getProducts(page);
  }, []);

  const getProductsFiltrer = async (data) => {
    setNotification(null);
    setLoading(true);
    filtered.current = true;
    if (loadingRef.current || !hasMore.current) return;
    loadingRef.current = true;
    try {
      const response = await getProductsBy(localStorage.getItem("token"), data);
      setLoading(false);
      loadingRef.current = false;

      if (response.data.products.length === 0) {
        hasMore.current = false;
        return;
      }
      setProducts(() => [...response.data.products.data]);
    } catch (error) {
      setLoading(false);
      loadingRef.current = false;
      if (error.response) {
        setNotification({ type: "error", message: error.response.message });
      } else {
        setNotification({ type: "error", message: "Try again later" });
      }
    }
  };

  useEffect(() => {
    const saveProduct = async (productId) => {
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
    if (selectedProductId !== 0) {
      saveProduct(selectedProductId);
      setSelectedProductId(0);
    }
  }, [selectedProductId]);

  useEffect(() => {
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

    if (selectedReportedProductId !== 0) {
      reportedProduct(selectedReportedProductId);
    }
  }, [selectedReportedProductId]);

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
        setNotification({ type: "error", message: "Try again later" });
      }
    }
  };

  return (
    <div>
      <div>
        <UserSideBar />
      </div>

      <div className="lg:ml-[21%] px-2 mt-8">
        <div>
          <h1 className="text-3xl font-semibold">Filter products by</h1>
          <div className="mt-2 flex gap-4">
            <select
              className="bg-blue-500 mb-3 w-[20%] text-center py-2 px-2 cursor-pointer rounded-md"
              name="category_id"
              onChange={handleChange}
            >
              {categories && categories.length
                ? categories.map((category) => {
                    return (
                      <option value={category.id}>
                        {category.categoryName}
                      </option>
                    );
                  })
                : null}
            </select>
            <select
              className="bg-blue-500 mb-3 w-[15%] text-center py-2 px-2 cursor-pointer rounded-md"
              name="price"
              onChange={handleChange}
            >
              <option value="0-100">{"0 -> 100"}</option>
              <option value="100-500">{"100 -> 500"}</option>
              <option value="500-9999">{"> 500"}</option>
            </select>
            <select
              className="bg-blue-500 mb-3 w-[15%] text-center py-2 px-2 cursor-pointer rounded-md"
              name="delivry"
              onChange={handleChange}
            >
              <option value={1}>possible delivry</option>
              <option value={0}>Impossible delivry</option>
            </select>
            <Button
              type={"submit"}
              width={"15%"}
              text={"Filter"}
              bg={"bg-green-700"}
              onClick={() => {
                getProductsFiltrer(data);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-wrap">
          {products && products.length
            ? products.map((product) => {
                return (
                  <Product
                    viewUser
                    methodReported={(productId) => {
                      setSelectedReportedProductId(productId);
                    }}
                    methodSaved={(productId) => {
                      setSelectedProductId(productId);
                    }}
                    productData={product}
                  />
                );
              })
            : "No products founded!"}
        </div>
        <div className="mt-4">
          {loading ? (
            <div className="flex flex-col gap-2">
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
              deleteItem={() =>
                deleteReportedProduct(selectedReportedProductId)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
