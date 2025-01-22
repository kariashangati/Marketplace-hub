import { UserSideBar } from "../../layouts/UserSideBar";
import {
  ChevronDoubleDownIcon,
  MagnifyingGlassIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";


const itemMessage = messages.filter((item) => {
  return item.id === 2;
});

export const Message = () => {
  return (
    <div className="flex justify-normal">
      <div>
        <UserSideBar viewIcone />
      </div>
      <div className="border-r-[20px] border-t-[5px] border-b-[10px]  border-dark grid grid-cols-4 w-screen h-screen">
        <div className="border-r  col-span-1  bg-white">
          <div className="flex justify-between items-center text-black p-8 border-b ">
            <h2 className="font-bold">Messages</h2>
          </div>
          <div className="text-black p-4 relative">
            <input
              className="border outline-none w-full p-1 rounded-xl pl-[27px]"
              placeholder="search"
            />
            <MagnifyingGlassIcon
              width={20}
              height={20}
              className="absolute top-6 left-5"
            />
          </div>
          {messages.map((item) => (
            <MessageItem key={item.id} item={item} />
          ))}
        </div>

        <div className="col-span-3  bg-white flex flex-col justify-between">
          {/* {itemMessage.map((_item) => {
            <Conversation key={_item.id} item={_item} />;
          })} */}
          <div className="p-5 border-b flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div>
                <img
                  className="rounded-full w-14 h-14"
                  src="/assets/userDefaultImage.jpg"
                  alt=""
                />
              </div>
              <div>
                <p className="font-semibold text-black text-[20px]">
                  said kachoud
                </p>
                <p className="text-green-500 text-[13px] italic">
                  said is typing
                </p>
              </div>
            </div>
          </div>
          <div className="text-black flex items-center p-4 border-t ">
            <div className=" p-4 flex items-center flex-1">
              <input
                type="text"
                className="border outline-none w-full p-1 rounded-xl pl-[27px] z-30 bg-slate-300"
                placeholder="Type a message"
              />
            </div>
            <div>
              <PlayIcon color="blue" width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageItem = ({ item }) => {
  return (
    <div className="border-b p-4 text-black flex items-center justify-between">
      <div className="flex items-center gap-2 relative">
        <div>
          <img
            className="rounded-full w-8 h-8"
            src="/assets/userDefaultImage.jpg"
            alt=""
          />
          {item.enLinge && (
            <div className="bg-green-500 w-2 h-2 rounded-full absolute left-5 top-8"></div>
          )}
        </div>
        <div>
          <p className="font-semibold ">{item.userName}</p>
          <p className="text-green-500 text-[13px] italic">{`${item.userName} is typing...`}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p>{item.timeAgo}</p>
        {item.redd ? (
          <span className="text-sky-500">
            <ChevronDoubleDownIcon width={20} height={20} />
          </span>
        ) : (
          <span className="bg-red-800 rounded-full w-6 h-6 flex items-center justify-center text-white text-[12px]">
            {item.messagesCount}
          </span>
        )}
      </div>
    </div>
  );
};

// const Conversation = ({ item }) => {
//   return (
//     <div className="p-5 border-b flex justify-between items-center">
//       <div className="flex items-center gap-4">
//         <div>
//           <img
//             className="rounded-full w-14 h-14"
//             src="/assets/userDefaultImage.jpg"
//             alt=""
//           />
//         </div>
//         <div>
//           <p className="font-semibold text-black text-[20px]">
//             {item.userName}
//           </p>
//           <p className="text-green-500 text-[13px] italic">{`${item.userName} is typing...`}</p>
//         </div>
//       </div>
//       <div className="text-black flex items-center gap-6">
//         <VideoCameraIcon width={20} height={20} />
//         <PhoneIcon width={20} height={20} />
//         <EllipsisHorizontalIcon width={20} height={20} />
//       </div>
//     </div>
//   );
// };
