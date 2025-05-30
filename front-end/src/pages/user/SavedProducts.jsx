import { useEffect, useRef, useState } from "react";
import { viewSavedProducts } from "../../services/userServices";
import { UserSideBar } from "../../layouts/UserSideBar";
import { Product } from "../../components/App/Product";
import { ProductSkeleton } from "../../components/skeletons/ProductSkeleton";
import { deleteSavedProduct } from "../../services/productServices";
import { Notification } from "../../components/ui/Notification";

export const SavedProducts = () => {
  const [savedProductsList, setSavedProductsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [notification, setNotification] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const hasMore = useRef(true);

  const getSavedProducts = async (page) => {
    if (loading || !hasMore.current) return;

    setLoading(true);
    try {
      const response = await viewSavedProducts(
        localStorage.getItem("token"),
        page
      );
      setLoading(false);

      setSavedProductsList((prevSavedProductsList) => [
        ...prevSavedProductsList,
        ...response.data.savedProducts.data,
      ]);

      if (response.data.savedProducts.last_page === page) {
        
        hasMore.current = false;
        return;
      }
    } catch (error) {
      setLoading(false);

      if (error.response) {
        setNotification({ typeo: "error", message: error.response.message });
      }
    }
  };

  useEffect(() => {
    const handleScroll = async () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
      if (isAtBottom && !loading && hasMore.current) {
        const nextPage = page + 1;
        setPage(nextPage);
        await getSavedProducts(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  useEffect(() => {
    getSavedProducts(1);
  }, []);

  useEffect(() => {
    const deleteProductSaved = async (productId) => {
      setNotification(null);
      try {
        const response = await deleteSavedProduct(
          localStorage.getItem("token"),
          productId
        );
        setLoading(false);
        setNotification({ type: "success", message: response.data.message });
        const newSavedProductsList = savedProductsList.filter(
          (_savedProduct) => {
            return _savedProduct.product.id !== productId;
          }
        );
        setSavedProductsList(newSavedProductsList);
      } catch (error) {
        setLoading(false);
        getSavedProducts();
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
    if (selectedProductId !== 0) {
      deleteProductSaved(selectedProductId);
    }
  }, [selectedProductId]);

  return (
    <div>
      <div>
        <UserSideBar />
      </div>
      <div className="lg:ml-[21%] py-2 mt-8">
        <div>
          <h1 className="text-3xl font-semibold">Products saved</h1>
        </div>
        {!loading ? (
          <div className="flex flex-col gap-2 flex-wrap mt-4">
            {savedProductsList && savedProductsList.length
              ? savedProductsList.map((savedProduct) => {
                  return (
                    <Product
                      deleteSaved={(productId) => {
                        setSelectedProductId(productId);
                      }}
                      viewUser={false}
                      key={savedProduct.id}
                      productData={savedProduct.product}
                    />
                  );
                })
              : "You don't save any products"}
          </div>
        ) : (
          <div className="mt-4">
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
          </div>
        )}
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
          />
        )}
      </div>
    </div>
  );
};
