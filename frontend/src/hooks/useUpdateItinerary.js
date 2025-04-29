import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateItinerary = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const update = async ({
        name,
        details,
        date,
        id
    }) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/personal/itinerary/update/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CM-token")}`
                },
                body: JSON.stringify({
                    name,
                    details,
                    date
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                toast.success("Itinerary updated successfully");
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
    return { loading, update }
}

export default useUpdateItinerary;