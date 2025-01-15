import { Button } from "../ui/Button";

export const DeleteModal = ({
  setOpen,
  deleteItem,
  itemType,
  loading,
  contenuMessage,
}) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white px-10 py-6 rounded-md shadow-lg">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            {itemType
              ? `Are you sure you want to delete this ${itemType}?`
              : `Are you sure you want to unreported this product.`}
          </h1>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">
            {itemType
              ? `If you delete this ${itemType}, it cannot be recovered. Are you sure
            you want to proceed?`
              : contenuMessage}
          </p>
        </div>
        <div className="flex justify-end gap-3 mt-6 w-[40%] float-end">
          <Button
            type={"button"}
            text={"Cancel"}
            onClick={() => setOpen(false)}
            bg={"bg-gray-200 px-3"}
            color={"black"}
            width={"25%"}
          />
          <Button
            type={"button"}
            text={"Delete"}
            loading={loading}
            onClick={() => {
              deleteItem();
            }}
            bg={"bg-red-600 px-3"}
            color={"white"}
            width={"25%"}
          />
        </div>
      </div>
    </div>
  );
};
