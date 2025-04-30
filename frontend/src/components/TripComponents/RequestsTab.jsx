import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import useAcceptRequest from "../../hooks/useAcceptRequest";
import Spinner from "../Spinner";
import { useParams } from "react-router-dom";

const RequestsTab = ({ requests }) => {
	const { loading, acceptRequest } = useAcceptRequest();
	const { id } = useParams();

	const getAvgRating = () => {
		let avgRating = 0;
		requests.reviews?.forEach((request) => {
			avgRating += request.rating;
		});
		avgRating = avgRating / requests.reviews?.length();
		if (avgRating > 0.0) return avgRating;
		else return 0.0;
	}

	const handleAccept = async (userId) => {
		await acceptRequest({
			id,
			userId
		});
	}

	console.log(requests)

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
			<span className="text-lg font-semibold">Pending Requests</span>
			{requests && requests.length > 0 ? (
				requests.map((request) => (
					<motion.div key={request._id} whileHover={{ scale: 1.02 }} className="!p-3 bg-gray-200 rounded-lg !mr-3 !mt-2">
						<div className="flex items-center gap-2">
							<img
								src={request.profilePic || "/placeholderImg.png"}
								alt={request.name}
								className="size-10 rounded-full object-cover object-center border"
							/>
							<p className="font-medium">{request.name}</p>
						</div>

						<p className="text-sm text-gray-500 mt-1">{request.email}</p>
						<p className="text-sm text-gray-500 mt-1">{request.mobileNo}</p>
						<p className="text-sm text-gray-500 mt-1">{request.archetype} | {request.intrinsicStrength}</p>

						<p className="text-sm font-medium text-gray-600 mt-1 flex items-center gap-1">{request.totalTrips?.length} Trips | <FaStar className="text-yellow-400" /> {getAvgRating()}</p>
						<p className="text-xs text-gray-400 mt-2">{new Date(request.createdAt).toLocaleDateString()}</p>

						<button
							className="!bg-green-300 hover:!bg-green-400 !p-2 !mt-2 rounded-full text-lg"
							disabled={loading}
							onClick={() => handleAccept(request._id)}
						>
							{loading ? <Spinner /> : <TiTick />}
						</button>
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

export default RequestsTab;