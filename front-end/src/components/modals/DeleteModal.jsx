export const DeleteModal = ({ setOpen, deleteUser, itemType}) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white px-10 py-6 rounded-md shadow-lg">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            Are you sure you want to delete this {itemType}?
          </h1>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">
            If you delete this {itemType}, it cannot be recovered. Are you sure you want to proceed?
          </p>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="bg-gray-200 text-black border-2 border-gray-400 px-3 py-1 rounded-sm"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded-sm"
            onClick={() => deleteUser()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

  