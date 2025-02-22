import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";

export default function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          console.log("No user found");
          dispatch(logout());
        }
      }).finally(() => setLoading(false));
  });


  // solution to make the function async

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       const userData = await authService.getCurrentUser();
  //       if (userData) {
  //         dispatch(login({ userData }));
  //       } else {
  //         console.log("No user found");
  //         dispatch(logout());
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //       dispatch(logout());
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchUser();
  // }, [dispatch]);


  return !loading ? (
    <div className="min-w-full min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}
