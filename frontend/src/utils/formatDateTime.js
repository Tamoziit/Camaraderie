const getMonthName = (month) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months[Number.parseInt(month) - 1]
}

const formatTime = (timeString) => {
    if (!timeString) return ""

    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12

    return `${hour12}:${minutes} ${ampm}`
}

const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return { date: "", time: "" }

    const [datePart, timePart] = dateTimeString.split("/")
    const [day, month, year] = datePart.split("-")

    const date = `${day} ${getMonthName(month)} ${year}`
    const time = formatTime(timePart)

    return { date, time }
}

export default formatDateTime;