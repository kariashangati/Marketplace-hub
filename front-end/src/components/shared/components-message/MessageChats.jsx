import moment from "moment";

export const MessageChats = ({ item, onClick }) => {
  return (
    <div
      className="border-b p-4 text-black flex items-center justify-between cursor-pointer hover:bg-gray-200 duration-200"
      onClick={onClick}
    >
      <div className="flex w-[100%] justify-between items-center">
        <div className="flex items-center gap-2 relative">
          <div>
            <img className="rounded-full w-8 h-8" src={item.profilePic} alt="" />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-sm">{item.username}</p>
            <span className="text-[12px] text-gray-500">{item.lastMessage.substr(0,25)}...</span>
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-500 font-semibold text-[10px]">{moment(item.updatedAt).calendar()}</span>
        </div>
      </div>
    </div>
  );
};
