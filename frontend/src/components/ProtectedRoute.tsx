import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {  LoaderPinwheel } from "lucide-react";

export default function AuthChecker({children, authentication}){

    //  @ts-expect-error
    const authStatus = useSelector((state)=> state.auth?.status as boolean)//false
    const [loader,setLoader] = useState(true)

    const navigate =  useNavigate();

    useEffect(()=>{
        // console.log("Auth Stutus: ",authStatus);
        
        if (authentication && authStatus !== authentication) {
            navigate("/auth/sign-in")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)

    },[authStatus,navigate,authentication])

    return(
        loader? <div className="w-full h-screen items-center justify-center bg-gray-200"> 
            <LoaderPinwheel className="w-10 h-10 animate-spin"/>
        </div> : <> {children} </> 
    )
} 

