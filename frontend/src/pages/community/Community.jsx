import { useParams } from "react-router-dom";
import useFetchCommunity from "../../hooks/useFetchCommunity";
import { useEffect, useState } from "react";
import useGetTripById from "../../hooks/useGetTripById";
import Spinner from "../../components/Spinner";
import formatDate from "../../utils/formatDate";
import { useAuthContext } from "../../context/AuthContext";
import { FaPaperPlane } from "react-icons/fa6";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "../../context/SocketContext";
import TripHeader from "../../components/TripHeader";

const Community = () => {
	const { id } = useParams();
	const { socket } = useSocketContext();
	const { loading, fetchCommunity } = useFetchCommunity();
	const [community, setCommunity] = useState(null);
	const [trip, setTrip] = useState(null);
	const { loading: fetching, getTrip } = useGetTripById();
	const [newMessage, setNewMessage] = useState("");
	const { authUser } = useAuthContext();
	const { loading: sending, sendMessage } = useSendMessage();

	const getCommunity = async () => {
		const data = await fetchCommunity(id);
		setCommunity(data);
	}

	const fetchTrip = async () => {
		const data = await getTrip(id);
		setTrip(data);
	}

	useEffect(() => {
		getCommunity();
		fetchTrip();
	}, []);

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			setCommunity(prev => ({
				...prev,
				chats: [...prev.chats, newMessage],
			}));
		});

		return () => socket?.off("newMessage");
	}, [socket, community, setCommunity]);

	const handleSendMessage = async () => {
		if (!newMessage.trim()) return;

		const data = await sendMessage({
			id,
			message: newMessage
		});

		setCommunity(prev => ({
			...prev,
			chats: [...prev.chats, data],
		}));

		setNewMessage("");
	};

	if (!trip || !community || loading || fetching) return <Spinner />;

	return (
		<div className="flex w-full h-[100vh]">
			<div className="flex flex-col w-full !m-3 rounded-lg overflow-hidden border border-blue-600 shadow-lg !z-20">
				<TripHeader
					destination={trip.destination}
					startDate={trip.startDate}
					endDate={trip.endDate}
					members={trip.members.length}
					intrinsicStrength={trip.intrinsicStrength}
				/>

				<div className="flex flex-1 overflow-hidden">
					{/* Members List */}
					<div className="w-1/4 border-r border-blue-600 !p-4 overflow-y-auto">
						<span className="text-lg font-semibold !mb-4">Members</span>
						<ul className="!space-y-3">
							{community.members.map(member => (
								<li key={member._id} className="flex items-center !gap-3">
									<img
										src={member.profilePic || "/placeholderImg.png"}
										alt={member.name}
										className="size-8 rounded-full object-cover"
									/>
									<span className="text-gray-800 text-sm hidden md:block">{member.name}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Chat Area */}
					<div className="w-3/4 flex flex-col">
						<div className="flex-1 !p-4 overflow-y-auto !space-y-4 bg-gray-50">
							{community.chats.length === 0 ? (
								<p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
							) : (
								community.chats.map((chat, index) => {
									const isMe = chat.sender?._id === authUser._id;
									return (
										<div
											key={index}
											className={`flex ${isMe ? "justify-end" : "justify-start"}`}
										>
											<div className={`flex items-end gap-2 max-w-[70%] ${isMe ? "flex-row-reverse" : ""}`}>
												<img
													src={chat.sender?.profilePic || "/placeholderImg.png"}
													alt={chat.sender?.name || "User"}
													className="size-8 rounded-full object-cover"
												/>
												<div className={`!p-3 rounded-lg ${isMe ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}>
													<p className="text-sm font-semibold">{chat.sender?.name}</p>
													<p className="text-sm">{chat.message}</p>
												</div>
											</div>
										</div>
									);
								})
							)}
						</div>

						{/* Message Input */}
						<div className="!p-3 flex items-center gap-2 border-t border-blue-600">
							<input
								type="text"
								className="flex-1 border rounded-lg"
								placeholder="Type a message..."
								value={newMessage}
								onChange={(e) => setNewMessage(e.target.value)}
							/>
							<button
								onClick={handleSendMessage}
								className="!bg-blue-500 hover:!bg-blue-600 text-white !px-4 !py-3 rounded-md"
								disabled={sending}
							>
								{sending ? <Spinner /> : <FaPaperPlane className="text-2xl" />}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Community;