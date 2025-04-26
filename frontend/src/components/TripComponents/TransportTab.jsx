import { motion } from "framer-motion"
import { FaPlane } from "react-icons/fa"
import getTransportIcon from "../../utils/iconUtil"

const TransportTab = ({ transport }) => {
    const hasTransportDetails = transport && Object.keys(transport).some((key) => transport[key])

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <span className="text-lg font-semibold mb-4">Transport Details</span>
            {hasTransportDetails ? (
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        {getTransportIcon(transport.mode)}
                        <span className="ml-2 font-medium capitalize">{transport.mode || "Not specified"}</span>
                    </div>
                    {transport.name && (
                        <p className="text-sm">
                            <span className="font-medium">Name:</span> {transport.name}
                        </p>
                    )}
                    {transport.PNR && (
                        <p className="text-sm">
                            <span className="font-medium">PNR:</span> {transport.PNR}
                        </p>
                    )}
                    {transport.pickup && (
                        <p className="text-sm">
                            <span className="font-medium">Pickup:</span> {transport.pickup}
                        </p>
                    )}
                    {transport.departure && (
                        <p className="text-sm">
                            <span className="font-medium">Departure:</span> {transport.departure}
                        </p>
                    )}
                    {transport.arrival && (
                        <p className="text-sm">
                            <span className="font-medium">Arrival:</span> {transport.arrival}
                        </p>
                    )}
                </div>
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <div className="text-4xl text-gray-300 mb-2 flex justify-center">
                        <FaPlane />
                    </div>
                    <p className="text-gray-500">No transport details available</p>
                </div>
            )}
        </motion.div>
    )
}

export default TransportTab