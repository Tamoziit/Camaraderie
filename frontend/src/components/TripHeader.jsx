import { FaBolt, FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import formatDate from "../utils/formatDate";

const TripHeader = ({ destination, startDate, endDate, members, intrinsicStrength }) => {
	return (
		<div className="flex items-center justify-between !px-6 !py-2 bg-gray-100 border-b border-blue-600">
			<div className="flex items-center gap-3">
				<div className="bg-blue-600 rounded-full !p-2">
					<FaMapMarkerAlt className="text-white text-xl" />
				</div>
				<div className="flex flex-col">
					<span className="text-3xl font-semibold text-gray-800">{destination}</span>
					<div className="flex items-center text-sm text-gray-600">
						<FaCalendarAlt className="!mr-1" />
						<span className="text-base">
							{formatDate(startDate)} - {formatDate(endDate)}
						</span>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-4 text-lg">
				<div className="flex items-center text-gray-700">
					<FaUsers className="!mr-2 text-blue-600 text-xl" />
					<span>{members} members</span>
				</div>
				<div className="flex items-center text-gray-700">
					<FaBolt className="!mr-2 text-yellow-500 text-xl" />
					<span>Intrinsic Strength: {intrinsicStrength}</span>
				</div>
			</div>
		</div>
	)
}

export default TripHeader;