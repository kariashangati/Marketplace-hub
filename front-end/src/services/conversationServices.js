import axios from "axios";

export const getConversations = async (token) => {
  const response = await axios.get(
    `http://localhost:3000/api/conversations/getConversations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const postConversation = async (token, data) => {
  const response = await axios.post(
    `http://localhost:3000/api/conversations/postConversation`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
