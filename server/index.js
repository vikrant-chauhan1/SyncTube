import express from "express";

import { io } from "socket.io";


const app = express();
const socket = io("http://localhost:4000", { transports: ["websocket"] });

socket.on("connection",(socket)=>{
    console.log(`User connected : ${socket.id}`);

    socket.on("set_video", ({ roomId, videoId }) => {
        console.log(`received video id ${videoId} and room id ${roomId}`)
        socket.to(roomId).emit("load_video", videoId); // Broadcast video to everyone
    });

    socket.on("join_room",(roomId)=>{
       socket.join(roomId);
       console.log(`User joined the room ${roomId}`) 
    });

    socket.on("video_control",({roomId,action,time})=>{
        socket.to(roomId).emit("sync_video",{action,time});
    });

    socket.on("disconnect",()=>{
        console.log(`User disconnected ${socket.id}`)
    });
});





