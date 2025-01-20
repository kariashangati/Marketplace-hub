import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import storeLogo from "../../../public/assets/storeLogo.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const Product = ({
  deleteSaved,
  productData,
  viewUser,
  methodSaved,
  methodReported,
  deleteProduct
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className="bg-dark p-3 w-[100%] rounded-md flex gap-5 cursor-pointer hover:bg-black duration-200" >
      <div className="w-[25%]">
        <img
          src={productData.product_image}
          className="w-full h-[250px] rounded-md object-cover"
          alt="Store Logo"
        />
      </div>
      <div className="w-[75%]">
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <img
              src={productData.store.user.profile_picture}
              className="w-8 h-8 rounded-full object-cover"
              alt="User Profile"
            />
            <span
              className="font-semibold cursor-pointer hover:text-blue-300 duration-200"
              onClick={() =>
                navigate(`/user/userData/${productData.store.user.id}`)
              }
            >
              {productData.store.user.username}
            </span>
          </div>
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <EllipsisVerticalIcon className="w-8 h-8 text-white cursor-pointer hover:text-gray-400 duration-200" />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {viewUser ? (
                <span>
                  <MenuItem
                    onClick={() => {
                      methodSaved(productData.id);
                      handleClose();
                    }}
                  >
                    Save
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      deleteProduct(productData.id);
                      handleClose();
                    }}
                  >
                    Delete
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      methodReported(productData.id);
                      handleClose();
                    }}
                  >
                    Report
                  </MenuItem>
                </span>
              ) : (
                <MenuItem
                  onClick={() => {
                    deleteSaved(productData.id);
                    handleClose();
                  }}
                >
                  Remove
                </MenuItem>
              )}
            </Menu>
          </div>
        </div>

        <div className="mt-2">
          <h1 className="text-2xl font-semibold hover:underline duration-200 hover:text-sky-500" onClick={() => navigate(`/product/productdetails/${productData.id}`)}>{productData.productName}</h1>
          <p>{productData.description}</p>
        </div>
        <div className="mt-1">
          <span className="bg-blue-500 px-3 rounded-3xl">
            {productData.delivry}
          </span>
          <br />
          <div className="mt-2">
            <span className="text-gray-400">
              Posted {moment(productData.created_at).fromNow()}
            </span>
            <br />
            <span className="text-gray-400">{productData.location}</span>
          </div>
          <div className="mt-2 flex justify-between ">
            <span className="text-2xl font-semibold">
              {productData.price} dh
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
