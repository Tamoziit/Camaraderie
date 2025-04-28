import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Archetype = ({ archetype, message }) => {
	return (
		<div className="!py-6 !px-16 flex !w-full items-center justify-center flex-col !space-y-6">
			<img src="/community.png" alt="archetype" className="w-[450px] lg:w-[550px]" />
			<span className="text-4xl lg:text-6xl font-bold text-transparent !bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800 text-center">{archetype}</span>
			<span className="text-lg md:text-xl text-center font-medium italic text-gray-700">{message}</span>

			<Link to="/home" className="!flex items-center justify-center gap-2 btn-secondary !px-10">Continue to Home <FaHome /></Link>
		</div>
	)
}

export default Archetype;