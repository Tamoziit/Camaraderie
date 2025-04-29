import { useState } from "react";
import toast from "react-hot-toast";

const useGetItinerary = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const getItinerary = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/personal/itinerary/${id}`, {
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

            if (data.destination) {
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
    return { loading, getItinerary }
}

export default useGetItinerary;