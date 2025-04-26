import { motion } from "framer-motion"
import { FaMapMarkerAlt } from "react-icons/fa"

const EmptyTripState = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-5xl text-gray-300 mb-4"
            >
                <FaMapMarkerAlt />
            </motion.div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Current Trip Found</h2>
            <p className="text-gray-500">You don't have any active trips at the moment.</p>
        </div>
    )
}

export default EmptyTripState