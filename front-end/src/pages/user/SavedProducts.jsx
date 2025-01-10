import { useEffect, useRef, useState } from "react";
import { viewSavedProducts } from "../../services/userServices";
import { UserSideBar } from "../../layouts/UserSideBar";
import { Product } from "../../components/App/Product";
import { ProductSkeleton } from "../../components/skeletons/ProductSkeleton";

export const SavedProducts = () => {
  const [savedProductsList, setSavedProductsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [notification, setNotification] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const hasMore = useRef(true);
  const loadingRef = useRef(false);

  const getSavedProducts = async (page) => {
    if (loadingRef.current || !hasMore.current) return;

    loadingRef.current = true;
    setLoading(true);
    try {
      const response = await viewSavedProducts(
        localStorage.getItem("token"),
        page
      );
      setLoading(false);
      loadingRef.current = false;

      if (response.data.savedProducts.data.length === 0) {
        hasMore.current = false;
        return;
      }
      setSavedProductsList((prevSavedProductsList) => [
        ...prevSavedProductsList,
        ...response.data.savedProducts.data,
      ]);
    } catch (error) {
      setLoading(false);
      loadingRef.current = false;
      if (error.response) {
        setNotification({ typeo: "error", message: error.response.message });
      }
    }
  };

  const deleteSavedProduct = async (productId) => {
    try {
      console.log(productId);
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

  useEffect(() => {
    const handleScroll = async () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
      if (isAtBottom && !loadingRef.current) {
        const nextPage = page + 1;
        setPage(nextPage);
        await getSavedProducts(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getSavedProducts(page);
  }, [page]);

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
                      deleteItem={() => {
                        deleteSavedProduct(selectedProductId);
                      }}
                      viewUser={true}
                      key={savedProduct.id}
                      productData={savedProduct.product}
                    />
                  );
                })
              : "Product not saved"}
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
      </div>
    </div>
  );
};
