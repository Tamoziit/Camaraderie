import { FaMoneyBillWave, FaHandHoldingUsd, FaArrowUp, FaArrowDown, FaPencilAlt } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";

const MemberCard = ({ member, onUpdateClick }) => {
    const { userId, expenditure, received, toGive, toReceive } = member;
    const { authUser } = useAuthContext();

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="!p-4 border-b border-gray-200 flex items-center !space-x-3">
                <img
                    src={userId.profilePic || "/placeholder.svg"}
                    alt={userId.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="flex-1">
                    <span className="font-bold text-xl text-gray-800">{userId.name}</span>
                    <p className="text-sm text-gray-500 truncate">{userId.email}</p>
                </div>
                {authUser._id === userId._id && (
                    <button
                        onClick={onUpdateClick}
                        className="!p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                        title="Update expenses"
                    >
                        <FaPencilAlt />
                    </button>
                )}
            </div>

            <div className="!p-3 grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500 flex items-center">
                        <FaMoneyBillWave className="!mr-1 text-green-600" /> Spent
                    </span>
                    <span className="font-bold text-lg">₹{expenditure}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500 flex items-center">
                        <FaHandHoldingUsd className="!mr-1 text-blue-600" /> Received
                    </span>
                    <span className="font-bold text-lg">₹{received}</span>
                </div>
            </div>

            <div className="bg-gray-50 !p-4">
                {toReceive > 0 ? (
                    <div className="flex items-center text-green-700">
                        <FaArrowDown className="!mr-2" />
                        <span className="font-medium">To Receive: ₹{toReceive.toFixed(2)}</span>
                    </div>
                ) : toGive > 0 ? (
                    <div className="flex items-center text-red-700">
                        <FaArrowUp className="!mr-2" />
                        <span className="font-medium">To Give: ₹{toGive.toFixed(2)}</span>
                    </div>
                ) : (
                    <div className="flex items-center text-gray-700">
                        <span className="font-medium">All Settled</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MemberCard;