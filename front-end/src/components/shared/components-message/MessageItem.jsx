import { EllipsisVerticalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteMessage } from "../../../services/messageServices";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import moment from "moment";

export const MessageItem = ({ message, deleteItemMeassage }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const isMe = localStorage.getItem("id") == message.senderId;

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={`w-[700px] flex ${
        isMe ? "self-end  justify-end" : "flex-row-reverse justify-end"
      }`}
    >
      {isMe && (
        <span>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <EllipsisVerticalIcon className="w-[20px] h-[20px] text-dark cursor-pointer hover:text-gray-400 duration-200" />
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
            <MenuItem
              className="text-sm"
              onClick={(e) => {
                deleteItemMeassage();
                e.stopPropagation();
                handleClose();
              }}
            >
              Remove
            </MenuItem>
          </Menu>
        </span>
      )}

      <p
        className={`rounded-3xl px-4 py-2 break-words w-min min-w-[250px] max-w-[60%] flex flex-col ${
          isMe
            ? " bg-blue-600 text-white rounded-tr-none"
            : "bg-gray-200 text-black rounded-tl-none"
        }`}
      >
        {message.messageContent}
        <span className={`self-end text-xs font-semibold ${isMe ? 'text-gray-200' : 'text-gray-500'}`}>{moment(message.createdAt).format("HH:mm")}</span>
      </p>
    </div>
  );
};
