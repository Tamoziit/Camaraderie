import { useState } from "react";
import toast from "react-hot-toast";

const useViewRequests = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const viewRequests = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/groups/get-requests/${id}`, {
                method: "GET",
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
    return { loading, viewRequests }
}

export default useViewRequests;