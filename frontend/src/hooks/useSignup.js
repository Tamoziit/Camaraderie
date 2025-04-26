import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const signup = async ({
        name,
        email,
        password,
        confirmPassword,
        mobileNo,
        aadharNo,
        dob,
        age,
        gender,
        address,
        profession,
        institute,
        company,
        otherProfession,
        agreeToTerms }) => {
        const success = handleInputErrors({
            name,
            email,
            password,
            confirmPassword,
            mobileNo,
            aadharNo,
            dob,
            age,
            gender,
            address,
            profession,
            institute,
            company,
            otherProfession,
            agreeToTerms
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/v1/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CM-token")}`
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    confirmPassword,
                    mobileNo,
                    aadharNo,
                    dob,
                    age,
                    gender,
                    address,
                    profession,
                    institute,
                    company,
                    otherProfession
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("CM-token", data.token);
            localStorage.setItem("CM-user", JSON.stringify(data));
            setAuthUser(data);
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return { loading, signup }
}

export default useSignup


function handleInputErrors({
    name,
    email,
    password,
    confirmPassword,
    mobileNo,
    aadharNo,
    dob,
    age,
    gender,
    address,
    profession,
    institute,
    company,
    otherProfession,
    agreeToTerms }) {
    if (!name || !email || !password || !confirmPassword || !mobileNo || !aadharNo || !dob || !age || !gender || !address || !profession || !agreeToTerms) {
        toast.error("Please fill all the fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be of atleast 6 characters");
        return false;
    }
    if (mobileNo.length !== 10) {
        toast.error("Enter a valid Mobile no.");
        return false;
    }
    if (aadharNo.length !== 12) {
        toast.error("Enter a valid Aadhar no.");
        return false;
    }
    if (name.length < 2) {
        toast.error("Name should be at least 2 characters long");
        return false;
    }
    if (gender !== "M" && gender !== "F" && gender !== "O") {
        toast.error("Enter valid gender data");
        return false;
    }
    if (profession === "student" && !institute) {
        toast.error("Institute name is required for Students");
        return false;
    }
    if (profession === "professional" && !company) {
        toast.error("Company name is required for Working Professionals");
        return false;
    }
    if (profession === "other" && !otherProfession) {
        toast.error("Specify your designation or work affiliation");
        return false;
    }
    if (!agreeToTerms) {
        toast.error("Agreeing to our terms & conditions is necessary");
        return false;
    }

    return true;
}