import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Button , Input , Logo} from "./index"
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

export default function Login() {

    const { register , handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error , setError] = useState();
    
    const login = async (data) => {
        setError("");
        try {
            
            const session = await authService.login(data.email , data.password);

            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) 
                    dispatch(authLogin(userData));
                window.location.reload();
                navigate("/");
            } else 
                setError("Invalid Email or Password");
        } catch {
            // intentionally left empty
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-600">
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        required={true}
                        {...register("email", {required: true,})}
                        />

                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        required={true}
                        {...register("password", {required: true})}
                        />

                        <Button
                        type="submit"
                        className="w-full"
                        text="Sign in"/>
                    </div>
                </form>
            </div>
        </div>
    )

}
