import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { login, logout } from "@/store/authSlice";
import toast from "react-hot-toast";
import { LoaderPinwheel } from "lucide-react";
import { simpleAxios } from "./lib/axiosConfig";
import { useAppDispatch } from "./store/hooks";
import Layout from "./Layout";


function App(): React.ReactNode {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  // Persistence LOgic 
  useEffect(() => {
    let cancelled = false;

    const fetchCurrentUser = async () => {
      setLoading(true);

      try {

        const res = await simpleAxios.get("/api/auth/refresh");
        const data = res.data;

        if (!cancelled) {
          dispatch(
            login({

              email: data.email,
              userId: data.userId,
              userToken: data.userToken,


            })
          );
        }
      } catch (err) {

        dispatch(logout());
        const message = (err?.response?.data?.message) ?? err?.message ?? "Failed to fetch current user";
        toast.error(message);

      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCurrentUser();

    return () => {
      cancelled = true;
    };
    
  }, [dispatch]);


  return (
    <>
      <div>
        <Toaster />
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center bg-gray-200">
            <LoaderPinwheel className="w-10 h-10 animate-spin" />
          </div>
        ) : (
          <Layout/>
        )}
      </div>
    </>
  );
}

export default App;
