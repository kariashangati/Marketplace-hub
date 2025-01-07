import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

export const AddAdminModal = ({ setOpenAddAdmin, loading }) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Add New Admin</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill this inputs to add new admin
          </p>
        </div>
        <form className="mt-6">
            <Label text={"Full name"} />
          <Input
            type="text"
            placholder="ex: joen doe"
            border="black"
            text="black"
          />
          <Label text={"Email"} />
          <Input
            type="email"
            placholder="ex: joendoe004@gmail.com"
            border="black"
            text="black"
          />
          <Label text={"Username"} />
          <Input
            type="text"
            placholder="ex: joe004."
            border="black"
            text="black"
          />
          <Label text={"Password"} />
          <Input
            type="password"
            placholder="●●●●●●●"
            border="black"
            text="black"
          />
        </form>
        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            text="Cancel"
            onClick={() => setOpenAddAdmin(false)}
            bg="bg-gray-200"
            color="gray-900"
          />
          <Button
            type="button"
            text="Add Admin"
            loading={loading}
            bg="bg-blue-600"
            color="white"
          />
        </div>
      </div>
    </div>
  );
};


  