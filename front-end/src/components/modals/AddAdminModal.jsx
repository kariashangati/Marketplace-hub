import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

export const AddAdminModal = ({ handleSubmit,handleChange,setOpenAddAdmin, loading }) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Add New Admin</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill this inputs to add new admin
          </p>
        </div>
        <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <Label text={"Full name"} />
              <Input
                type="text"
                name={"fullName"}
                onChange={handleChange}
                placholder="ex: joen doe"
                border="gray-300"
                text="black"
              />
            </div>
            <div>
              <Label text={"Email"} />
              <Input
                type="email"
                name={"email"}
                onChange={handleChange}
                placholder="ex: joendoe004@gmail.com"
                border="gray-300"
                text="black"
              />
            </div>
            <div>
              <Label text={"Username"} />
              <Input
                type="text"
                name={"username"}
                onChange={handleChange}
                placholder="ex: joe004."
                border="gray-300"
                text="black"
              />
            </div>
            <div>
              <Label text={"Password"} />
              <Input
                type="password"
                name={"password"}
                onChange={handleChange}
                placholder="●●●●●●●"
                border="gray-300"
                text="black"
              />
            </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setOpenAddAdmin(false)}
              bg="bg-gray-200"
              color="gray-900"
            />
            <Button
              type="submit"
              text="Add Admin"
              loading={loading}
              bg="bg-blue-600"
              color="white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};


  