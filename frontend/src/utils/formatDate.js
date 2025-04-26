import { format } from "date-fns"

const formatDate = (dateString) => {
    try {
        return format(new Date(dateString), "MMM dd, yyyy")
    } catch (error) {
        return dateString
    }
}

export default formatDate;