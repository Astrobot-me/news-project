import { useLayoutEffect } from "react"
import modifiedAxios, { simpleAxios } from "@/lib/axiosConfig";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/authSlice";


function useAxiosMod() {

    const { userData } = useAppSelector( (state) => state.auth)
    const dispatch = useAppDispatch(); 
    
    useLayoutEffect(() => {
        
        const requestIntercept = modifiedAxios.interceptors.request.use( 
            config => {
                if(!config.headers['Authorization'] ) { 
                    config.headers['Authorization'] = `Bearer ${userData?.userToken}`
                }

                return config; 
            }, error => Promise.reject(error) 
        )

        const responceIntercept = modifiedAxios.interceptors.response.use( 

            responce => responce , 
            async (error) => { 
                const prevRequest = error?.config; 

                if(error?.responce?.status === 401 && !prevRequest?.sent) { 
                    prevRequest.sent = true; 

                    const res = await simpleAxios.get("/api/auth/refresh");
                    const data = res.data;
                    const newAccessToken =  data.userToken;  

                    const state = { 
                        email: data.email,
                        userId: data.userId,
                        userToken: data.userToken,
                    }

                    dispatch(login(state))

                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}` 

                    return modifiedAxios(prevRequest) 
                }
                
                return Promise.reject(error) 
            } , 
        )
    
        return () => {
            modifiedAxios.interceptors.request.eject(requestIntercept)
            modifiedAxios.interceptors.request.eject(responceIntercept)
        };

    }, [userData, dispatch])


    return modifiedAxios; 
}


export default useAxiosMod