import { FaStar, FaChevronDown } from "react-icons/fa";

const MemberCard = ({ member, admin, isOpen, toggleReview }) => {
	const averageRating =
		member.reviews.length > 0
			? (
				member.reviews.reduce((acc, review) => acc + review.rating, 0) /
				member.reviews.length
			).toFixed(1)
			: "No Rating";

	const hasMessageReviews = member.reviews.some((r) => r.message?.trim());

	const getWorkplace = (member) => {
		if (member.profession === "student") return member.institute;
		if (member.profession === "professional") return member.company;
		if (member.profession === "other") return member.otherProfession;
	};

	return (
		<div
			key={member._id}
			className="!p-2 bg-gray-100 rounded-lg shadow-md border hover:shadow-lg transition flex flex-col gap-4"
		>
			<div className="flex items-center gap-6">
				<img
					src={member.profilePic || "/placeholderImg.png"}
					alt={member.name}
					className="size-22 rounded-full object-cover object-center border"
				/>

				<div className="flex flex-col -gap-1">
					<div className="flex items-center gap-2">
						<span className="text-xl font-semibold text-gray-800">{member.name}</span>
						{member._id === admin._id && (
							<span className="!px-2 !py-0.5 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
								Admin
							</span>
						)}
					</div>

					<p className="text-base text-gray-600 font-medium">{member.archetype} | {member.intrinsicStrength} Instrinsic Strength</p>
					<p className="text-base text-gray-500">{member.email} | {member.gender} | {member.profession} | {getWorkplace(member)}</p>
					<p className="text-base text-gray-600 font-medium">{member.totalTrips.length} Trips</p>

					<div className="flex items-center gap-1">
						<FaStar className="text-yellow-400" />
						<span className="text-sm text-gray-600">{averageRating}</span>
					</div>
				</div>

				{hasMessageReviews && (
					<button
						onClick={() => toggleReview(member._id)}
						className="ml-auto flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
					>
						Reviews
						<FaChevronDown
							className={`transition-transform ${isOpen ? "rotate-180" : ""
								}`}
						/>
					</button>
				)}
			</div>

			{isOpen && (
				<div className="!mt-2 border-t border-gray-400 !pt-2">
					{member.reviews
						.filter((review) => review.message?.trim())
						.map((review, idx) => (
							<div
								key={idx}
								className="!p-2 !mb-2"
							>
								<p className="text-sm text-gray-700">{review.message}</p>
								<div className="flex items-center gap-1 text-yellow-500 text-sm">
									<FaStar /> {review.rating}
								</div>
							</div>
						))}
				</div>
			)}
		</div>
	)
}

export default MemberCard;