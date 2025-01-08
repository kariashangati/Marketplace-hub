import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

export const EditProfile = ({ userData,handleChangeProfilePicture,handleSubmit,handleChange,setOpenEditProfile, loading }) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Edit your profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill this inputs to edit profile
          </p>
        </div>
        <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
                <Label text={"Profile picture max:2MB"} /><br></br>
                <input type="file" id="image" className="hidden" onChange={handleChangeProfilePicture}/>
                <label htmlFor="image" className="bg-blue-500 text-white px-3 py-1 rounded-sm cursor-pointer flex gap-2 w-[50%]">
                  <CloudArrowUpIcon className="w-6 h-6"/> 
                  <span>Upload an image</span>
                </label>
            </div>
            <div>
                <Label text={"Full name"} />
                <Input
                    type="text"
                    name={"fullName"}
                    required={false}
                    onChange={handleChange}
                    placholder={userData.fullName}
                    border="gray-300"
                    text="black"
                />
            </div>
            <div>
                <Label text={"Username"} />
                <Input
                    type="text"
                    name={"username"}
                    required={false}
                    onChange={handleChange}
                    placholder={userData.username}
                    border="gray-300"
                    text="black"
                />
            </div>
            <div>
                <Label text={"Birthday"} />
                <Input
                    type="date"
                    name={"birthday"}
                    required={false}
                    onChange={handleChange}
                    border="gray-300"
                    text="black"
                />
            </div>
            <div>
                <Label text={"Bio max:300chars"} /><br></br>
                <textarea name="bio" placeholder={userData.bio} required={false} onChange={handleChange} className="w-[100%] px-3 py-1 outline-none border border-gray-300 resize-none"></textarea>
            </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setOpenEditProfile(false)}
              bg="bg-gray-200"
              color="gray-900"
            />
            <Button
              type="submit"
              text="Save changes"
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


  