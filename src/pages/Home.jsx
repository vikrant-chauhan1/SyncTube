import { useEffect,useState } from "react";
import { supabase } from "../supabase";
import { Navigate } from "react-router-dom";




const Home=()=>{
    const [user,setUser]= useState(null);
    const[loading,setLoading]= useState(true);
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
                    <p>Welcome to synctube {user.email} darling</p>
                    <button onClick={signOut}>Logout</button>
                </div>
             : 
             <Navigate to={"/login"} />}
        </div>
        
    )
    

}

export default Home;