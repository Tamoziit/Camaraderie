import { motion } from "framer-motion"
import { TbBuildingCommunity } from "react-icons/tb"
import { IoMdImages } from "react-icons/io"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import { Link } from "react-router-dom"

const ActionCards = ({ id }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 lg:gap-6 !px-4 md:!px-0">
      <ActionCard
        title="Community"
        icon={<TbBuildingCommunity className="text-3xl !mr-1" />}
        bgGradient="from-purple-500 to-indigo-600"
        imageSrc="/community.png"
        buttonText="View Community"
        url={`/trips/community/${id}`}
      />

      <ActionCard
        title="Itinerary"
        icon={<IoMdImages className="text-3xl !mr-1" />}
        bgGradient="from-amber-500 to-orange-600"
        imageSrc="/itinerary.png"
        buttonText="Plan Itinerary"
        url={`/trips/itinerary/${id}`}
      />

      <ActionCard
        title="Budget"
        icon={<RiMoneyDollarCircleFill className="text-3xl !mr-1" />}
        bgGradient="from-emerald-500 to-green-600"
        imageSrc="/budget.png"
        buttonText="Manage Budget"
        url={`/trips/budget-splitter/${id}`}
      />
    </div>
  )
}

const ActionCard = ({ title, icon, bgGradient, imageSrc, buttonText, url }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`bg-gradient-to-br ${bgGradient} rounded-2xl overflow-hidden shadow-lg flex flex-col`}
    >
      <div className="relative h-40 md:h-32 lg:h-40 overflow-hidden">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="!px-4 !py-1 flex flex-col items-center text-white bg-gradient-to-br from-black/30 to-transparent">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-bold text-lg lg:text-xl">{title}</span>
        </div>
        <Link to={url} className="!w-full flex items-center justify-center !mt-2 text-white rounded-lg transition font-medium text-[15px]">
          {buttonText}
        </Link>
      </div>
    </motion.div>
  )
}

export default ActionCards;