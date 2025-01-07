import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

export const AddCategory = ({ handleSubmit,handleChange,setOpenAjoute, loading }) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Add New category</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill this inputs to add new category
          </p>
        </div>
        <form className="mt-6" onSubmit={handleSubmit}>
            <Label text={"Category Name"} />
          <Input
            type="text"
            name={"categoryName"}
            onChange={handleChange}
            placholder="ex: joendoe"
            border="black"
            text="black"
          />
          
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setOpenAjoute(false)}
              bg="bg-gray-200"
              color="gray-900"
            />
            <Button
              type="submit"
              text="Add category"
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


  