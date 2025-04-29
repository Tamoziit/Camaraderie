import { FaCalendarAlt, FaClock, FaInfoCircle, FaTag, FaTimes } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useUpdateItinerary from "../hooks/useUpdateItinerary";
import Spinner from "./Spinner";

const ItineraryForm = ({ closeModal, formData, setFormData, formErrors, setFormErrors, setIsModalOpen, setItinerary }) => {
	const { id } = useParams();
	const { loading, update } = useUpdateItinerary();

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})

		if (formErrors[name]) {
			setFormErrors({
				...formErrors,
				[name]: "",
			})
		}
	}

	const validateForm = () => {
		const errors = {}
		if (!formData.name.trim()) errors.name = "Name is required"
		if (!formData.date) errors.date = "Date is required"
		if (!formData.time) errors.time = "Time is required"
		if (!formData.details.trim()) errors.details = "Details are required"

		setFormErrors(errors)
		return Object.keys(errors).length === 0
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!validateForm()) return;

		const data = await update({
			name: formData.name,
			details: formData.details,
			date: `${formData.date}/${formData.time}`,
			id
		});
		setItinerary(data);

		setFormData({
			name: "",
			date: "",
			time: "",
			details: "",
		})
		setIsModalOpen(false)
	}

	return (
		<div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-md !mx-4 overflow-hidden">
				<div className="flex justify-between items-center bg-blue-600 text-white !px-6 !py-4">
					<h3 className="text-lg font-semibold">Add New Itinerary Item</h3>
					<button onClick={closeModal} className="text-white hover:text-gray-200">
						<FaTimes size={20} />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="!p-6">
					<div className="!mb-4">
						<label className="text-gray-700 text-sm font-bold !mb-2 flex items-center">
							<FaTag className="!mr-2 text-blue-600" />
							Activity Name
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							className={`w-full !px-3 !py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.name ? "border-red-500" : "border-gray-300"
								}`}
							placeholder="e.g., Museum Visit"
						/>
						{formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
					</div>

					<div className="grid grid-cols-2 gap-4 !mb-4">
						<div>
							<label className="text-gray-700 text-sm font-bold !mb-2 flex items-center">
								<FaCalendarAlt className="!mr-2 text-blue-600" />
								Date
							</label>
							<input
								type="date"
								name="date"
								value={formData.date}
								onChange={handleInputChange}
								className={`w-full !px-3 !py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.date ? "border-red-500" : "border-gray-300"
									}`}
							/>
							{formErrors.date && <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>}
						</div>

						<div>
							<label className="text-gray-700 text-sm font-bold !mb-2 flex items-center">
								<FaClock className="!mr-2 text-blue-600" />
								Time
							</label>
							<input
								type="time"
								name="time"
								value={formData.time}
								onChange={handleInputChange}
								className={`w-full !px-3 !py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.time ? "border-red-500" : "border-gray-300"
									}`}
							/>
							{formErrors.time && <p className="text-red-500 text-xs mt-1">{formErrors.time}</p>}
						</div>
					</div>

					<div className="!mb-6">
						<label className="text-gray-700 text-sm font-bold !mb-2 flex items-center">
							<FaInfoCircle className="!mr-2 text-blue-600" />
							Details
						</label>
						<textarea
							name="details"
							value={formData.details}
							onChange={handleInputChange}
							className={`w-full !px-3 !py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${formErrors.details ? "border-red-500" : "border-gray-300"
								}`}
							rows="3"
							placeholder="Enter activity details..."
						></textarea>
						{formErrors.details && <p className="text-red-500 text-xs mt-1">{formErrors.details}</p>}
					</div>

					<div className="flex justify-end gap-3">
						<button
							type="button"
							onClick={closeModal}
							className="!px-4 !py-2 btn-secondary"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="!px-4 !py-2 btn-primary"
							disabled={loading}
						>
							{loading ? <Spinner /> : "Add Item"}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ItineraryForm;