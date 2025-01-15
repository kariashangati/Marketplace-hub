import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

export const AddProduct = ({ handleSubmitProduct,handleChangeProduct,handleChangeProfilePicture,setOpenCreateProduct,categorydata,addProductLoading,storedata }) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Create New Product</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill this inputs to create new product
          </p>
        </div>
        <form onSubmit={handleSubmitProduct} className="mt-6 flex flex-col gap-3">
            <div>
                <Label text={"Product name"} />
                <Input
                    type="text"
                    name={"productName"}
                    onChange={handleChangeProduct}
                    placholder={'ex: toyota corolla'}
                    border="gray-300"
                    text="black"
                />
            </div>
            <div>
                <Label text={"description"} /><br></br>
                <textarea name="description" placeholder={"max: 200 chars"} required={true} onChange={handleChangeProduct} className="w-[100%] px-3 py-1 outline-none border border-gray-300 resize-none"></textarea>
            </div>
            <div>
                <Label text={"Product picture max:2MB"} /><br></br>
                <input type="file" id="image" className="hidden" onChange={handleChangeProfilePicture}/>
                <label htmlFor="image" className="bg-blue-500 text-white px-3 py-1 rounded-sm cursor-pointer flex gap-2 w-[50%]">
                  <CloudArrowUpIcon className="w-6 h-6"/> 
                  <span>Upload an image</span>
                </label>
            </div>
            <div>
                <Label text={"Category"} />
                <select
                    className="bg-blue-500 mb-3 w-[100%] text-center py-2 px-2 cursor-pointer rounded-md text-white"
                    name="category_id"
                    onChange={handleChangeProduct}
                    >
                    <option>select category</option>
                    {categorydata && categorydata.length
                        ? categorydata.map((category) => {
                            return (
                            <option value={category.id}>
                                {category.categoryName}
                            </option>
                            );
                        })
                        : null}
                </select>
            </div>
            <div>
                <Label text={"stores"} />
                <select
                    className="bg-blue-500 mb-3 w-[100%] text-center py-2 px-2 cursor-pointer rounded-md text-white"
                    name="store_id"
                    onChange={handleChangeProduct}
                    >
                    <option>select store</option>

                    {storedata && storedata.length
                        ? storedata.map((store) => {
                            return (
                            <option value={store.id}>
                                {store.storeName}
                            </option>
                            );
                        })
                        : null}
                </select>
            </div>
            <div>
                <Label text={"stores"} />
                <select
                    className="bg-blue-500 mb-3 w-[100%] text-center py-2 px-2 cursor-pointer rounded-md text-white"
                    name="delivry"
                    onChange={handleChangeProduct}
                    >
                        <option>select delivry</option>
                        <option value={1}>possible delivry</option>
                        <option value={0}>Impossible delivry</option>
                </select>
            </div>
            <div>
                <Label text={"Product price"} />
                <Input
                    type="number"
                    name={"price"}
                    onChange={handleChangeProduct}
                    placholder={'ex: 150 DH'}
                    border="gray-300"
                    text="black"
                />
            </div>
            <div>
                <Label text={"location"} />
                <Input
                    type="text"
                    name={"location"}
                    onChange={handleChangeProduct}
                    placholder={'ex: Tiznit'}
                    border="gray-300"
                    text="black"
                />
            </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setOpenCreateProduct(false)}
              bg="bg-gray-200"
              color="gray-900"
            />
            <Button
              type="submit"
              text="Create"
              loading={addProductLoading}
              bg="bg-blue-600"
              color="white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};


  