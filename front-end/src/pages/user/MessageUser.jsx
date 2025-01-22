import { useEffect, useRef, useState } from "react";

import { UserSideBar } from "../../layouts/UserSideBar";
import { MagnifyingGlassIcon, PlayIcon } from "@heroicons/react/24/outline";
import { MessageChats } from "../../components/shared/components-message/MessageChats";
import { HeaderConvsertion } from "../../components/shared/components-message/HeaderConvsertion";
import bgMessage from "../../../public/assets/bgMessage.png";
import {
  getConversations,
  searchConversation,
} from "../../services/conversationServices";
import {
  deleteMessage,
  getMessages,
  postMessage,
} from "../../services/messageServices";
import { MessageItem } from "../../components/shared/components-message/MessageItem";
import { Notification } from "../../components/ui/Notification";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export const MessageUser = () => {
  const [conversations, setConversations] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [search, setSearch] = useState("");
  const [chatInfo, setChatInfo] = useState({});
  const [heightChat, setHeightChat] = useState(0);
  const [heightBadyConversation, setHeightBadyConversation] = useState(0);
  const [notification, setNotification] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedConversation,setSelectedConversation] = useState(null);
  const [messages,setMessages] = useState([]);
  const [isUserOnline,setIsUserOnline] = useState(false);

  const refHeader = useRef(null);
  const refFooter = useRef(null);
  const refHeadeCahts = useRef(null);
  const refSearchCahts = useRef(null);


  console.log(messages);
  
  useEffect(() => {
    if(selectedConversation !== null){
      socket.emit("joinConversation", selectedConversation);

      socket.on('userJoined', (data) => {
        console.log(data);
      })
      socket.on("newMessage", (data) => {
        console.log(data);
        
        if (data !== null) {
          setMessages((curr) => {
            const newMessages = [...curr, data];
            return newMessages;
          })
          console.log(messages);
          
        }
      });
    }

    return () => {
      socket.off("newMessage");
    };
  }, [selectedConversation]);

  const viewConversations = async () => {
    try {
      const response = await getConversations(localStorage.getItem("token"));
      setConversations(response.data.conversations);
      console.log(response);
      
    } catch (error) {
      if (error.response) {
        setNotification({
          type: "error",
          message: error.response.data.message,
        });
      }
    }
  };

  if (search != "") {
    searchItemConversation();
  }

  const searchItemConversation = async () => {
    setNotification(null);
    try {
      const response = await searchConversation(
        localStorage.getItem("token"),
        search
      );
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


  useEffect(() => {
    searchItemConversation()
    viewConversations()
  }, [search]);

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
      setChatInfo({
        receiverId: item.userId,
        conversationId: item.conversationId,
        username: item.username,
        profilePic: item.profilePic,
        messages: response.data,
        productId: item.productId,
      });
      setMessages(response.data)
    } catch (error) {
      if (error.response) {
        setNotification({
          type: "error",
          message: error.response.data.message,
        });
      }
    }
  };

  const handleSendMessage = async () => {
    try {
      setNotification(null)
      if(messageContent !== ''){
        const response = await postMessage(localStorage.getItem("token"), {
          conversationId: chatInfo.conversationId,
          receiverId: chatInfo.receiverId,
          messageContent,
        });
  
        // setChatInfo((curr) => {
        //   const newMessages = [...curr.messages, response.data.messageCon];
        //   return { ...curr, messages: newMessages };
        // });

        // setMessages((curr) => {
        //   const newMessages = [...curr, response.data.messageCon];
        //   return newMessages;
        // })

        setMessageContent("");
        await viewConversations()
      }
      
    } catch (error) {
      if (error.response) {
        setNotification({
          type: "error",
          message: error.response.data.message,
        });
      }
    }
  };

  const deleteItemMeassage = async (m) => {
    setLoading(false);
    setNotification(null);
    try {
      const messageId = m._id;
      const response = await deleteMessage(
        localStorage.getItem("token"),
        messageId
      );
      setLoading(false);
      setNotification({
        type: "success",
        message: response.data.message,
      });

      setChatInfo((curr) => {
        const newMessages = curr.messages.filter(
          (_message) => _message._id !== messageId
        );

        return { ...curr, messages: newMessages };
      });
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log(error.response);
        setNotification({
          type: "error",
          message: error.response.data.message,
        });
      } else {
        setNotification({
          type: "error",
          message: "try later again",
        });
      }
    }
  };

  return (
    <div className="flex justify-normal">
      <div>
        <UserSideBar viewIcone />
      </div>
      <div className="border-r-[20px] border-t-[5px] border-b-[10px]  border-gray-200 grid grid-cols-4 w-[100%] h-screen">
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
              value={search}
              className="border-2 px-2 py-1 outline-none w-full p-1 rounded-md pl-[27px]"
              placeholder="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <MagnifyingGlassIcon
              width={20}
              height={20}
              className="absolute top-6 left-5 text-gray-400"
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
                  getMessageByConversationId(item),
                  setSelectedConversation(item.conversationId);
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
            {messages?.map((m) => (
              <MessageItem
                key={m._id}
                message={m}
                deleteItemMeassage={() => deleteItemMeassage(m)}
              />
            ))}
            <AlwaysScrollToBottom />
          </div>

          <div
            ref={refFooter}
            className="text-black flex items-center px-10 py-3 border-t justify-between"
          >
            <div className="w-[95%]   ">
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="border outline-none w-full p-1 rounded-xl pl-[27px] z-30 bg-slate-100 overflow-hidden"
                placeholder="Type a message"
                style={{
                  resize: "none",
                }}
              />
             
            </div>
            <div className="">
              <PlayIcon
                className="w-[30px] h-[30px] text-blue-500 cursor-pointer hover:text-sky-300"
                onClick={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </div>
  );
};

const AlwaysScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
  return <div ref={elementRef} />;
};
