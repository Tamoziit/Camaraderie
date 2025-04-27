import { useState } from "react"
import toast from "react-hot-toast";

const useGetSearch = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const search = async ({
        destination,
        startDate,
        endDate,
        transport }) => {
        const success = handleInputErrors({
            destination,
            startDate,
            endDate
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CM-token")}`
                },
                body: JSON.stringify({
                    destination,
                    startDate,
                    endDate,
                    transport
                })
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
    return { loading, search }
}

export default useGetSearch;


function handleInputErrors({
    destination,
    startDate,
    endDate }) {
    if (!destination || !startDate || !endDate) {
        toast.error("Please fill all required fields");
        return false;
    }

    return true;
}