import { motion } from "framer-motion"
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"
import formatDate from "../../utils/formatDate"

const TripDetails = ({ destination, startDate, endDate }) => {
	const calculateDuration = (start, end) => {
		return Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24));
	}

	return (
		<>
			<h2 className="text-2xl font-bold mb-6 !text-transparent !bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">Trip Details</h2>
			<div className="h-[0.5px] bg-gray-300 !my-3" />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<motion.div whileHover={{ y: -5 }} className="bg-gray-50 p-4 rounded-lg">
					<div className="flex gap-1 items-center mb-2">
						<FaMapMarkerAlt className="text-red-500 mr-2" />
						<h3 className="font-semibold">Destination</h3>
					</div>
					<p className="text-lg">{destination}</p>
				</motion.div>

				<motion.div whileHover={{ y: -5 }} className="bg-gray-50 p-4 rounded-lg">
					<div className="flex gap-1 items-center mb-2">
						<FaCalendarAlt className="text-blue-500 mr-2" />
						<h3 className="font-semibold">Duration</h3>
					</div>
					<p className="text-lg">
						{formatDate(startDate)} - {formatDate(endDate)}
					</p>
					<p className="text-base text-gray-500 mt-1">{calculateDuration(startDate, endDate)} days</p>
				</motion.div>
			</div>
		</>
	)
}

export default TripDetails;