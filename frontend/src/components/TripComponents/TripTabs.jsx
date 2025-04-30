import { useState } from "react"
import { BsPeopleFill } from "react-icons/bs"
import { FaPlane } from "react-icons/fa"
import { MdPendingActions } from "react-icons/md"
import MembersTab from "./MembersTab"
import TransportTab from "./TransportTab"
import RequestsTab from "./RequestsTab"
import { useAuthContext } from "../../context/AuthContext"

const TripTabs = ({ members, admin, transport, requests, intrinsicStrength }) => {
	const [activeTab, setActiveTab] = useState("members");
	const { authUser } = useAuthContext();

	console.log(requests)

	return (
		<>
			<div className="flex items-center justify-around border-b border-gray-300 !px-2">
				<button
					onClick={() => setActiveTab("members")}
					className={`flex py-4 px-4 items-center gap-0.5 font-medium ${activeTab === "members" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
						}`}
				>
					<BsPeopleFill className="inline mr-2" />
					<span className="hidden lg:block">Members</span>
				</button>
				<button
					onClick={() => setActiveTab("details")}
					className={`flex py-4 px-4 items-center gap-0.5 font-medium ${activeTab === "details" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
						}`}
				>
					<FaPlane className="inline mr-2" />
					<span className="hidden lg:block">Transport</span>
				</button>
				{authUser._id === admin?._id && (
					<button
						onClick={() => setActiveTab("requests")}
						className={`flex py-4 px-4 items-center gap-0.5 font-medium ${activeTab === "requests" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
							}`}
					>
						<MdPendingActions className="inline mr-2" />
						<span className="hidden lg:block">Requests</span>
					</button>
				)}
			</div>

			<div className="p-4">
				{activeTab === "members" && <MembersTab members={members} adminId={admin?._id} intrinsicStrength={intrinsicStrength} />}
				{activeTab === "details" && <TransportTab transport={transport} />}
				{authUser._id === admin?._id && (
					activeTab === "requests" && <RequestsTab requests={requests} />
				)}
			</div>
		</>
	)
}

export default TripTabs;