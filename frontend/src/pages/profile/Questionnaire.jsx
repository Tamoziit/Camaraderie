import { useState } from "react";
import { FaMapMarkedAlt, FaCalendarAlt, FaMountain, FaLandmark, FaPlus, FaTrash, FaCheck } from "react-icons/fa";
import { destinationOptions, dislikeOptions, likeOptions, paceOptions } from "../../constants/constants";
import useGetArchetype from "../../hooks/useGetArchetype";
import Spinner from "../../components/Spinner";
import Archetype from "../../components/Archetype";

const Questionnaire = () => {
	const [formData, setFormData] = useState({
		likes: [],
		dislikes: [],
		travelPreferences: {
			destinations: [],
			groupSize: 2,
			pace: "planned",
		},
		canTolerate: [],
		cannotTolerate: []
	});
	const [newTolerate, setNewTolerate] = useState("");
	const [newCannotTolerate, setNewCannotTolerate] = useState("");
	const { loading, getArchetype } = useGetArchetype();
	const [message, setMessage] = useState("");
	const [archetype, setArchetype] = useState("");

	const handleMultiSelect = (field, value) => {
		setFormData((prev) => {
			if (prev[field].includes(value)) {
				return {
					...prev,
					[field]: prev[field].filter((item) => item !== value),
				}
			} else {
				return {
					...prev,
					[field]: [...prev[field], value],
				}
			}
		})
	}

	const handleDestinationSelect = (value) => {
		setFormData((prev) => {
			if (prev.travelPreferences.destinations.includes(value)) {
				return {
					...prev,
					travelPreferences: {
						...prev.travelPreferences,
						destinations: prev.travelPreferences.destinations.filter((item) => item !== value),
					},
				}
			} else {
				return {
					...prev,
					travelPreferences: {
						...prev.travelPreferences,
						destinations: [...prev.travelPreferences.destinations, value],
					},
				}
			}
		})
	}

	const addTolerate = () => {
		if (newTolerate.trim()) {
			setFormData((prev) => ({
				...prev,
				canTolerate: [...prev.canTolerate, newTolerate.trim()],
			}))
			setNewTolerate("")
		}
	}

	const addCannotTolerate = () => {
		if (newCannotTolerate.trim()) {
			setFormData((prev) => ({
				...prev,
				cannotTolerate: [...prev.cannotTolerate, newCannotTolerate.trim()],
			}))
			setNewCannotTolerate("")
		}
	}

	const removeTolerate = (index) => {
		setFormData((prev) => ({
			...prev,
			canTolerate: prev.canTolerate.filter((_, i) => i !== index),
		}))
	}

	const removeCannotTolerate = (index) => {
		setFormData((prev) => ({
			...prev,
			cannotTolerate: prev.cannotTolerate.filter((_, i) => i !== index),
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const data = await getArchetype(formData);
		setMessage(data.message);
		setArchetype(data.archetype);
	}

	return (
		<div className="flex w-full items-center justify-center">
			{!message && !archetype ? (
				<div className="!max-w-4xl !m-6 !p-6 bg-white rounded-lg shadow-xl">
					<form onSubmit={handleSubmit} className="!space-y-8">
						<div className="!text-center !mb-8">
							<h1 className="text-3xl font-bold text-transparent !bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800 !pb-2">Travel Personality Questionnaire</h1>
							<p className="text-gray-600 !mt-1 text-lg">Tell us about your travel preferences</p>
						</div>

						<div className="bg-gray-100 !p-6 rounded-lg">
							<div className="flex items-center !mb-4">
								<FaMapMarkedAlt className="text-emerald-600 text-xl !mr-2" />
								<span className="text-2xl font-semibold text-gray-700">What draws you to travel?</span>
							</div>
							<p className="text-gray-600 !mb-4">Select the experiences that resonate most deeply with your soul:</p>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								{likeOptions.map((option) => (
									<div
										key={option}
										onClick={() => handleMultiSelect("likes", option)}
										className={`!p-3 rounded-lg cursor-pointer transition-all ${formData.likes.includes(option)
											? "bg-emerald-100 border-2 border-emerald-500"
											: "bg-white border border-gray-200 hover:border-emerald-300"
											}`}
									>
										<div className="flex items-center">
											{formData.likes.includes(option) && <FaCheck className="text-emerald-500 !mr-2" />}
											<span>{option}</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="bg-gray-100 !p-6 rounded-lg">
							<div className="flex items-center !mb-4">
								<FaCalendarAlt className="text-rose-600 text-xl !mr-2" />
								<span className="text-2xl font-semibold text-gray-700">What elements of travel challenge your spirit?</span>
							</div>
							<p className="text-gray-600 !mb-4">Select the aspects that create disharmony in your journey:</p>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								{dislikeOptions.map((option) => (
									<div
										key={option}
										onClick={() => handleMultiSelect("dislikes", option)}
										className={`!p-3 rounded-lg cursor-pointer transition-all ${formData.dislikes.includes(option)
											? "bg-rose-100 border-2 border-rose-500"
											: "bg-white border border-gray-200 hover:border-rose-300"
											}`}
									>
										<div className="flex items-center">
											{formData.dislikes.includes(option) && <FaCheck className="text-rose-500 !mr-2" />}
											<span>{option}</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="bg-gray-100 !p-6 rounded-lg">
							<div className="flex items-center !mb-4">
								<FaLandmark className="text-blue-600 text-xl !mr-2" />
								<span className="text-2xl font-semibold text-gray-700">Where does your soul find resonance?</span>
							</div>

							<div className="!space-y-6">
								<div>
									<p className="text-gray-600 !mb-3">Select destinations that call to your inner self:</p>
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
										{destinationOptions.map((option) => (
											<div
												key={option}
												onClick={() => handleDestinationSelect(option)}
												className={`!p-3 rounded-lg cursor-pointer transition-all ${formData.travelPreferences.destinations.includes(option)
													? "bg-blue-100 border-2 border-blue-500"
													: "bg-white border border-gray-200 hover:border-blue-300"
													}`}
											>
												<div className="flex items-center">
													{formData.travelPreferences.destinations.includes(option) && (
														<FaCheck className="text-blue-500 !mr-2" />
													)}
													<span>{option}</span>
												</div>
											</div>
										))}
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 !gap-6">
									<div>
										<p className="text-gray-600 !mb-3">What community size nurtures your journey?</p>
										<select
											className="w-full !p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											value={formData.travelPreferences.groupSize}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													travelPreferences: {
														...prev.travelPreferences,
														groupSize: Number.parseInt(e.target.value),
													},
												}))
											}
										>
											<option value={1}>Solo (1 person)</option>
											<option value={2}>Intimate (2 people)</option>
											<option value={3}>Small group (3-4 people)</option>
											<option value={5}>Medium group (5-8 people)</option>
											<option value={10}>Large group (9+ people)</option>
										</select>
									</div>

									<div>
										<p className="text-gray-600 !mb-3">At what rhythm does your spirit move through the world?</p>
										<select
											className="w-full !p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											value={formData.travelPreferences.pace}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													travelPreferences: {
														...prev.travelPreferences,
														pace: e.target.value,
													},
												}))
											}
										>
											{paceOptions.map((pace) => (
												<option key={pace} value={pace}>
													{pace.charAt(0).toUpperCase() + pace.slice(1)}
												</option>
											))}
										</select>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-gray-100 !p-6 rounded-lg">
							<div className="flex items-center !mb-4">
								<FaMountain className="text-purple-600 text-xl !mr-2" />
								<span className="text-2xl font-semibold text-gray-700">
									What challenges can your spirit embrace or must avoid?
								</span>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<p className="text-gray-600 !mb-3">What travel challenges can you accept with grace?</p>
									<div className="flex items-center !mb-3">
										<input
											type="text"
											value={newTolerate}
											onChange={(e) => setNewTolerate(e.target.value)}
											className="flex-grow !p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
											placeholder="e.g., minor delays"
										/>
										<button
											type="button"
											onClick={addTolerate}
											className="!bg-purple-600 text-white !p-3 rounded-r-lg hover:!bg-purple-700"
										>
											<FaPlus />
										</button>
									</div>
									<div className="!space-y-2">
										{formData.canTolerate.map((item, index) => (
											<div key={index} className="flex items-center justify-between bg-purple-50 !p-3 rounded-lg">
												<span>{item}</span>
												<button
													type="button"
													onClick={() => removeTolerate(index)}
													className="text-red-500 hover:text-red-700"
												>
													<FaTrash />
												</button>
											</div>
										))}
									</div>
								</div>

								<div>
									<p className="text-gray-600 !mb-3">What travel elements disrupt your inner harmony?</p>
									<div className="flex items-center !mb-3">
										<input
											type="text"
											value={newCannotTolerate}
											onChange={(e) => setNewCannotTolerate(e.target.value)}
											className="flex-grow !p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
											placeholder="e.g., tight schedules without buffer"
										/>
										<button
											type="button"
											onClick={addCannotTolerate}
											className="!bg-purple-600 text-white !p-3 rounded-r-lg hover:!bg-purple-700"
										>
											<FaPlus />
										</button>
									</div>
									<div className="!space-y-2">
										{formData.cannotTolerate.map((item, index) => (
											<div key={index} className="flex items-center justify-between bg-red-50 !p-3 rounded-lg">
												<span>{item}</span>
												<button
													type="button"
													onClick={() => removeCannotTolerate(index)}
													className="text-red-500 hover:text-red-700"
												>
													<FaTrash />
												</button>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						<div className="text-center flex w-full items-center justify-center">
							<button
								type="submit"
								className="btn-primary !rounded-lg flex w-[80%] !py-3"
								disabled={loading}
							>
								{loading ? <Spinner /> : "Discover Your Archetype"}
							</button>
						</div>
					</form>
				</div>
			) : (
				<Archetype
					archetype={archetype}
					message={message}
				/>
			)}
		</div>
	)
}

export default Questionnaire;