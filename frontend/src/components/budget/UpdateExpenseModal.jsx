import { useState } from "react"
import { FaTimes, FaSave, FaMoneyBillWave, FaHandHoldingUsd } from "react-icons/fa"
import useUpdateSplitter from "../../hooks/useUpdateSplitter"
import Spinner from "../Spinner"

const UpdateExpenseModal = ({ member, onClose, onUpdate, tripId, setBudgetSplitter }) => {
    const [expenditure, setExpenditure] = useState(null)
    const [received, setReceived] = useState(null)
    const { loading, updateSplitter } = useUpdateSplitter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await updateSplitter({
            id: tripId,
            expenditure,
            received
        });
        setBudgetSplitter(data);
    }

    return (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md !mx-4">
                <div className="flex justify-between items-center !p-4 border-b">
                    <h3 className="text-lg font-bold text-gray-800">Update Expenses</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes />
                    </button>
                </div>

                <div className="!p-4">
                    <div className="flex items-center !space-x-3 !mb-4">
                        <img
                            src={member.userId.profilePic || "/placeholder.svg"}
                            alt={member.userId.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                        />
                        <div>
                            <h4 className="font-bold">{member.userId.name}</h4>
                            <p className="text-sm text-gray-500">{member.userId.email}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="!mb-4">
                            <label className="text-gray-700 text-sm font-bold !mb-2 flex items-center">
                                <FaMoneyBillWave className="!mr-2 text-green-600" />
                                Expenditure (₹)
                            </label>
                            <input
                                type="number"
                                value={expenditure}
                                onChange={(e) => setExpenditure(Number(e.target.value))}
                                className="shadow appearance-none border rounded w-full !py-2 !px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                min="0"
                                step="1"
                                placeholder="Enter Expenditure amount"
                            />
                        </div>

                        <div className="!mb-6">
                            <label className="text-gray-700 text-sm font-bold mb-2 flex items-center">
                                <FaHandHoldingUsd className="mr-2 text-blue-600" />
                                Received (₹)
                            </label>
                            <input
                                type="number"
                                value={received}
                                onChange={(e) => setReceived(Number(e.target.value))}
                                className="shadow appearance-none border rounded w-full !py-2 !px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                min="0"
                                step="1"
                                placeholder="Enter Received amount"
                            />
                        </div>

                        <div className="flex justify-end !space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="!px-4 !py-2 btn-secondary"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="!px-4 !py-2 btn-primary !flex items-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span><Spinner /></span>
                                ) : (
                                    <>
                                        <FaSave className="!mr-2" /> Save
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateExpenseModal;