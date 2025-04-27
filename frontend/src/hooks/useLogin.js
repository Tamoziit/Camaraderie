import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const login = async ({
        email,
        mobileNo,
        password,
    }) => {
        const success = handleInputErrors({
            email,
            mobileNo,
            password
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CM-token")}`
                },
                body: JSON.stringify({
                    email,
                    mobileNo,
                    password
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("CM-token", data.token);
            localStorage.setItem("CM-user", JSON.stringify(data));
            setAuthUser(data);
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, login }
}

export default useLogin;


function handleInputErrors({
    email,
    mobileNo,
    password
}) {
    if (!email && !mobileNo) {
        toast.error("Login with email or mobile no.");
        return false;
    }
    if (!password) {
        toast.error("Passwords is required");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be of atleast 6 characters");
        return false;
    }
    if (mobileNo && mobileNo.length !== 10) {
        toast.error("Enter a valid Mobile no.");
        return false;
    }

    return true;
}