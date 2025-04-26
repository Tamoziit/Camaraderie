import { motion } from "framer-motion"
import { FaUser } from "react-icons/fa"

const MembersTab = ({ members, adminId }) => {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 overflow-hidden">
			<span className="text-lg font-semibold">Trip Members ({members.length})</span>
			{members && members.length > 0 ? (
				members.map((member) => (
					<motion.div
						key={member._id}
						whileHover={{ scale: 1.02 }}
						className="flex gap-2 items-center !py-3 !px-1 bg-gray-50 hover:bg-gray-200 rounded-lg cursor-pointer !mr-4"
					>
						<div className="bg-blue-100 !p-2 rounded-full mr-3">
							{member.profilePic ? (
								<img src={member.profilePic} alt={member.name} />
							) : (
								<FaUser className="text-blue-500" />
							)}
						</div>
						<div className="flex flex-col">
							<div className="flex gap-2 items-center">
								<p className="font-medium !text-sm">{member.name}</p>
								{member._id === adminId && (
									<span className="bg-blue-100 text-blue-800 text-[11px] px-2 py-1 rounded-full">Admin</span>
								)}
							</div>
							<p className="text-xs text-gray-500 break-words">{member.email}</p>
						</div>
					</motion.div>
				))
			) : (
				<div className="text-center py-8 bg-gray-50 rounded-lg">
					<div className="text-4xl text-gray-300 mb-2 flex justify-center">
						<FaUser />
					</div>
					<p className="text-gray-500">No members found</p>
				</div>
			)}
		</motion.div>
	)
}

export default MembersTab;