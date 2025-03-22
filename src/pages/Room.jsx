import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { useState } from "react";

const Room = ()=>{
  const {roomId} = useParams(); // getting the room id from the URL
  const [videoId,setVideoId]= useState("") // will use this to store the video ID
  const [videoUrl,setVideoUrl] = useState("");// storing the video url

  const extractVideoId = (url)=>{
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  }

  // handling the form submittion 
  const handleSubmit = (e)=>{
    e.preventDefault();
    const id= extractVideoId(videoUrl)
    setVideoId(id);
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

        {videoId && <YouTube videoId={videoId} opts={opts} />}
      </div>
    );
    
}

export default Room;


