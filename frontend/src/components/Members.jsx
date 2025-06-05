import { useState } from "react";
import MemberCard from "./MemberCard";

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

			<div className="w-full flex items-center justify-center !mt-4">
				<div className="!py-4 !px-10 rounded-lg bg-gray-100 !border-2 border-blue-600 shadow-lg flex justify-between gap-6 md:gap-10 items-center">
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
				{members.map((member) => (
					<MemberCard
						key={member._id}
						member={member}
						admin={admin}
						isOpen={openReviewId === member._id}
						toggleReview={toggleReview}
					/>
				))}
			</div>
		</div>
	);
};

export default Members;