import { useEffect, useState } from "react";
import useGetMembers from "../../hooks/useGetMembers";
import { useParams } from "react-router-dom";
import useGetTripById from "../../hooks/useGetTripById";
import { FaChevronDown, FaStar, FaUsers } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import { useAuthContext } from "../../context/AuthContext";
import FeedbackModal from "../../components/FeedbackModal";
import usePostReview from "../../hooks/usePostReview";

const MembersPage = () => {
	const { id } = useParams();
	const [members, setMembers] = useState([]);
	const { loading, getMembers } = useGetMembers();
	const [openReviewId, setOpenReviewId] = useState(null);
	const [trip, setTrip] = useState(null);
	const { loading: fetching, getTrip } = useGetTripById();
	const { authUser } = useAuthContext();
	const [review, setReview] = useState({
		rating: "",
		message: ""
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedMember, setSelectedMember] = useState(null);
	const { laoding: posting, postReview } = usePostReview();

	const toggleReview = (id) => {
		setOpenReviewId(openReviewId === id ? null : id);
	};

	const getWorkplace = (member) => {
		if (member.profession === "student") return member.institute;
		if (member.profession === "professional") return member.company;
		if (member.profession === "other") return member.otherProfession;
	}

	const fetchMembers = async () => {
		const data = await getMembers(id);
		setMembers(data);
	}

	const fetchTrip = async () => {
		const data = await getTrip(id);
		setTrip(data);
	}

	const openFeedbackModal = (member) => {
		setSelectedMember(member);
		setReview({ rating: "", message: "" });
		setIsModalOpen(true);
	}

	useEffect(() => {
		fetchTrip();
		fetchMembers();
	}, []);

	const handleFeedbackSubmit = async () => {
		await postReview({
			rating: review.rating,
			message: review.message,
			id: selectedMember._id
		});
		setIsModalOpen(false);
	}

	if (loading || fetching) {
		return (
			<div className="flex items-center justify-center h-[80vh]">
				<Spinner />
			</div>
		)
	}

	console.log(trip)

	return (
		<div className="flex flex-col items-center justify-center w-full !p-4">
			<span className="text-4xl font-bold !text-transparent !bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 !mb-4">Explore Members</span>
			<div className="h-[0.5px] !bg-gray-400 !mb-4 !z-10 w-full" />

			<div className="w-full !px-5">
				<span className="font-semibold text-lg text-gray-700">Group Preferences</span>
				<div className="flex flex-wrap gap-2 items-center !w-full !mb-7 !mt-1">
					{trip?.preferences?.map((preference, _idx) => (
						<span className="interest-tag" key={_idx}>{preference?.tag}  × {preference?.frequency}</span>
					))}
				</div>
			</div>

			{members.length > 0 && trip ? (
				<div className="flex flex-col w-full gap-3">
					{members.map((member) => {
						const averageRating =
							member.reviews.length > 0
								? (
									member.reviews.reduce((acc, review) => acc + review.rating, 0) /
									member.reviews.length
								).toFixed(1)
								: "No Rating";

						const hasMessageReviews = member.reviews.some((r) => r.message?.trim());

						return (
							<div
								key={member._id}
								className="!p-2 bg-gray-100 rounded-lg shadow-md border hover:shadow-lg transition flex flex-col gap-4 w-full"
							>
								<div className="flex items-center gap-4">
									<img
										src={member.profilePic || "/placeholderImg.png"}
										alt={member.name}
										className="size-22 rounded-full object-cover object-center border"
									/>

									<div className="flex flex-col -gap-1">
										<div className="flex items-center gap-2">
											<span className="text-xl font-semibold text-gray-800">{member.name}</span>
											{member._id === trip.admin._id && (
												<span className="!px-2 !py-0.5 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
													Admin
												</span>
											)}
											{member._id === authUser._id && (
												<span className="!px-2 !py-0.5 text-xs font-semibold text-white bg-purple-600 rounded-full">
													You
												</span>
											)}
										</div>

										<p className="text-base text-gray-600 font-medium break-words whitespace-normal">
											{member.archetype} | {member.intrinsicStrength} Intrinsic Strength
										</p>
										<p className="text-base text-gray-500 break-words whitespace-normal">
											{member.email} | {member.gender} | {member.profession} | {getWorkplace(member)}
										</p>
										<p className="text-base text-gray-600 font-medium break-words whitespace-normal">
											{member.totalTrips.length} Trips
										</p>


										<div className="flex items-center gap-1">
											<FaStar className="text-yellow-400" />
											<span className="text-sm text-gray-600">{averageRating}</span>
										</div>
									</div>

								</div>
								{hasMessageReviews && (
									<button
										onClick={() => toggleReview(member._id)}
										className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium !ml-26"
									>
										Reviews
										<FaChevronDown
											className={`transition-transform ${openReviewId === member._id ? "rotate-180" : ""
												}`}
										/>
									</button>
								)}

								{openReviewId === member._id && (
									<div className="!mt-2 border-t border-gray-400 !pt-2">
										{member.reviews
											.map((review, idx) => (
												<div
													key={idx}
													className="!p-2 !mb-2"
												>
													{review.message && (<p className="text-sm text-gray-700">{review.message}</p>)}
													<div className="flex items-center gap-1 text-yellow-500 text-sm">
														<FaStar /> {review.rating}
													</div>
												</div>
											))}
									</div>
								)}

								{member._id !== authUser._id && (
									<>
										<div className="w-full flex items-center justify-center !mb-1.5">
											<button
												onClick={() => openFeedbackModal(member)}
												className="btn-secondary !p-1 text-[13px]"
											>
												Give Feedback
											</button>
										</div>

										<FeedbackModal
											isOpen={isModalOpen}
											onClose={() => setIsModalOpen(false)}
											onSubmit={handleFeedbackSubmit}
											review={review}
											setReview={setReview}
											memberName={selectedMember?.name}
											loading={posting}
										/>
									</>
								)}
							</div>
						);
					})}
				</div>
			) : (
				<div className="w-full flex items-center justify-center flex-col">
					<FaUsers className="text-6xl text-gray-300" />
					<span className="italic text-gray-500">No members present yet</span>
				</div>
			)}
		</div>
	)
}

export default MembersPage;