import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCreateGroup = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const createGroup = async ({
        destination,
        startDate,
        endDate,
        transport }) => {
        const success = handleInputErrors({
            destination,
            startDate,
            endDate,
            transport
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/groups/create-group`, {
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

            if (data._id) {
                toast.success("Group Created Successfully!");
                navigate("/trips/current-trip");
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, createGroup }
}

export default useCreateGroup;


function handleInputErrors({
    destination,
    startDate,
    endDate,
    transport }) {
    if (!destination || !startDate || !endDate) {
        toast.error("Please fill all required fields");
        return false;
    }
    if (transport.mode && !transport.name) {
        toast.error("Transport name is required");
        return false;
    }
    if (transport.mode && (!transport.arrival || !transport.departure || !transport.pickup)) {
        toast.error("Transport details is required");
        return false;
    }

    return true;
}