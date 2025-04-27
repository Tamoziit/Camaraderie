import { useEffect, useState } from "react"
import { FaCalendarAlt, FaPaperPlane, FaUmbrellaBeach } from "react-icons/fa";
import { FaLocationDot, FaMagnifyingGlass } from "react-icons/fa6";
import useGetSearch from "../../hooks/useGetSearch";
import SuggestedTripCard from "../../components/SuggestedTripCard";
import Spinner from "../../components/Spinner";
import useGetSuggestions from "../../hooks/useGetSuggestions";

const Search = () => {
	const [formData, setFormData] = useState({
		destination: '',
		startDate: '',
		endDate: '',
		transport: {
			mode: '',
			name: ''
		}
	});
	const [suggestedGroups, setSuggestedGroups] = useState([]);
	const { loading, search } = useGetSearch();
	const { loading: fetching, suggestions } = useGetSuggestions();

	const fetchSuggestions = async () => {
		const data = await suggestions();
		setSuggestedGroups(data);
	}

	useEffect(() => {
		fetchSuggestions();
	}, []);

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await search(formData);
		setSuggestedGroups(data);
	}

	return (
		<div>
			<div className="!px-6 !py-4 bg-gray-100 rounded-lg shadow-lg !m-4">
				<span className="text-xl font-semibold !text-transparent !bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">Search for Compatible Travel Groups</span>

				<form onSubmit={handleSubmit}>
					<div className="flex flex-col md:flex-row !w-full justify-center items-center gap-4 !mt-5">
						<div className="form-group !w-full">
							<label htmlFor="destination">
								<FaLocationDot className="form-icon" />
								Destination<span className='text-red-400 text-lg'>*</span>
							</label>
							<input
								type="text"
								id="destination"
								name="destination"
								value={formData.destination}
								onChange={handleChange}
								placeholder="Enter destination"
							/>
						</div>

						<div className="form-group !w-full">
							<label htmlFor="startDate">
								<FaCalendarAlt className="form-icon" />
								Start Date<span className='text-red-400 text-lg'>*</span>
							</label>
							<input
								type="date"
								id="startDate"
								name="startDate"
								value={formData.startDate}
								onChange={handleChange}
								placeholder="Enter start date"
							/>
						</div>

						<div className="form-group !w-full">
							<label htmlFor="endDate">
								<FaCalendarAlt className="form-icon" />
								End Date<span className='text-red-400 text-lg'>*</span>
							</label>
							<input
								type="date"
								id="endDate"
								name="endDate"
								value={formData.endDate}
								onChange={handleChange}
								placeholder="Enter end date"
							/>
						</div>
					</div>

					<div className="flex flex-col md:flex-row !w-full justify-center items-center gap-4 !mt-5">
						<div className="form-group !w-full">
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

						<div className="form-group !w-full">
							<label>
								<FaUmbrellaBeach className="form-icon" />
								Transport Name
							</label>
							<input
								type="text"
								name="transport.name"
								value={formData.transport.name}
								onChange={handleChange}
								placeholder='eg: Indigo (AMD-KOL)'
							/>
						</div>
					</div>

					<button
						className="btn-primary !mt-5 text-lg !rounded-lg !px-10"
						type="submit"
						disabled={loading}
					>
						{loading ? <Spinner /> : <span className="!flex items-center justify-center gap-2">Explore <FaMagnifyingGlass /></span>}
					</button>
				</form>
			</div>

			<div className="!p-6">
				<span className="text-2xl font-bold text-gray-700">Suggested Groups</span>
				<div className="h-[0.7px] bg-gray-300 !mt-4" />

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 !mt-6">
					{suggestedGroups?.length > 0 ? (
						suggestedGroups?.map((suggestedGroup, _idx) => (
							<SuggestedTripCard
								key={_idx}
								trip={suggestedGroup}
							/>
						))
					) : (
						<span className="text-gray-500 italic !mt-5">No Search Results matches your requirements</span>
					)}
				</div>
			</div>
		</div>
	)
}

export default Search;