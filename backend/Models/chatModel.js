//chatname
//isgrpchat
//users
//latestmessages
//groupadmin this are the fields inside it
const mongoose = require('mongoose');

const chatModel=mongoose.Schema(
{
    chatname:{type:String,trim:true},
    isGroupChat:{type:Boolean,default:false},
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"//this is the reference to the user model which we are gonna use there for he above type
    }],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{
timestamps:true,
}
);

const Chat=mongoose.model("Chat",chatModel); //here we are giving the name Chat and providing the object chatModel 
module.exports=Chat;