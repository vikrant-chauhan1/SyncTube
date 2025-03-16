import {useEffect,useState  } from "react";
import { supabase } from "../supabase";

const Login =()=>{
    const [user,setUser]= useState(null);
    useEffect(()=>{
        const getUser = async()=>{
            const {data :{user}} = await supabase.auth.getUser();
            setUser(user);

        }
        getUser();
    },[]);

    const signInWithGoogle = async()=>{
        const {error} = await supabase.auth.signInWithOAuth({
            provider:"google",
        });
        if(error){
            console.error("Login failed",error);
        };
    };
    
    const signOut = async ()=>{
        await supabase.auth.signOut();
        setUser(null);
    
    }

   return(
    <div>
        {user?(
            <div>
                <p>Welcome, {user.email}</p>
                <button onClick={signOut}>Logout</button> 
            </div>
            
        ):(
        <button onClick={signInWithGoogle}>Login with google</button>
        )}
    </div>

   ); 

};

export default Login;
