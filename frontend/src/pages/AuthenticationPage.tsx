import SignIn from '@/components/SignIn';
import SignUp from '@/components/SignUp';
import React from 'react'
import { useLocation } from 'react-router';


function AuthenticationPage() : React.ReactNode {

    const location = useLocation(); 

    
    return (
        <div className='min-h-screen bg-linear-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12'>
            {
            (location.pathname === '/auth/sign-in') ? (<SignIn />)  : (<SignUp/>)     
            }
        </div>
    )
}

export default AuthenticationPage