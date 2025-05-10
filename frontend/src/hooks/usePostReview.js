import { useState } from "react"
import toast from "react-hot-toast";

const usePostReview = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const postReview = async ({
        rating,
        message,
        id
    }) => {
        const success = handleInputErrors({
            rating,
            message
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/reviews/feedback/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CM-token")}`
                },
                body: JSON.stringify({
                    rating,
                    message
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data) {
                toast.success("Review posted successfully");
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, postReview }
}

export default usePostReview;


function handleInputErrors({
    rating,
    message
}) {
    if (!rating) {
        toast.error("Rating is required");
        return false;
    }
    if (rating < 0 || rating > 10) {
        toast.error("Enter a valid rating");
        return false;
    }

    return true;
}