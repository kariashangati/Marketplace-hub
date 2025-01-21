import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteMessage } from "../../../services/messageServices";

export const MessageItem = ({ message, deleteItemMeassage }) => {
  const isMe = localStorage.getItem("id") == message.senderId;

  return (
    <div
      className={`w-[700px] flex items-center  gap-1 ${
        isMe ? "self-end  justify-end" : "flex-row-reverse justify-end"
      }`}
    >
      <span>
        <TrashIcon
          onClick={(e) => {
            deleteItemMeassage();
            e.stopPropagation();
          }}
          width={20}
          height={20}
          className="text-red-300 cursor-pointer hover:text-red-800 duration-200"
        />
      </span>

      <p
        className={`text-white rounded-xl p-4 break-words w-min min-w-[250px] max-w-[60%] ${
          isMe ? " bg-sky-500 " : "bg-gray-700"
        }`}
      >
        {message.messageContent}
      </p>
    </div>
  );
};
