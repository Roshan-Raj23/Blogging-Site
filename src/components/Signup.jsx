import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link ,useNavigate } from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

export default function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const [error, setError] = useState("")

    const passwordCheck = (value) => {

        if (value.length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        }
        if (!/[a-z]/.test(value)) {
            setError("Password must contain at least one lowercase letter");
            return false;
        }
        if (!/[A-Z]/.test(value)) {
            setError("Password must contain at least one uppercase letter");
            return false
        }
        if (!/[0-9]/.test(value)) {
            setError("Password must contain at least one number");
            return false;
        }

        return true;
    }

    const create = async(data) => {
        setError("")
        try {
            // Verify if the email format is valid or not
            const email_verify = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)

            if (!email_verify){
                setError("Email address must be a valid email address");
                throw new Error("");
            }

            const password_verify = passwordCheck(data.password)
            if (!password_verify)
                throw new Error("");

            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            } else 
                setError("Email already exists")
        } catch {
            // intentionally left empty
        }
    }

    return (
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-600">
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        required={true}
                        {...register("name", {required: true})}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        required={true}
                        {...register("email", {
                            required: true,
                            
                            // Validated this thing in the login function
                            // validate: {
                            //     matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            //     "Email address must be a valid address",
                            // }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        required={true}
                        {...register("password", {required: true,})}
                        />
                        <Button type="submit" className="w-full" text="Create Account" />
                    </div>
                </form>
            </div>
        </div>
    )
}