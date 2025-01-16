import { useEffect, useRef, useState } from "react";
import { Product } from "../../components/App/Product";
import { UserSideBar } from "../../layouts/UserSideBar";
import {
  addNewProduct,
  addProductReported,
  addSavedProduct,
  deleteProductReported,
  getAllProducts,
  getProductsBy,
} from "../../services/productServices";
import { Button } from "../../components/ui/Button";
import { ProductSkeleton } from "../../components/skeletons/ProductSkeleton";
import { addNewCategory, getCategoryList } from "../../services/categoryServices";
import { Notification } from "../../components/ui/Notification";
import { DeleteModal } from "../../components/modals/DeleteModal";
import addproduct from "../../../public/assets/addproduct.jpg";
import { AddProduct } from "../../components/modals/AddProduct";
import { getUserStoresList } from "../../services/storeServices";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const [page, setPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [selectedReportedProductId, setSelectedReportedProductId] = useState(0);
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [counterReported, setCounterReported] = useState(0);
  const [counterSaved, setCounterSaved] = useState(0);

  const filtered = useRef(false);
  const hasMore = useRef(true);
  const loadingRef = useRef(false);
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [openCreateProduct,setOpenCreateProduct] = useState(false);
  const [stores,setStores] = useState({});


  const [data, setData] = useState({
    category_id: 0,
    price: "",
    delivry: null,
  });
  
  const [newProduct ,setNewProduct] = useState({
    productName : "",
    description : "",
    category_id : 0,
    store_id : 0,
    price : 0,
    location : "",
    delivry : null,
  })
  const [profilePicture, setProfilePicture] = useState(null);
    const handleChangeProfilePicture = (e) => {
        setProfilePicture(e.target.files[0]);
    };

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
          ...prevState,
          [name]: value,
      }));
  };

  const getUserStores = async () =>{
    try{
      const response = await getUserStoresList(localStorage.getItem("token"));
      if(response.data.stores){
          setStores(response.data.stores)
      }
    }catch(error){
        if (error.response) {
        setNotification({
            type: "error",
            message: error.response.data.message,
        });
        } else {
        setNotification({ type: "error", message: "Try again later" });
        }
    }
  }
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitProduct = async (e) => {
      e.preventDefault();
      setNotification(null);
      setAddProductLoading(true);
      try {
        const dataNewProduct = new FormData();
        dataNewProduct.append("productName", newProduct.productName);
        dataNewProduct.append("description", newProduct.description);
        dataNewProduct.append("category_id", newProduct.category_id);
        dataNewProduct.append("store_id", newProduct.store_id);
        dataNewProduct.append("price", newProduct.price);
        dataNewProduct.append("location", newProduct.location);
        dataNewProduct.append("delivry", newProduct.delivry);
        

        if (profilePicture !== null) {
          dataNewProduct.append("image", profilePicture);
        }
        const response = await addNewProduct(
          localStorage.getItem("token"),
          dataNewProduct
        );
        setAddProductLoading(false);
        if (response.status === 200 && response.data.message) {
          setOpenCreateProduct(false)
          setNotification({ type: "success", message: response.data.message });
        }
      } catch (error) {
        setAddProductLoading(false)
        setOpenCreateProduct(false)
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

  const getProducts = async (page) => {
    if (loading || !hasMore.current) return;

    try {
      setLoading(true);
      const response = await getAllProducts(page);
      setLoading(false);

      if (response.data.products.last_page === page) {
        hasMore.current = false;
        return;
      }

      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.products.data,
      ]);
    } catch (error) {
      setLoading(false);

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

      if (isAtBottom && !loading && !filtered.current && hasMore.current) {
        const nextPage = page + 1;
        setPage((prevState) => prevState + 1);
        getProducts(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading]);

  useEffect(() => {
    getCategories();
    getProducts(1);
  }, []);

  const getProductsFiltrer = async (data) => {
    hasMore.current = true;

    if (loading || !hasMore.current) return;

    try {
      setNotification(null);
      setProducts([]);
      setLoading(true);
      const response = await getProductsBy(localStorage.getItem("token"), data);
      setLoading(false);

      setProducts(response.data.products.data);

      if (response.data.products.last_page === page) {
        hasMore.current = false;
        return;
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
    if (counterSaved !== 0) {
      saveProduct(selectedProductId);
    }
  }, [counterSaved]);

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

    if (counterReported !== 0) {
      reportedProduct(selectedReportedProductId);
    }
  }, [counterReported]);

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
        <div className="mt-6 w-[99%] h-52 mb-6 px-2 py-1">
        <div className="relative bg-black">
          <img
            src={addproduct}
            className="object-fill h-52 w-full"
            alt="Add Product"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              type="submit"
              text="Add Product"
              width="10"
              onClick={() => {setOpenCreateProduct(true);
                getUserStores();}
              }
            />
          </div>
        </div>
        </div>
        <div>
          <h1 className="text-3xl font-semibold">Filter products by</h1>
          <div className="mt-2 flex gap-4">
            <select
              className="bg-blue-500 mb-3 w-[20%] text-center py-2 px-2 cursor-pointer rounded-md"
              name="category_id"
              onChange={handleChange}
            >
              <option>select category</option>
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
              <option>select price</option>
              <option value="0-100">{"0 -> 100"}</option>
              <option value="100-500">{"100 -> 500"}</option>
              <option value="500-9999">{"> 500"}</option>
            </select>
            <select
              className="bg-blue-500 mb-3 w-[15%] text-center py-2 px-2 cursor-pointer rounded-md"
              name="delivry"
              onChange={handleChange}
            >
              <option>Delivry</option>
              <option value={1}>possible delivry</option>
              <option value={0}>Impossible delivry</option>
            </select>
            <Button
              type="button"
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
          {products &&
            products.length > 0 &&
            products.map((product) => {
              return (
                <Product
                  viewUser
                  methodReported={(productId) => {
                    setSelectedReportedProductId(productId);

                    setCounterReported((preState) => {
                      return (preState = preState + 1);
                    });
                  }}
                  methodSaved={(productId) => {
                    setSelectedProductId(productId);
                    setCounterSaved((preState) => {
                      return (preState = preState + 1);
                    });
                  }}
                  productData={product}
                />
              );
            })}
          {!loading && products.length === 0 && <p>No products founded!</p>}
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
              deleteItem={() => {
                deleteReportedProduct(selectedReportedProductId);
              }}
            />
          )}
          {openCreateProduct && (
            <AddProduct
            handleSubmitProduct={handleSubmitProduct}
            addProductLoading={addProductLoading}
            setOpenCreateProduct={setOpenCreateProduct}
            handleChangeProduct={handleChangeProduct}
            handleChangeProfilePicture={handleChangeProfilePicture}
            categorydata={categories}
            storedata={stores}
             />
          )

          }
        </div>
      </div>
    </div>
  );
};
