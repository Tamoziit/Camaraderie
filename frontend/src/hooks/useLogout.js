import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/auth/logout/${authUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CM-token")}`
                }
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("CM-token", data.token);
            localStorage.removeItem("CM-user", JSON.stringify(data));
            setAuthUser(null);
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, logout };
}

export default useLogout;