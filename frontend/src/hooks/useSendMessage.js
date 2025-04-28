import { useState } from "react"
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const sendMessage = async ({ id, message }) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/community/send-message/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CM-token")}`
                },
                body: JSON.stringify({ message })
            });
            const data = await res.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                return data;
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, sendMessage };
}

export default useSendMessage;