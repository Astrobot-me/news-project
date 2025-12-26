import { LoaderIcon, Newspaper } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { logout } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { simpleAxios } from "@/lib/axiosConfig";

function Header(): React.ReactNode {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const userData = useAppSelector((state) => state.auth?.userData);
    const isLoggedIn = Boolean(userData?.email);
    const [loading , setLoading] = useState<boolean>(false); 
    

    const handleLogout = async () => {
      

      try {
        setLoading(true)
        const res = await simpleAxios.post("/api/auth/logout");
      } catch (error) {
        console.log(error)
      }
      finally{ 
        dispatch(logout());
        navigate("/auth/sign-in");
        setLoading(false)
      }


    };

    return (
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          
          
          <Link to="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
            <Newspaper className="w-6 h-6 text-primary" />
            <span>News Project</span>
          </Link>

        
          <nav className="hidden md:flex gap-8 items-center shrink-0">

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, <span className="font-medium text-foreground">{userData.email}</span>
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { 
                    handleLogout(); 
                  }}
                  disabled={loading}
                  className="px-4"
                >
                  {
                    loading ? (
                      <div className="flex items-center justify-center">
                        <LoaderIcon className="animate-spin" size={2}/>
                      </div>
                    ) : (
                      <span> Logout </span>
                    )
                  }

                </Button>
              </div>
            ) : (
            
              <div className="flex items-center gap-4">
                <Link
                  to="/auth/sign-in"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>

                <Link to="/auth/sign-up">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

          </nav>
        </div>
      </header>
    );
}

export default Header;
