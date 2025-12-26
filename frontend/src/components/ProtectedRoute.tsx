import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Loading from "./Loading";
import { useAppSelector } from "@/store/hooks";

export default function AuthChecker({ children, authentication }) {


    const authStatus = useAppSelector((state) => state.auth?.status)

    const navigate = useNavigate();

    useEffect(() => {

        if (authStatus == null) return;

        if (authentication && authStatus !== true) {
            navigate("/auth/sign-in", { replace: true }) 
            return;  
        } else if (!authentication && authStatus !== true) {
            navigate("/", { replace: true })
            return; 
        }

    }, [authStatus, navigate, authentication])

    if (authStatus == null) {
        return <Loading />;
    }

    return (
        <> {children} </>
    )
}

