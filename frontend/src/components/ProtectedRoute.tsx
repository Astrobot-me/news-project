import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import type { RootState } from "../store";

export default function AuthChecker({ children, authentication }) {


    const authStatus = useSelector((state: RootState) => state.auth?.status)

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

