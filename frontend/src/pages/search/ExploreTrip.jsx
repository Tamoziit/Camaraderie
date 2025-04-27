import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import useGetTripById from "../../hooks/useGetTripById";
import TripHeader from "../../components/TripComponents/TripHeader";
import EmptyTripState from "../../components/TripComponents/EmptyTripState";
import Spinner from "../../components/Spinner";
import TripDetails from "../../components/TripComponents/TripDetails";
import { FaClock, FaIdCard, FaPaperPlane } from "react-icons/fa";
import formatDate from "../../utils/formatDate";
import getTransportIcon from "../../utils/iconUtil";
import { FaLocationDot } from "react-icons/fa6";
import Members from "../../components/Members";
import useSendJoinRequest from "../../hooks/useSendJoinRequest";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 100,
		},
	},
}

const ExploreTrip = () => {
	const { id } = useParams();
	const [trip, setTrip] = useState(null);
	const { loading, getTrip } = useGetTripById();
	const { loading: sending, joinRequest } = useSendJoinRequest();

	const fetchTrip = async () => {
		const data = await getTrip(id);
		setTrip(data)
	}

	useEffect(() => {
		fetchTrip()
	}, []);

	if (loading) {
		return <Spinner />
	}

	if (!trip) {
		return <EmptyTripState />
	}

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className="w-full !-mt-2 bg-white shadow-lg overflow-hidden"
		>
			<motion.div variants={itemVariants}>
				<TripHeader destination={trip.destination} startDate={trip.startDate} endDate={trip.endDate} />
			</motion.div>

			<div className="w-full !p-4">
				<motion.div variants={itemVariants} className="w-full !px-3">
					<TripDetails destination={trip.destination} startDate={trip.startDate} endDate={trip.endDate} />

					<div className="h-[0.5px] bg-gray-300 flex w-full !my-3" />

					{trip.transport.mode && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
							<motion.div whileHover={{ y: -5 }} className="bg-gray-50 p-4 rounded-lg">
								<div className="flex gap-1 items-center mb-2">
									<span>{getTransportIcon(trip.transport.mode)}</span>
									<h3 className="font-semibold">Mode</h3>
								</div>
								<p className="text-lg">{trip.transport.mode}</p>
							</motion.div>

							<motion.div whileHover={{ y: -5 }} className="bg-gray-50 p-4 rounded-lg">
								<div className="flex gap-1 items-center mb-2">
									<FaPaperPlane className="text-blue-600 mr-2" />
									<h3 className="font-semibold">Name</h3>
								</div>
								<p className="text-lg">
									{trip.transport.name}
								</p>
							</motion.div>

							<motion.div whileHover={{ y: -5 }} className="bg-gray-50 p-4 rounded-lg">
								<div className="flex gap-1 items-center mb-2">
									<FaClock className="text-blue-600 mr-2" />
									<h3 className="font-semibold">Journey Duration</h3>
								</div>
								<p className="text-lg">
									{formatDate(trip.transport.departure)} - {formatDate(trip.transport.arrival)}
								</p>
							</motion.div>

							<motion.div whileHover={{ y: -5 }} className="bg-gray-50 p-4 rounded-lg">
								<div className="flex gap-1 items-center mb-2">
									<FaLocationDot className="text-blue-600 mr-2" />
									<h3 className="font-semibold">Pickup</h3>
								</div>
								<p className="text-lg">
									{trip.transport.pickup}
								</p>
							</motion.div>

							<motion.div whileHover={{ y: -5 }} className="bg-gray-50 p-4 rounded-lg">
								<div className="flex gap-1 items-center mb-2">
									<FaIdCard className="text-blue-600 mr-2" />
									<h3 className="font-semibold">PNR/Booking Reference</h3>
								</div>
								<p className="text-lg">
									{trip.transport.PNR}
								</p>
							</motion.div>
						</div>
					)}
				</motion.div>

				<div className="h-[0.5px] bg-gray-300 flex w-full !my-3" />

				<motion.div variants={itemVariants} className="w-full !px-3">
					<Members
						members={trip.members}
						intrinsicStrength={trip.intrinsicStrength}
						admin={trip.admin}
					/>
				</motion.div>
			</div>

			<motion.div variants={itemVariants} className="w-full flex items-center justify-center !my-6 !px-3">
				<button
					className="btn-secondary !px-16 !text-lg"
					disabled={loading || sending}
					onClick={() => joinRequest(trip._id)}
				>
					{sending ? <Spinner /> : "Send Join Request"}
				</button>
			</motion.div>
		</motion.div>
	)
}

export default ExploreTrip;