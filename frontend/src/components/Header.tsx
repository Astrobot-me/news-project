import { Newspaper } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

function Header(): React.ReactNode {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const userData = useSelector((state: any) => state.auth?.userData);
  const isLoggedIn = Boolean(userData?.email);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userToken")
    navigate("/auth/login");
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
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
           
            <div className="flex items-center gap-4">
              <Link
                to="/auth/login"
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
