import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const update = async ({
        profilePic,
        preferences
    }) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/profile/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CM-token")}`
                },
                body: JSON.stringify({
                    profilePic,
                    preferences
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
    return { loading, update }
}

export default useUpdateProfile;