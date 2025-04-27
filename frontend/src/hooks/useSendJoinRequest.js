import { useState } from "react";
import toast from "react-hot-toast";

const useSendJoinRequest = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const joinRequest = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/groups/join-request/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CM-token")}`
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                toast.success("Request sent successfully");
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, joinRequest }
}

export default useSendJoinRequest;