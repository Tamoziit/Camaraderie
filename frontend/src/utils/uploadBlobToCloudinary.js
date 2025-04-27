import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

const handleImageUpload = async (imageUrl) => {
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL;

    const formData = new FormData();
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch blob: ${response.status}`);
        }
        const blob = await response.blob();

        // Compressing the image
        const compressedBlob = await imageCompression(blob, {
            maxSizeMB: 10, // Maximum size in MB
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        });

        formData.append("file", compressedBlob);
        const res = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
            console.error("Cloudinary Error: ", data);
            throw new Error(`Cloudinary upload failed: ${res.statusText}`);
        }

        return data.secure_url;
    } catch (error) {
        console.error("Error uploading image: ", error);
        toast.error("Couldn't upload image");
        return null;
    }
};

export default handleImageUpload;