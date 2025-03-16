import {Navigate} from "react-router-dom";
import {useEffect , useState} from "react";
import { supabase } from "./supabase";

const ProtectedRoute=({children})=>{

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const getUser = async ()=>{
            const {data: {user}} = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);

        }
        getUser();
    },[]);

    if(loading) return <p>please wait Loading...</p>


    return(
        
        user? children : <Navigate to="/Login" />
       
    );



}

export default ProtectedRoute;

