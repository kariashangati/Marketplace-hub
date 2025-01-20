import { useEffect, useRef, useState } from "react";

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
import { getConversations } from "../../services/conversationServices";
import { getMessages, postMessage } from "../../services/messageServices";
import { MessageItem } from "../../components/shared/components-message/MessageItem";

export const MessageUser = () => {
  const [conversations, setConversations] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [chatInfo, setChatInfo] = useState({});
  const [heightChat, setHeightChat] = useState(0);
  const [heightBadyConversation, setHeightBadyConversation] = useState(0);
  const refHeader = useRef(null);
  const refFooter = useRef(null);
  const refHeadeCahts = useRef(null);
  const refSearchCahts = useRef(null);

  useEffect(() => {
    const viewConversations = async () => {
      try {
        const response = await getConversations(localStorage.getItem("token"));
        setConversations(response.data.conversations);
      } catch (error) {
        if (error.response) {
          setNotification({
            type: "error",
            message: error.response.data.message,
          });
        }
      }
    };

    viewConversations();
  }, []);

  useEffect(() => {
    const res =
      refHeader.current.clientHeight + refFooter.current.clientHeight + 6;

    const result =
      refHeadeCahts.current.clientHeight +
      refSearchCahts.current.clientHeight +
      6;

    setHeightBadyConversation(`calc(100vh - ${res}px)`);
    setHeightChat(`calc(100vh - ${result}px)`);
  }, []);

  const getMessageByConversationId = async (item) => {
    try {
      const response = await getMessages(
        localStorage.getItem("token"),
        item.conversationId
      );
      console.log(item);
      setChatInfo({
        receiverId: item.userId,
        conversationId: item.conversationId,
        username: item.username,
        profilePic: item.profilePic,
        messages: response.data,
      });
    } catch (error) {}
  };

  const handleSendMessage = async () => {
    try {
      const response = await postMessage(localStorage.getItem("token"), {
        conversationId: chatInfo.conversationId,
        receiverId: chatInfo.receiverId,
        // productId,
        messageContent,
      });

      setChatInfo((curr) => {
        const newMessages = [...curr.messages, response.data.messageCon];
        return { ...curr, messages: newMessages };
      });
      setMessageContent("");
    } catch (error) {}
  };

  return (
    <div className="flex justify-normal">
      <div>
        <UserSideBar viewIcone />
      </div>
      <div className="border-r-[20px] border-t-[5px] border-b-[10px]  border-dark grid grid-cols-4 w-screen h-screen">
        <div className="border-r  col-span-1  bg-white">
          <div
            ref={refHeadeCahts}
            className="flex justify-between items-center text-black p-9 border-b "
          >
            <h2 className="font-bold">Messages</h2>
            {/* <div className="flex justify-between items-center gap-1">
              <PencilSquareIcon width={20} height={20} />
              <EllipsisVerticalIcon width={20} height={20} />
            </div> */}
          </div>
          <div ref={refSearchCahts} className="text-black p-4 relative">
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
          <div
            className="overflow-y-scroll h-full"
            style={{ height: heightChat }}
          >
            {conversations.map((item) => (
              <MessageChats
                key={item.id}
                item={item}
                onClick={() => {
                  getMessageByConversationId(item);
                }}
              />
            ))}
          </div>
        </div>

        <div className="col-span-3 bg-white">
          <HeaderConvsertion ref={refHeader} item={chatInfo} />

          <div
            className="bg-gray-100 flex flex-col gap-5 p-6 text-black overflow-y-scroll h-full"
            style={{
              height: heightBadyConversation,
              backgroundImage: `url(${bgMessage})`,
            }}
          >
            {chatInfo.messages?.map((m) => (
              <MessageItem key={m._id} message={m} />
            ))}
            <AlwaysScrollToBottom />
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
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="border outline-none w-[90%] p-1 rounded-xl pl-[27px] z-30 bg-slate-300 "
                placeholder="Type a message"
              />
            </div>
            <div>
              <PlayIcon
                color="blue"
                width={20}
                height={20}
                onClick={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
  return <div ref={elementRef} />;
};
