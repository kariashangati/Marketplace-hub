import { useEffect, useState } from "react"
import { Product } from "../../components/App/Product"
import { UserSideBar } from "../../layouts/UserSideBar"
import { getAllProducts } from "../../services/productServices"
import { CircularProgress } from "@mui/material"
import { Button } from "../../components/ui/Button"
import { ProductSkeleton } from "../../components/App/ProductSkeleton"

export const Products = () => {
  const [products , setProducts] = useState([])
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({});


  const getProducts = async () => {
    setLoading(true);
    try{
      const response = await getAllProducts()
      setLoading(false);
      if(response.data.products.data){
        setProducts(response.data.products.data)        
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setNotification({ type: "error", message: error.response.message });
      } else {
        setNotification({ type: "error", message: "Try again later" });
      }
    }
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <div>
        <UserSideBar />
      </div>

      <div className="lg:ml-[21%] px-2 mt-8">
        <div>
          <h1 className="text-3xl font-semibold">Filter products by</h1>
          <div className="mt-2 flex gap-4">
            <select className="bg-blue-500 mb-3 w-[20%] text-center py-2 px-2 cursor-pointer rounded-md" name="category">
              <option >test1</option>
              <option >test2</option>
              <option >test3</option>
            </select>
            <select className="bg-blue-500 mb-3 w-[15%] text-center py-2 px-2 cursor-pointer rounded-md" name="category">
              <option >test1</option>
              <option >test2</option>
              <option >test3</option>
            </select><select className="bg-blue-500 mb-3 w-[15%] text-center py-2 px-2 cursor-pointer rounded-md" name="category">
              <option >test1</option>
              <option >test2</option>
              <option >test3</option>
            </select>
            <Button type={'submit'} width={'15%'} text={"filtrer"} bg={'bg-green-600'}/>
          </div>
          <div className="flex justify-center mt-4">
            {
              loading ? <div className="flex gap-2 flex-wrap">
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                  <ProductSkeleton />
                </div>
              :null
            }
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {
            products && products.length ?
             products.map((product)=>{
              return <Product productData={product} />
             })
            :null
          }
        </div>
      </div>
    </div>
  )
}
