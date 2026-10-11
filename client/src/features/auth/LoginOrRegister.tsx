import { authClient } from "../../utils/auth"
import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react";

export default function LoginOrRegister({ isLogin }: { isLogin: boolean }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [passwordVisible, setPasswordVisible] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");
        setErrorMessage("");

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Invalid email address");
        }

        if (!password) {
            setPasswordError("Password is required");
        }

        if (
            (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ||
            !password
        ) {
            return;
        }

        if (isLogin) {
            await authClient.signIn.email(
                { email, password },
                {
                    onError: (c) => {
                        setErrorMessage(c.error.message);
                    },
                    onSuccess: () => {
                        setTimeout(() => {
                            window.location.href = "/"
                        }, 1000);
                    }
                }
            )
        } else {
            await authClient.signUp.email(
                { email, password, name: email },
                {
                    onError: (c) => {
                        setErrorMessage(c.error.message)
                    },
                    onSuccess: () => {
                        setTimeout(() => {
                            window.location.href = "/"
                        }, 1000);
                    }
                }
            )
        }
    }

    return (
        <form onSubmit={handleForm} className="flex flex-col rounded-lg shadow-xl p-4 w-128 mx-auto space-y-8">
            <span className="mx-auto text-3xl">GymProgrammer</span>
            <span className="border border-gray-600 mx-4" />
            <div className="flex flex-col space-y-2">
                <label className="flex flex-col">
                    Email:
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 p-1 rounded w-64"
                        type="email"
                        required
                    />
                </label>
                {emailError && <p className="text-red-500">{emailError}</p>}
                <label className="flex flex-col">
                    Password:
                    <div className="flex space-x-1">
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-1 rounded w-64"
                            type={passwordVisible ? "text" : "password"}
                            required
                        />
                        <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="cursor-pointer items-center justify-center">{passwordVisible ? <EyeOff /> : <Eye />}</button>
                    </div>
                </label>
                {passwordError && <p className="text-red-500">{passwordError}</p>}
                {errorMessage && <p className="text-red-500">{errorMessage}, please try again</p>}
                <button
                    className="p-2 w-32 border border-gray-300 cursor-pointer rounded-lg ml-auto mr-4 bg-blue-200" type="submit"
                >
                    {isLogin ? "Login" : "Register"}
                </button>
            </div>
            <>
                {isLogin ?
                    <p>No account yet? Register <a href="/register" className="underline text-blue-500">here</a></p> :
                    <p>Already have an account? Login <a href="/login" className="underline text-blue-500">here</a></p>

                }
            </>
        </form>
    )
}