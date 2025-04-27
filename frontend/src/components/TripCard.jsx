import { useNavigate } from "react-router-dom";
import "../styles/Trips.css";
import formatDate from "../utils/formatDate";

const TripCard = ({ trip, url }) => {
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;

    return (
        <div className="home-trip-card">
            <div className="trip-image">
                <img src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Bali Trip" />
                <div className="trip-date">{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</div>
            </div>
            <div className="trip-details">
                <h3 className="trip-title">📍{trip.destination}</h3>
                <p className="trip-description">
                    {trip.members?.length} members | {trip.intrinsicStrength} Intrinsic Strength
                </p>

                {trip.preferences?.length > 0 && (
                    <div className="flex flex-wrap gap-2 items-center !w-full !mb-5">
                        {trip.preferences?.map((preference, _idx) => (
                            <span className="interest-tag" key={_idx}>{preference.tag}</span>
                        ))}
                    </div>
                )}
                <div className="trip-footer">
                    <button className="trip-action-btn" onClick={() => navigate(url.replace(baseUrl, ''))}>View Details</button>
                </div>
            </div>
        </div>
    )
}

export default TripCard