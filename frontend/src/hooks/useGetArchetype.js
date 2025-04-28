import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetArchetype = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const getArchetype = async ({
        likes,
        dislikes,
        travelPreferences,
        canTolerate,
        cannotTolerate
    }) => {
        const success = handleInputErrors({
            likes,
            dislikes,
            travelPreferences,
            canTolerate,
            cannotTolerate
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/profile/archetype`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CM-token")}`
                },
                body: JSON.stringify({
                    likes,
                    dislikes,
                    travelPreferences,
                    canTolerate,
                    cannotTolerate
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("CM-token", data.user.token);
            localStorage.setItem("CM-user", JSON.stringify(data.user));
            setAuthUser(data.user);

            return data;
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, getArchetype }
}

export default useGetArchetype


function handleInputErrors({
    likes,
    dislikes,
    travelPreferences,
    canTolerate,
    cannotTolerate }) {
    if (likes.length < 0) {
        toast.error("Please enter atleast 1 liking");
        return false;
    }
    if (dislikes.length < 0) {
        toast.error("Please enter atleast 1 disliking");
        return false;
    }
    if (travelPreferences.destinations.length < 0) {
        toast.error("Please enter atleast 1 preferred destination");
        return false;
    }
    if (!travelPreferences.groupSize) {
        toast.error("Please enter Group size");
        return false;
    }
    if (!travelPreferences.pace) {
        toast.error("Enter a travelling pace");
        return false;
    }
    if (canTolerate.length < 0) {
        toast.error("Please enter atleast 1 thing you can tolerate");
        return false;
    }
    if (cannotTolerate.length < 0) {
        toast.error("Please enter atleast 1 thing you cannot tolerate");
        return false;
    }

    return true;
}