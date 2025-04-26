import { motion } from "framer-motion"
import { MdPendingActions } from "react-icons/md"

const RequestsTab = ({ requests }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <span className="text-lg font-semibold mb-4">Pending Requests</span>
            {requests && requests.length > 0 ? (
                requests.map((request) => (
                    <motion.div key={request._id} whileHover={{ scale: 1.02 }} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                            <p className="font-medium">{request.requestType}</p>
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${request.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : request.status === "rejected"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                            >
                                {request.status || "Pending"}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{request.details}</p>
                        <p className="text-xs text-gray-400 mt-2">{new Date(request.createdAt).toLocaleDateString()}</p>
                    </motion.div>
                ))
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <div className="text-4xl text-gray-300 mb-2 flex justify-center">
                        <MdPendingActions />
                    </div>
                    <p className="text-gray-500">No pending requests</p>
                </div>
            )}
        </motion.div>
    )
}

export default RequestsTab