import React from "react";

export const MessageChats = ({ item }) => {
  return (
    <div className="border-b p-4 text-black flex items-center justify-between">
      <div className="flex items-center gap-2 relative">
        <div>
          <img
            className="rounded-full w-8 h-8"
            src="/assets/userDefaultImage.jpg"
            alt=""
          />
        </div>
        <div>
          <p className="font-semibold ">{item.userName}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p>{item.timeAgo}</p>
        {item.redd ? null : (
          <span className="bg-red-800 rounded-full w-6 h-6 flex items-center justify-center text-white text-[12px]">
            {item.messagesCount}
          </span>
        )}
      </div>
    </div>
  );
};
