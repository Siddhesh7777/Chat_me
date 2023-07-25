import React, { useEffect, useState } from 'react'
import axios, { Axios } from "axios";





const Chatpage = () => {

 const fetchChats=async()=>{

    const {data}=await axios.get("/api/chats")//used {} cause to desturcture it 

 };//for getting the data from the backend to this frontend by using axios and with api endpoint 


    const [chats,setChats]=useState([]);
    setChats(data);
     
    useEffect(()=>{ 
    fetchChats()
 },[])

  return (
    <div>{
        chats.map((chat)=>(
            <div> {chat.chatName}</div>
        )

        )

    }</div>
  )
}

export default Chatpage