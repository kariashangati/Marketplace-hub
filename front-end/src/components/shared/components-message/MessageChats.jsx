export const MessageChats = ({ item, onClick }) => {
  return (
    <div
      className="border-b p-4 text-black flex items-center justify-between cursor-pointer hover:bg-gray-200 duration-200"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 relative">
        <div>
          <img className="rounded-full w-8 h-8" src={item.profilePic} alt="" />
        </div>
        <div>
          <p className="font-semibold ">{item.username}</p>
        </div>
      </div>
      {/* <div className="flex flex-col items-center">
        
        {!item.redd && (
          <span className="bg-red-800 rounded-full w-6 h-6 flex items-center justify-center text-white text-[12px]">
            {item.messagesCount}
          </span>
        )}
      </div> */}
    </div>
  );
};
