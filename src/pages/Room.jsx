import { useParams } from "react-router-dom";

const Room = ()=>{
    const {roomId} = useParams(); // getting the room id from the URL

    return (
        <div >
          <h1 >Room ID: {roomId}</h1>
          <p>Share this link to invite friends!</p>
          <input 
            type="text" 
            value={window.location.href} 
            readOnly 
            
          />
        </div>
    );
    
}

export default Room;


