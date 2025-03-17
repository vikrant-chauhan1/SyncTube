import { useEffect,useState } from "react";
import { supabase } from "../supabase";
import { Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";




const Home=()=>{

    const navigate = useNavigate();


    const [user,setUser]= useState(null);
    const[loading,setLoading]= useState(true);

    const createRoom= ()=>{
        const roomId =  uuidv4(); // This will generate a unique room id 
        navigate(`/room/${roomId}`); // Redirecting to the room page
    }


    useEffect(()=>{
        const getUser= async()=>{
            const {data:{user}}= await supabase.auth.getUser();
            setUser(user);
            setLoading(false)

        }
        getUser();
    },[])

    const signOut= async()=>{
        await supabase.auth.signOut();
        setUser(null);
    }

    if(loading) return <p>Please wait Loading...</p>
    return (
        <div>
            {user? 
                <div>
                    <p>Welcome to synctube {user.email} </p>
                    <button onClick={signOut}>Logout</button>
                    <h1 className="text-2xl font-bold mb-4">Create a YouTube Watch Party</h1>
                    <button 
                        onClick={createRoom} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Create Room
                    </button>
                </div>
             : 
             <Navigate to={"/login"} />}
        </div>
        
    )
    

}

export default Home;