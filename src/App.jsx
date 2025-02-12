import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";

export default function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.status);

  
  // authService.createAccount("roshanraj@gmail.com" , "something" , "Roshan Raj");
  // authService.login("roshanraj1543@gmail.com" , "123456789")
  // authService.logout();
    

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

  return !loading ? (
    <div className="min-w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  ) : null;
}
