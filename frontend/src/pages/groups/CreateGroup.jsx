import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaPlane, FaChevronUp, FaPaperPlane, FaQrcode } from 'react-icons/fa';
import { FaLocationDot, FaUmbrellaBeach } from "react-icons/fa6";
import { MdFlightTakeoff } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import "../../styles/SignUp.css"
import useCreateGroup from '../../hooks/useCreateGroup';
import Spinner from '../../components/Spinner';

const CreateGroup = () => {
	const [formData, setFormData] = useState({
		destination: "",
		startDate: "",
		endDate: "",
		transport: {
			mode: "",
			name: "",
			pickup: "",
			departure: "",
			arrival: "",
			PNR: ""
		}
	});
	const [showTransport, setShowTransport] = useState(false);
	const { loading, createGroup } = useCreateGroup();

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name.includes('transport.')) {
			const transportField = name.split('.')[1];
			setFormData({
				...formData,
				transport: {
					...formData.transport,
					[transportField]: value
				}
			});
		} else {
			setFormData({
				...formData,
				[name]: value
			});
		}
	};

	const toggleTransport = () => {
		setShowTransport(!showTransport);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		await createGroup(formData);
	};

	return (
		<div className="signup-container">
			<div className="signup-content">
				<div className="signup-header !-mt-10">
					<h1 className="font-semibold !text-transparent !bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
						<FaUsers /> Create New Travel Group
					</h1>
					<p className='text-lg italic'>Create a group to find Compatible Travel Companions & manage your Trip!!</p>
				</div>

				<form className="signup-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>
							<FaMapMarkerAlt className="form-icon" />
							Destination <span className='text-red-400 text-lg'>*</span>
						</label>
						<input
							type="text"
							name="destination"
							value={formData.destination}
							onChange={handleChange}
							placeholder='Enter your Destination (eg: Ahmedabad, Delhi, etc.)'
							required
						/>
					</div>

					<div className="form-row">
						<div className="form-group">
							<label>
								<FaCalendarAlt className="form-icon" />
								Start Date <span className='text-red-400 text-lg'>*</span>
							</label>
							<input
								type="date"
								name="startDate"
								value={formData.startDate}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="form-group">
							<label>
								<FaCalendarAlt className="form-icon" />
								End Date <span className='text-red-400 text-lg'>*</span>
							</label>
							<input
								type="date"
								name="endDate"
								value={formData.endDate}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div>
						<button type="button" className="flex items-center gap-1 text-sm !bg-blue-500 rounded-xl !p-1.5 text-white !font-semibold" onClick={toggleTransport}>
							{showTransport ? (
								<>
									<FaChevronUp /> Hide Transport Details
								</>
							) : (
								<>
									<CiCirclePlus /> Add Transport Details
								</>
							)}
						</button>
					</div>

					{showTransport && (
						<div className="signup-form">
							<span className="flex items-center gap-1 justify-center text-xl font-semibold">
								<FaPlane className='text-blue-500' /> Transport Details
							</span>

							<div className="form-row">
								<div className="form-group">
									<label>
										<FaPaperPlane className="form-icon" />
										Mode
									</label>
									<select
										name="transport.mode"
										value={formData.transport.mode}
										onChange={handleChange}
									>
										<option value="" className='text-gray-500'>Select a mode of Transport</option>
										<option value="Flight">Flight</option>
										<option value="Train">Train</option>
										<option value="Bus">Bus</option>
										<option value="Car">Car</option>
									</select>
								</div>

								<div className="form-group">
									<label>
										<FaLocationDot className="form-icon" />
										Destination
									</label>
									<input
										type="text"
										name="transport.name"
										value={formData.transport.name}
										onChange={handleChange}
										placeholder='(eg: Ahmedabad, Delhi, etc.)'
									/>
								</div>
							</div>

							<div className="form-group">
								<label>
									<FaUmbrellaBeach className="form-icon" />
									Transport Name
								</label>
								<input
									type="text"
									name="transport.name"
									value={formData.transport.name}
									onChange={handleChange}
									placeholder='Enter your Transport name (eg: Indigo (AMD-KOL)'
								/>
							</div>

							<div className="form-group">
								<label>
									<MdFlightTakeoff className="form-icon" />
									Pickup Location
								</label>
								<input
									type="text"
									name="transport.pickup"
									value={formData.transport.pickup}
									onChange={handleChange}
									placeholder='Enter your Pickup location (eg: Howrah Station, Howrah)'
								/>
							</div>

							<div className="form-row">
								<div className="form-group">
									<label>
										<FaClock className="form-icon" /> Departure
									</label>
									<input
										type="datetime-local"
										name="transport.departure"
										value={formData.transport.departure}
										onChange={handleChange}
									/>
								</div>
								<div className="form-group">
									<label>
										<FaClock className="form-icon" /> Arrival
									</label>
									<input
										type="datetime-local"
										name="transport.arrival"
										value={formData.transport.arrival}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className="form-group">
								<label>
									<FaQrcode className="form-icon" />
									PNR/Booking Reference
								</label>
								<input
									type="text"
									name="transport.PNR"
									value={formData.transport.PNR}
									onChange={handleChange}
									placeholder='Enter PNR no. or Booking Reference (if applicable)'
								/>
							</div>
						</div>
					)}

					<button
						type="submit"
						className="btn-signup !items-center !justify-center !flex !font-bold !text-lg"
						disabled={loading}
					>
						{loading ? <Spinner /> : "Create Account"}
					</button>
				</form>
			</div >
		</div >
	);
};

export default CreateGroup;