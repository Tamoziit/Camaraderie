import { useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import "../../styles/Profile.css";
import { CiCirclePlus } from "react-icons/ci";
import { FaPen } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import handleImageUpload from "../../utils/uploadBlobToCloudinary";

const ProfileTab = ({ trips }) => {
	const { authUser } = useAuthContext();
	const fileInputRef = useRef(null);
	const [profilePic, setProfilePic] = useState(authUser.profilePic || "/placeholderImg.png");
	const [preferences, setPreferences] = useState(authUser.preferences || []);
	const [uploading, setUploading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newPreference, setNewPreference] = useState("");
	const { loading, update } = useUpdateProfile();

	const getWorkplace = () => {
		if (authUser.profession === "student") return authUser.institute;
		if (authUser.profession === "professional") return authUser.company;
		if (authUser.profession === "other") return authUser.otherProfession;
	};

	const handleProfilePicChange = async (e) => {
		setUploading(true);
		const file = e.target.files[0];
		if (file) {
			const blobUrl = URL.createObjectURL(file);
			console.log(blobUrl)
			const uploadedUrl = await handleImageUpload(blobUrl);
			setProfilePic(uploadedUrl);
		}
		setUploading(false);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setNewPreference("");
	};

	const handleSavePreference = () => {
		if (newPreference.trim() !== "") {
			setPreferences((prev) => [...prev, newPreference.trim()]);
			closeModal();
		}
	};

	const handleUpdateProfile = async () => {
		await update({ profilePic, preferences });
	}

	return (
		<div className="user-profile-card">
			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
					<div className="bg-gray-100 rounded-lg !p-6 w-90 flex flex-col gap-4 shadow-lg">
						<span className="text-lg font-semibold">Add New Interest</span>
						<input
							type="text"
							placeholder="Enter interest..."
							value={newPreference}
							onChange={(e) => setNewPreference(e.target.value)}
							className="border rounded-md p-2 w-full"
						/>
						<div className="flex justify-end gap-2">
							<button
								className="btn-secondary !py-1 !bg-transparent hover:!text-blue-600"
								onClick={closeModal}
							>
								Cancel
							</button>
							<button
								className="btn-primary !px-8"
								onClick={handleSavePreference}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="profile-header flex gap-6">
				<div className="flex items-center justify-center relative">
					<img
						src={profilePic}
						alt={authUser.name}
						className="w-20 h-20 rounded-full object-cover border-2 border-gray-700"
					/>

					<label
						htmlFor="profile-pic-upload"
						className="absolute bottom-0 -right-2 bg-gray-700 !p-1.5 rounded-full cursor-pointer hover:bg-gray-800 transition"
					>
						{uploading ? <Spinner /> : (
							<div>
								<FaPen className="size-3.5 text-white" />
								<input
									type="file"
									id="profile-pic-upload"
									className="hidden"
									accept="image/*"
									ref={fileInputRef}
									onChange={handleProfilePicChange}
								/>
							</div>
						)}
					</label>
				</div>

				<div className="profile-info">
					<h2 className="profile-name">{authUser.name}</h2>
					<p className="profile-bio">
						{authUser.profession} | {getWorkplace()} |{" "}
						<span className="font-semibold">{authUser.archetype}</span>
					</p>
				</div>
			</div>

			<div className="flex flex-col !-space-y-0.5 !mb-4.5">
				<div className="flex gap-1">
					<span className="text-gray-600">Email:</span>
					<span>{authUser.email}</span>
				</div>
				<div className="flex gap-1">
					<span className="text-gray-600">Mobile:</span>
					<span>{authUser.mobileNo}</span>
				</div>
				<div className="flex gap-1">
					<span className="text-gray-600">Gender:</span>
					<span>{authUser.gender}</span>
				</div>
				<div className="flex gap-1">
					<span className="text-gray-600">DOB:</span>
					<span>{authUser.dob}</span>
				</div>
				<div className="flex gap-1">
					<span className="text-gray-600">Age:</span>
					<span>{authUser.age}</span>
				</div>
			</div>

			<div className="profile-stats !justify-around">
				<div className="stat-item">
					<span className="stat-number">{trips}</span>
					<span className="stat-label">Trips</span>
				</div>
				<div className="stat-item">
					<span className="stat-number">{authUser.intrinsicStrength}</span>
					<span className="stat-label">Intrinsic Strength</span>
				</div>
			</div>

			<div className="profile-interests">
				<h3>Interests</h3>
				{preferences.length > 0 ? (
					<div className="interest-tags flex flex-wrap gap-1">
						{preferences.map((preference, idx) => (
							<span key={idx} className="interest-tag">{preference}</span>
						))}
						<button
							className="btn-secondary !flex items-center justify-center gap-0.5 text-xs !p-1 cursor-pointer"
							onClick={openModal}
						>
							Edit <CiCirclePlus className="!mt-1" />
						</button>
					</div>
				) : (
					<div>
						<button
							className="btn-secondary !flex items-center justify-center gap-0.5 text-xs !p-1 cursor-pointer"
							onClick={openModal}
						>
							Add Preferences <CiCirclePlus className="!mt-1" />
						</button>
					</div>
				)}
			</div>

			<button
				className="edit-profile-btn"
				disabled={loading || uploading}
				onClick={handleUpdateProfile}
			>
				{loading ? <Spinner /> : "Edit Profile"}
			</button>
		</div>
	);
};

export default ProfileTab;