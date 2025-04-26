import { motion } from "framer-motion"
import { BsCalendarRange } from "react-icons/bs"
import formatDate from "../../utils/formatDate"

const TripHeader = ({ destination, startDate, endDate }) => {
  return (
    <div className="relative h-45 md:h-64 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/85 z-10"></div>
      <img
        src="/HeaderImg.png"
        alt={destination}
        className="w-full object-cover object-center"
      />
      <div className="absolute bottom-0 left-0 !p-6 !z-20 w-full flex flex-col gap-3">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="!text-6xl md:!text-[85px] font-bold text-white mb-2"
        >
          {destination}
        </motion.h1>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-1 text-white text-lg"
        >
          <BsCalendarRange className="mr-2" />
          <span>
            {formatDate(startDate)} - {formatDate(endDate)}
          </span>
        </motion.div>
      </div>
    </div>
  )
}

export default TripHeader;