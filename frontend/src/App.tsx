// App.tsx
import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch,  } from "react-redux";
import { login, logout } from "@/store/authSlice";
import toast from "react-hot-toast";
import { BASE_URL } from "@/constant";
import { LoaderPinwheel } from "lucide-react";

function App(): React.ReactNode {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    let cancelled = false;

    const fetchCurrentUser = async (token?: string | null) => {
      setLoading(true);

      if (!token) {
        dispatch(logout());
        setLoading(false);
        return;
      }

      try {

        const url = `${BASE_URL}/api/auth/getuser?userToken=${encodeURIComponent(token)}`;

        const res = await axios.get(url);
        const data = res.data;

        if (!cancelled) {
          dispatch(
            login({
              userData: {
                email: data.email,
                userId: data.userId,
                userToken: token,

              },
            })
          );
        }
      } catch (err) {

        dispatch(logout());
        const message = err?.response?.data?.message ?? err?.message ?? "Failed to fetch current user";
        toast.error(message);

      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCurrentUser(userToken);

    return () => {
      cancelled = true;
    };
  }, [userToken, dispatch]);


  return (
    <>
      <div>
        <Toaster />
        {/* Optional: show a simple full-screen loader while loading */}
        {loading ? (
          <div className="w-full h-screen items-center justify-center bg-gray-200">
            <LoaderPinwheel className="w-10 h-10 animate-spin" />
          </div>
        ) : (
          <HomePage />
        )}
      </div>
    </>
  );
}

export default App;
