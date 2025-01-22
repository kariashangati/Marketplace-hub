const Conversation = require("../models/Conversation");

const getConversations = async (request, response) => {
  try {
    const conversations = await Conversation.find({
      $or: [{ user1Id: request.userId }, { user2Id: request.userId }],
    }).sort({updatedAt:-1});

    if (conversations.length > 0) {
      const otherUsers = conversations.map((conversation) => {
        if (conversation.user1Id === parseInt(request.userId)) {
          return {
            userId: conversation.user2Id,
            profilePic: conversation.user2ProfilePic,
            username: conversation.user2Username,
            conversationId: conversation._id,
            productId: conversation.productId,
            lastMessage: conversation.lastMessage,
            updatedAt: conversation.updatedAt,
          };
        } else {
          return {
            userId: conversation.user1Id,
            profilePic: conversation.user1ProfilePic,
            username: conversation.user1Username,
            conversationId: conversation._id,
            productId: conversation.productId,
            lastMessage: conversation.lastMessage,
            updatedAt: conversation.updatedAt,
          };
        }
      });

      return response.json({
        conversations: otherUsers,
      });
    } else {
      return response.status(404).json({
        message: "No conversations founded",
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Try again later",
    });
  }
};


const searchConversations = async (request,response) =>{
  try{
    const {username} = request.query;
    const conversations = await Conversation.find({
      $and:[
        {
          $or:[{user1Username:request.username},{user2Username:request.username}] 
        },
        {$or:[
          {$and:[{user1Username:{$regex:username}},{user1Username:{$ne:username}}]},
          {$and:[{user2Username:{$regex:username}},{user2Username:{$ne:username}}]},
        ]}] 
    }).sort({updatedAt:-1});

    if (conversations.length > 0) {
      const otherUsers = conversations.map((conversation) => {
        if (conversation.user1Id === parseInt(request.userId)) {
          return {
            userId: conversation.user2Id,
            profilePic: conversation.user2ProfilePic,
            username: conversation.user2Username,
            conversationId: conversation._id,
            productId: conversation.productId,
            lastMessage: conversation.lastMessage,
            updatedAt: conversation.updatedAt,
          };
        } else {
          return {
            userId: conversation.user1Id,
            profilePic: conversation.user1ProfilePic,
            username: conversation.user1Username,
            conversationId: conversation._id,
            productId: conversation.productId,
            lastMessage: conversation.lastMessage,
            updatedAt: conversation.updatedAt,
          };
        }
      });

      return response.json({
        conversations: otherUsers,
      });
    } else {
      return response.status(404).json({
        message: "No conversations founded",
      });
    }
    
  }catch(error){
    return response.status(500).json({
      'message' : error.message || "Try again later"
    })
  }
}
const postConversation = async (request, response) => {
  try {
    const { user2Id, user2ProfilePic, productId, user2Username } = request.body;

    const conversationExists = await Conversation.findOne({
      $or: [
        { $and: [{ user1Id: request.userId }, { user2Id: user2Id }, {productId: productId}] },
        { $and: [{ user1Id: user2Id }, { user2Id: request.userId }, {productId: productId}] },
      ],
    });

    if(request.role === 'admin' || request.role === 'super admin'){
      return response.status(401).json({
        'message' : "Admins can't text users"
      })
    }

    if (conversationExists) {
      return response.status(401).json({
        message: "Already you contact this user!",
      });
    }

    if (request.userId === user2Id) {
      return response.status(401).json({
        message: "You can't text yourself",
      });
    }

    const newConversation = new Conversation({
      user1Id: parseInt(request.userId),
      user1ProfilePic: request.profile_picture,
      user1Username: request.username,
      user2Id: parseInt(user2Id),
      user2ProfilePic,
      user2Username,
      productId,
    });

    await newConversation.save();
    return response.json({
      message: "New conversation saved",
      conversation: newConversation,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Try again later",
    });
  }
};

module.exports = { getConversations, postConversation, searchConversations };
