import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { useState,useEffect,useRef } from "react";
import { io } from "socket.io-client";

const socket= io("http://localhost:4000"); //connect to backend

const Room = ()=>{
  const {roomId} = useParams(); // getting the room id from the URL
  const [videoId,setVideoId]= useState("") // will use this to store the video ID
  const [videoUrl,setVideoUrl] = useState("");// storing the video url
  const playerRef= useRef(null);

  useEffect(()=>{
    socket.emit("join_room",roomId);

    socket.on("load_video", (videoId) => {
      console.log("Received new video id : ",videoId)
      setVideoId(videoId); // When a new user joins, load the video
    });
    socket.on("sync_video",({action,time})=>{
      const player = playerRef.current;
      if(!player) return

      if(action === "play") player.playVideo();
      if(action === "pause") player.pauseVideo();
      if(action === "seek") player.seekTo(time,true);
    });

    return()=>{
      socket.off("sync_video"); // i guess here we are turning off the sync video connection with the server
    }
  },[roomId])
  const extractVideoId = (url)=>{
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  }

  // handling the form submittion 
  const handleSubmit = (e)=>{
    e.preventDefault();
    const id= extractVideoId(videoUrl)
    if (id) {
      console.log("submitting the video id ")
      setVideoId(id); // Schedule state update
      socket.emit("set_video", { roomId, videoId: id }); // Emit latest video immediately
    }
  }

  const handleStateChange = (event)=>{
    const player = playerRef.current;
    const time = player.getCurrentTime();

    if(event.data === 1) socket.emit("video_control",{roomId,action:"play",time});
    if(event.data === 2) socket.emit("video_control",{roomId,action:"pause",time});

  }

 

  const opts = {
    height:"399",
    width:"640",
    playerVars:{
      autoplay:1,
    },
  };
    return (
      <div >
        <h1 >Room ID: {roomId}</h1>
        <p>Share this link to invite friends!</p>
        <input 
          type="text" 
          value={window.location.href} 
          readOnly 
            
        />

        <form action="submit" onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder="Enter youTube link "
            value={videoUrl}
            onChange={(e)=>setVideoUrl(e.target.value)}
        
          />
          <button type="submit">
            Play Video

          </button>
          
        </form>

        {videoId ? (
          <YouTube 
            videoId={videoId} 
            opts={opts} 
            onStateChange={handleStateChange} 
            onReady={(event) => (playerRef.current = event.target)} 
          />
          ) : (
          <p>Waiting for video...</p>
        )}
      </div>
    );
    
}

export default Room;


