import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetItinerary from "../../hooks/useGetItinerary";
import Spinner from "../../components/Spinner";
import { FaCheckCircle, FaHotel, FaTrain, FaMapMarkerAlt, FaCalendarAlt, FaPlus, FaCircle } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import formatDateTime from "../../utils/formatDateTime";
import TripHeader from "../../components/TripHeader";
import ItineraryForm from "../../components/ItineraryForm";
import { IoMdCheckmark } from "react-icons/io";
import useMarkItineraryDone from "../../hooks/useMarkItineraryDone";

const Itinerary = () => {
	const { id } = useParams();
	const { loading, getItinerary } = useGetItinerary();
	const [itinerary, setItinerary] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [formData, setFormData] = useState({
		name: "",
		date: "",
		time: "",
		details: ""
	})
	const [formErrors, setFormErrors] = useState({});
	const { loading: updating, markDone } = useMarkItineraryDone();

	const fetchItinerary = async () => {
		const data = await getItinerary(id);
		setItinerary(data);
	}

	const getActivityIcon = (name) => {
		const lowerName = name.toLowerCase()

		if (lowerName.includes("train") || lowerName.includes("onboarding")) {
			return <FaTrain className="text-blue-600" />
		} else if (lowerName.includes("hotel") || lowerName.includes("check-in")) {
			return <FaHotel className="text-blue-600" />
		} else if (lowerName.includes("flight") || lowerName.includes("boarding")) {
			return <MdFlightTakeoff className="text-blue-600" />
		} else {
			return <FaMapMarkerAlt className="text-blue-600" />
		}
	}

	useEffect(() => {
		fetchItinerary();
	}, []);

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setFormErrors({})
	}

	const handleUpdate = async (itineraryId) => {
		const data = await markDone({
			id,
			itineraryId
		});
		setItinerary(data);
	}

	if (!itinerary || loading) return <Spinner />;

	return (
		<div className="flex w-full h-[100vh] bg-gray-50">
			<div className="flex flex-col w-full !m-3 rounded-lg overflow-hidden border border-blue-600 shadow-lg !z-20">
				<TripHeader
					destination={itinerary.destination}
					startDate={itinerary.startDate}
					endDate={itinerary.endDate}
					members={itinerary.members.length}
					intrinsicStrength={itinerary.intrinsicStrength}
				/>

				<div className="flex-1 overflow-y-auto !p-6 bg-white bg-opacity-95">
					<div className="flex justify-between items-center !mb-6">
						<span className="text-2xl font-semibold text-gray-800">Itinerary Timeline</span>
						<button
							onClick={openModal}
							className="flex items-center gap-2 !bg-blue-600 hover:!bg-blue-700 text-white !px-4 !py-2 rounded-lg transition-colors duration-200"
						>
							<FaPlus size={14} />
							<span>Add Item</span>
						</button>
					</div>

					<div className="relative !mt-4">
						<div className="absolute left-7 top-0 bottom-0 !w-0.5 bg-gray-200 flex"></div>

						{itinerary.itinerary.map((item) => {
							const { date, time } = formatDateTime(item.date)

							return (
								<div key={item._id} className="relative flex items-start !mb-8">
									<div className="absolute left-7 transform !-translate-x-1/2 !mt-1.5">
										{item.isDone ? (
											<FaCheckCircle className="text-green-500 text-xl" />
										) : (
											<FaCircle className="text-gray-400 text-xl" />
										)}
									</div>

									<div className="!ml-16 flex-1">
										<div
											className={`!p-4 rounded-lg shadow-md border ${item.isDone ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}
										>
											<div className="flex items-center justify-between !mb-2">
												<div className="flex items-center">
													<span className="!mr-2">{getActivityIcon(item.name)}</span>
													<span className="text-xl font-medium text-gray-800">{item.name}</span>
												</div>
												<span
													className={`text-sm font-medium !px-2 !py-1 rounded-full ${item.isDone ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
												>
													{item.isDone ? "Completed" : "Upcoming"}
												</span>
											</div>

											<div className="!mb-2 text-sm text-gray-600">
												<div className="flex items-center">
													<FaCalendarAlt className="!mr-2" />
													<span>
														{date} • {time}
													</span>
												</div>
											</div>

											<p className="text-gray-700">{item.details}</p>

											<div className={`w-full justify-end ${item.isDone ? "hidden" : "flex"}`}>
												<button
													className="!bg-green-400 !p-3 !mt-3 rounded-full text-lg hover:!bg-green-500 cursor-pointer duration-300"
													disabled={updating || loading}
													onClick={() => handleUpdate(item._id)}
												>
													{updating ? <Spinner /> : <IoMdCheckmark />}
												</button>
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>

			{isModalOpen && (
				<ItineraryForm
					closeModal={closeModal}
					formData={formData}
					setFormData={setFormData}
					formErrors={formErrors}
					setFormErrors={setFormErrors}
					setIsModalOpen={setIsModalOpen}
					setItinerary={setItinerary}
				/>
			)}
		</div>
	)
}

export default Itinerary;