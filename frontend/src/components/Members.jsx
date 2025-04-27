import { FaStar, FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const Members = ({ members, intrinsicStrength, admin }) => {
	const [openReviewId, setOpenReviewId] = useState(null);

	const toggleReview = (id) => {
		setOpenReviewId(openReviewId === id ? null : id);
	};

	return (
		<div className="!pt-3">
			<h2 className="text-2xl font-bold mb-6 !text-transparent !bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">
				Member Details
			</h2>

			<div className="h-[0.5px] bg-gray-300 !my-3" />

			<div className="flex w-full items-center justify-center">
				<div className="!py-4 !px-10 rounded-lg bg-gray-100 border-2 border-blue-600 shadow-lg flex justify-between gap-6 md:gap-10 items-center">
					<div className="flex flex-col gap-0.5 items-center justify-center">
						<span className="text-3xl font-bold text-purple-600">{members.length}</span>
						<span className="text-lg font-semibold text-gray-700">Members</span>
					</div>

					<div className="flex flex-col gap-0.5 items-center justify-center">
						<span className="text-3xl font-bold text-purple-600">{intrinsicStrength}</span>
						<span className="text-lg font-semibold text-gray-700">Intrinsic Strength</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-6 !mt-10">
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
							className="!p-2 bg-gray-100 rounded-lg shadow-md border hover:shadow-lg transition flex flex-col gap-4"
						>
							<div className="flex items-center gap-6">
								<img
									src={member.profilePic || "/placeholderImg.png"}
									alt={member.name}
									className="w-18 h-18 rounded-full object-cover object-center border"
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
									<p className="text-sm text-gray-500">{member.email}</p>
									<p className="text-sm text-gray-600 font-medium">{member.totalTrips.length} Trips</p>

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
											className={`transition-transform ${openReviewId === member._id ? "rotate-180" : ""
												}`}
										/>
									</button>
								)}
							</div>

							{openReviewId === member._id && (
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
					);
				})}
			</div>
		</div>
	);
};

export default Members;