import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

export const CreateStore = ({ handleCreateStoreSubmit,handleStoreChange,setOpenCreateStore, createStoreLoading }) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Create New Store</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill this inputs to create new store
          </p>
        </div>
        <form onSubmit={handleCreateStoreSubmit} className="mt-6 flex flex-col gap-3">
                <div>
                    <Label text={"Store name"} />
                    <Input
                        type="text"
                        name={"storeName"}
                        onChange={handleStoreChange}
                        placholder={'ex: Cars store'}
                        border="gray-300"
                        text="black"
                    />
                </div>
                <div>
                    <Label text={"Store bio"} /><br></br>
                    <textarea name="storeBio" placeholder={"max: 200 chars"} required={true} onChange={handleStoreChange} className="w-[100%] px-3 py-1 outline-none border border-gray-300 resize-none"></textarea>
                </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setOpenCreateStore(false)}
              bg="bg-gray-200"
              color="gray-900"
            />
            <Button
              type="submit"
              text="Create"
              loading={createStoreLoading}
              bg="bg-blue-600"
              color="white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};


  