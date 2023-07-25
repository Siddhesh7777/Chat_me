const express = require('express');
const {chats} = require('./data');
const dotenv=require("dotenv");
const userRoutes=require('./routes/userRoutes')
const chatRoutes=require('./routes/chatRoutes')
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app=express();
dotenv.config();
connectDB();

app.use(express.json());//to accept json data

app.use("/api/user", userRoutes);
app.use("/api/chat",chatRoutes);
app.use(errorHandler);
app.use(notFound);

const PORT=process.env.PORT|| 4444;
app.listen(4444,console.log("hey hi there i am just chillin what are you doing ",PORT));

app.get("/api/chats",(req,res)=>{
    res.send(chats);
})



