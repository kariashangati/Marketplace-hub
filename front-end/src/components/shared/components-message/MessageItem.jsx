export const MessageItem = ({ message }) => {
  const isMe = localStorage.getItem("id") == message.senderId;

  return (
    <p
      className={`text-white rounded-xl p-4 break-words w-min min-w-[250px] max-w-[60%] ${
        isMe ? "self-end bg-sky-500 " : "bg-gray-700"
      }`}
    >
      {message.messageContent}
    </p>
  );
};
