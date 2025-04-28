import { useEffect, useState } from "react";
import useGetMyCurrentTrip from "../../hooks/useGetMyCurrentTrip";
import { motion } from "framer-motion";
import Spinner from "../../components/Spinner";
import EmptyTripState from "../../components/TripComponents/EmptyTripState";
import TripHeader from "../../components/TripComponents/TripHeader";
import TripTabs from "../../components/TripComponents/TripTabs";
import TripDetails from "../../components/TripComponents/TripDetails";
import ActionCards from "../../components/TripComponents/ActionCards";

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

const CurrentTrip = () => {
	const [currTrip, setCurrTrip] = useState(null)
	const { loading, myCurrTrip } = useGetMyCurrentTrip()

	const fetchMyCurrTrip = async () => {
		const data = await myCurrTrip()
		setCurrTrip(data)
	}

	useEffect(() => {
		fetchMyCurrTrip()
	}, []);

	console.log(currTrip)

	if (loading) {
		return <Spinner />
	}

	if (!currTrip) {
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
				<TripHeader destination={currTrip.destination} startDate={currTrip.startDate} endDate={currTrip.endDate} />
			</motion.div>

			<div className="w-full !p-4">
				<div className="flex flex-col md:flex-row">
					<motion.div variants={itemVariants} className="w-full md:w-[250px] lg:w-[450px] border-r border-gray-300">
						<TripTabs
							members={currTrip.members}
							admin={currTrip.admin}
							transport={currTrip.transport}
							requests={currTrip.requests}
						/>
					</motion.div>

					<motion.div variants={itemVariants} className="w-full !px-3">
						<TripDetails destination={currTrip.destination} startDate={currTrip.startDate} endDate={currTrip.endDate} />

						<h3 className="text-xl font-semibold !mb-4">Quick Actions</h3>
						<ActionCards
							id={currTrip._id}
						/>
					</motion.div>
				</div>
			</div>
		</motion.div>
	)
}

export default CurrentTrip;