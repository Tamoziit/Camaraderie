import { useParams } from "react-router-dom"
import useGetBudgetSplitter from "../../hooks/useGetBudgetSplitter"
import { useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import TripHeader from "../../components/TripHeader"
import { FaMoneyBillWave, FaHandHoldingUsd } from "react-icons/fa"
import { MdAccountBalance } from "react-icons/md"
import MemberCard from "../../components/budget/MemberCard"
import UpdateExpenseModal from "../../components/budget/UpdateExpenseModal"

const Budget = () => {
  const { id } = useParams()
  const [budgetSplitter, setBudgetSplitter] = useState(null)
  const { loading, getSplitter } = useGetBudgetSplitter()
  const [showModal, setShowModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  const fetchSplitter = async () => {
    const data = await getSplitter(id)
    setBudgetSplitter(data)
  }

  useEffect(() => {
    fetchSplitter()
  }, [])

  const handleUpdateClick = (member) => {
    setSelectedMember(member)
    setShowModal(true)
  }

  const handleUpdateComplete = () => {
    setShowModal(false);
  }

  const calculateTotalExpenditure = () => {
    if (!budgetSplitter?.budgetSplitter) return 0
    return budgetSplitter.budgetSplitter.reduce((total, member) => total + member.expenditure, 0)
  }

  const calculatePerPersonShare = () => {
    const total = calculateTotalExpenditure()
    const memberCount = budgetSplitter?.members?.length || 1
    return total / memberCount
  }

  if (!budgetSplitter || loading) {
    return <Spinner />
  }

  return (
    <div className="flex w-full h-[100vh] bg-gray-50">
      <div className="flex flex-col w-full !m-3 rounded-lg overflow-hidden border border-blue-600 shadow-lg !z-20">
        <TripHeader
          destination={budgetSplitter.destination}
          startDate={budgetSplitter.startDate}
          endDate={budgetSplitter.endDate}
          members={budgetSplitter.members.length}
          intrinsicStrength={budgetSplitter.intrinsicStrength}
        />

        <div className="flex-1 overflow-y-auto !p-6 bg-white bg-opacity-95">
          <div className="!mb-6 !p-4 bg-blue-50 rounded-lg shadow">
            <span className="text-3xl font-bold text-blue-800 !mb-2 flex items-center">
              <MdAccountBalance className="!mr-2" /> Budget Summary
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white !p-3 rounded-md shadow flex items-center">
                <FaMoneyBillWave className="text-green-600 text-xl !mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Total Expenditure</p>
                  <p className="font-bold text-lg">₹{calculateTotalExpenditure()}</p>
                </div>
              </div>
              <div className="bg-white !p-3 rounded-md shadow flex items-center">
                <FaHandHoldingUsd className="text-blue-600 text-xl !mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Per Person Share</p>
                  <p className="font-bold text-lg">₹{calculatePerPersonShare().toFixed(2)}</p>
                </div>
              </div>
              <div className="bg-white !p-3 rounded-md shadow flex items-center">
                <div className="bg-blue-100 !p-2 rounded-full !mr-3">
                  <span className="text-blue-700 font-bold">{budgetSplitter.members.length}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Members</p>
                  <p className="font-bold text-lg">Splitting Expenses</p>
                </div>
              </div>
            </div>
          </div>

          <span className="text-2xl font-bold text-gray-800">Member Expenses</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 !mt-4">
            {budgetSplitter.budgetSplitter.map((member) => (
              <MemberCard key={member._id} member={member} onUpdateClick={() => handleUpdateClick(member)} />
            ))}
          </div>
        </div>
      </div>

      {showModal && selectedMember && (
        <UpdateExpenseModal
          member={selectedMember}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdateComplete}
          tripId={id}
          setBudgetSplitter={setBudgetSplitter}
        />
      )}
    </div>
  )
}

export default Budget;