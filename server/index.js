import express from "express";
import http from "http";
import {Server} from "socket.io";



const app = express();
const server = http.createServer(app); // attach express to HTTP server 

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000", //allowing the frontend
        methods:["GET","POST"] 
    }
});

// Handling websocket connection

io.on("connection",(socket)=>{
    console.log("User connected");

    // when user joins a room

    socket.on("join_room",(roomId)=>{
        socket.join(roomId);
        console.log(`User joined the room : ${roomId}`)
    });

    // when a new vidoe is set

    socket.on("set_video",({roomId,videoId})=>{
        console.log(`received video id : ${videoId} for room : ${roomId}`)
        io.to(roomId).emit("load_video",videoId) // broadcast video to everyone in the room
        
    });

    //syncing video controls (play ,pause ,seek)

    socket.on("video_control",({roomId,action,time})=>{
        console.log(`✅ Backend Received - Room: ${roomId}, Action: ${action}, Time: ${time}`);
        console.log(`Broadcasting "sync_video" to room: ${roomId}`);
        io.to(roomId).emit("sync_video",{action,time});
    });

    //when user disconnects 

    socket.on("disconnect",()=>{
        console.log(`User disconnected: ${socket.id}`)
    })
});

// start the server 

server.listen(4000,()=>{
    console.log("server runnig on port 4000");
})




