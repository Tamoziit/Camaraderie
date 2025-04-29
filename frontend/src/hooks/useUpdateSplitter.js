import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateSplitter = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const updateSplitter = async ({ id, expenditure, received }) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/budget-splitter/update-splitter/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CM-token")}`
                },
                body: JSON.stringify({ expenditure, received })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                toast.success("Splitter updated successfully");
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
    return { loading, updateSplitter }
}

export default useUpdateSplitter;