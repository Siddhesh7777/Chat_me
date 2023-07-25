const express = require("express");
// const {
//   accessChat,
//   fetchChats,
//   createGroupChat,
//   removeFromGroup,
//   addToGroup,
//   renameGroup,
// } = require("../controllers/chatControllers");
const {accessChat,fetchChats}=require("../controllers/chatController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
//making the chats
router.route("/").post(protect, accessChat);
//accesing the chats 
router.route("/").get(protect, fetchChats);
// //making the gorup
// router.route("/group").post(protect, createGroupChat);
// //rename the gorup
// router.route("/rename").put(protect, renameGroup);
// //remove form the group
// router.route("/groupremove").put(protect, removeFromGroup);
// //add to the group
// router.route("/groupadd").put(protect, addToGroup);
//all are  are protected by the protect middleware to it so only logged in user can generate it the things 
module.exports = router;