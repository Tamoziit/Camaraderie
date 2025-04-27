import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import EmptyTripState from "../../components/TripComponents/EmptyTripState";
import TripHeader from "../../components/TripComponents/TripHeader";
import TripTabs from "../../components/TripComponents/TripTabs";
import TripDetails from "../../components/TripComponents/TripDetails";
import ActionCards from "../../components/TripComponents/ActionCards";
import useGetTripById from "../../hooks/useGetTripById";

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

const Trip = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const { loading, getTrip } = useGetTripById();

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
                <div className="flex flex-col md:flex-row">
                    <motion.div variants={itemVariants} className="w-full md:w-[250px] lg:w-[450px] border-r border-gray-300">
                        <TripTabs
                            members={trip.members}
                            admin={trip.admin}
                            transport={trip.transport}
                            requests={trip.requests}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="w-full !px-3">
                        <TripDetails destination={trip.destination} startDate={trip.startDate} endDate={trip.endDate} />

                        <h3 className="text-xl font-semibold !mb-4">Quick Actions</h3>
                        <ActionCards />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default Trip;