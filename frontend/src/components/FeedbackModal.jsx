import { FaStar } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import Spinner from "./Spinner";

const FeedbackModal = ({ isOpen, onClose, onSubmit, review, setReview, memberName, posting }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-50">
			<div className="bg-white rounded-lg !p-6 w-full max-w-md shadow-lg flex flex-col">
				<span className="text-lg text-center font-semibold !mb-4 text-gray-800">
					Give Feedback to <span className="text-blue-600">{memberName}</span>
				</span>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit();
					}}
					className="flex flex-col gap-4 w-full items-start"
				>
					<div className="flex flex-col w-full">
						<label className="flex gap-1 items-center text-base text-gray-700 w-full">
							<FaStar className="text-yellow-500" />  Rating
						</label>
						<select
							value={review.rating}
							onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
							required
							className="!mt-1 border border-gray-300 rounded !px-2 !py-1 w-full"
						>
							<option value="">Select Rating</option>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
								<option key={val} value={val}>
									{val} {val === 1 ? "Star" : "Stars"}
								</option>
							))}
						</select>
					</div>

					<div className="flex flex-col w-full">
						<label className="flex gap-1 items-center text-base text-gray-700 w-full">
							<MdMessage className="text-blue-500" /> Message
						</label>
						<textarea
							value={review.message}
							onChange={(e) => setReview({ ...review, message: e.target.value })}
							className="border border-gray-300 rounded !px-2 !py-1 resize-none w-full"
							rows={4}
							placeholder="Your feedback..."
						/>
					</div>

					<div className="flex justify-end !gap-2 !mt-2">
						<button
							type="button"
							onClick={onClose}
							className="btn-secondary text-sm !px-8 !py-1"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="btn-primary text-sm !px-8 !py-1"
							disabled={posting}
						>
							{posting ? <Spinner /> : "Submit"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FeedbackModal;