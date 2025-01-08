import { Button } from "../ui/Button";

export const AcceptModal = ({
  setOpenAccept,
  deleteItem,
  itemType,
  loading,
}) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white px-10 py-6 rounded-md shadow-lg">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            Are you sure you want to accept this {itemType}?
          </h1>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">
            if you accept this {itemType} you can't retrieve it to pending, are
            you sure you want to proceed?
          </p>
        </div>
        <div className="flex justify-end gap-3 mt-6 w-[40%] float-end">
          <Button
            type={"button"}
            text={"Cancel"}
            onClick={() => setOpenAccept(false)}
            bg={"bg-gray-200 px-3"}
            color={"black"}
            width={"20%"}
          />
          <Button
            type={"button"}
            text={"Accept"}
            loading={loading}
            onClick={() => {
              deleteItem();
            }}
            bg={"bg-green-600 px-3"}
            color={"white"}
            width={"20%"}
          />
        </div>
      </div>
    </div>
  );
};
