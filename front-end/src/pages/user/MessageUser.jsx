import React, { useEffect, useRef, useState } from "react";

import { UserSideBar } from "../../layouts/UserSideBar";
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { MessageChats } from "../../components/shared/components-message/MessageChats";
import { HeaderConvsertion } from "../../components/shared/components-message/HeaderConvsertion";
import bgMessage from "../../../public/assets/bgMessage.png";

const messages = [
  {
    id: 1,
    userName: "said kachoud",
    imageUrl: "/assets/userDefaultImage.jpg",
    timeAgo: "4min",
    messagesCount: 20,
    enLinge: true,
    redd: false,
  },
  {
    id: 2,
    userName: "ayoub mhainid",
    imageUrl: "/assets/userDefaultImage.jpg",
    timeAgo: "1h",
    messagesCount: 17,
    enLinge: false,
    redd: true,
  },
  {
    id: 3,
    userName: "soufiane bouir",
    imageUrl: "/assets/userDefaultImage.jpg",
    timeAgo: "10min",
    messagesCount: 1,
    enLinge: true,
    redd: false,
  },
  {
    id: 4,
    userName: "said kachoud",
    imageUrl: "/assets/userDefaultImage.jpg",
    timeAgo: "4min",
    messagesCount: 5,
    enLinge: true,
    redd: true,
  },
];

const chats = [
  {
    id: 1,
    userName: " qdhkqdikachoud",
  },
];

export const MessageUser = () => {
  const [height, setHeight] = useState(0);
  const refHeader = useRef(null);
  const refFooter = useRef(null);

  useEffect(() => {
    const res =
      refHeader.current.clientHeight + refFooter.current.clientHeight + 6;

    setHeight(`calc(100vh - ${res}px)`);
  }, []);

  return (
    <div className="flex justify-normal">
      <div>
        <UserSideBar viewIcone />
      </div>
      <div className="border-r-[20px] border-t-[5px] border-b-[10px]  border-dark grid grid-cols-4 w-screen h-screen">
        <div className="border-r  col-span-1  bg-white">
          <div className="flex justify-between items-center text-black p-9 border-b ">
            <h2 className="font-bold">Messages</h2>
            <div className="flex justify-between items-center gap-1">
              <PencilSquareIcon width={20} height={20} />
              <EllipsisVerticalIcon width={20} height={20} />
            </div>
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
            <MessageChats key={item.id} item={item} />
          ))}
        </div>

        <div className="col-span-3 bg-white">
          {chats.map((itemConversation) => (
            <HeaderConvsertion
              ref={refHeader}
              key={itemConversation.id}
              item={itemConversation}
            />
          ))}
          <div
            className="bg-gray-100 flex-1) text-black overflow-y-scroll h-full"
            style={{ height, backgroundImage: `url(${bgMessage})` }}
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ducimus dolorem quisquam fugiat voluptates. Omnis, sed corporis
              itaque adipisci eius quo veritatis impedit voluptatibus iste
              explicabo odio ullam perferendis cumque?
            </p>
          </div>

          <div
            ref={refFooter}
            className="text-black flex items-center p-2 border-t "
          >
            <div className="w-full">
              {/* <textarea
                className="border outline-none w-full p-1 rounded-xl pl-[27px] z-30 bg-slate-300 "
                placeholder="Type a message"
                style={{
                  resize: "none",
                }}
              /> */}
              <input
                type="text"
                className="border outline-none w-[90%] p-1 rounded-xl pl-[27px] z-30 bg-slate-300 "
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

/*const Conversation = ({ itemConversation }) => {
  return (
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
            {itemConversation.userName}
          </p>
          <p className="text-green-500 text-[13px] italic">{`${itemConversation.userName} is typing...`}</p>
        </div>
      </div>
      <div className="text-black flex items-center gap-6">
        <VideoCameraIcon width={20} height={20} />
        <PhoneIcon width={20} height={20} />
        <EllipsisHorizontalIcon width={20} height={20} />
      </div>
    </div>
  );
};*/
