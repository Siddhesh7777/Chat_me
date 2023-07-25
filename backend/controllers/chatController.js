
const asyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel");
const User=require("../Models/userModel")


//acess  chat is for creating and fetching the one on one chat 
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;//taking the userid of where with we have chat or to create 

  if (!userId) {//if not userId found then
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({ //findind the chat with it
    isGroupChat: false,//it have to be cause it is one on one chat 
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },//both this conditions have to be mathced so 
      { users: { $elemMatch: { $eq: userId } } },//one is of userId and one is of the user itself who is logged in
    ],
  })
    .populate("users", "-password")//to populate the users array form the user model without password
    .populate("latestMessage");//populate the latest mesaage from the message

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {//it there is chat with the user send the 
    res.send(isChat[0]);//first message
  } else {
    var chatData = {//else create it 
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],//this is similar to the model of chatModel the all in this 
    };

    try {
      const createdChat = await Chat.create(chatData);//creating this in database
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(//
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});
const fetchChats = asyncHandler(async (req, res) => {
  try {//check which user is logged in and query for that user all the chats
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })//sorting it from new to old by updatedAt
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  accessChat,fetchChats};