import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileTab from "../../components/home/ProfileTab";
import useGetMyTrips from "../../hooks/useGetMyTrips";
import useGetMyCurrentTrip from "../../hooks/useGetMyCurrentTrip"
import TripCard from "../../components/TripCard";
import Spinner from "../../components/Spinner";

const Home = () => {
  const [greeting, setGreeting] = useState('Find Your Perfect Travel Buddy');
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const { loading, myTrips } = useGetMyTrips();
  const { loading: fetching, myCurrTrip } = useGetMyCurrentTrip();
  const [trips, setTrips] = useState([]);
  const [currTrip, setCurrTrip] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning! ');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good Afternoon! ');
    } else {
      setGreeting('Good Evening! ');
    }
  }, []);

  const getMyTrips = async () => {
    const data = await myTrips();
    setTrips(data);
  }

  const getMyCurrTrip = async () => {
    const data = await myCurrTrip();
    setCurrTrip(data);
  }

  useEffect(() => {
    getMyCurrTrip();
    getMyTrips();
  }, []);

  return (
    <>
      <section className="flex w-full items-center justify-between">
        <div className="flex w-full items-center justify-around !py-6 !px-6 lg:!px-12">
          <div className="flex flex-col w-1/2 gap-4">
            <span className="font-semibold text-3xl md:text-5xl lg:text-[70px] text-gray-800">{greeting} <span className="!text-transparent !bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800 md:font-bold">{authUser.name}</span></span>
            <p className="text-sm md:text-base italic">
              Connect with like-minded travelers based on shared interests, preferences,
              itineraries, and budget. Make your journey more enjoyable with the right companion.
            </p>

            <div className="flex w-full items-center gap-2 lg:gap-6">
              <button
                className="btn-primary !rounded-md !px-6"
                onClick={() => navigate("/search")}
              >
                Find Groups
              </button>
              <button
                className="btn-secondary !rounded-md !px-6 !py-1.5"
                onClick={() => navigate("/group/create-group")}
              >
                Create a Group
              </button>
            </div>
          </div>

          <div className="w-[400px] lg:w-1/2">
            <img src="/community.png" alt="Travel illustration" className="w-full" />
          </div>
        </div>
      </section>

      <section className="user-dashboard">
        <div className="container flex flex-col md:flex-row !justify-between gap-10 lg:gap-20">
          <div>
            <ProfileTab
              trips={trips.length}
            />
          </div>

          <div className="flex flex-col space-y-5 !w-full">
            <div className="flex flex-col !space-y-3 !w-full lg:!w-[70%]">
              <span className="text-2xl font-semibold text-gray-700">Current Trip</span>
              {fetching ? (
                <Spinner />
              ) : (
                currTrip ? (
                  <TripCard
                    trip={currTrip}
                    url={`${baseUrl}/trips/current-trip`}
                  />
                ) : (
                  <div>
                    <p className="text-gray-500">No current trips available</p>
                  </div>
                )
              )}
            </div>

          </div>
        </div>
      </section>

      <div className="flex w-full !px-9 lg:!px-20 flex-col !-mt-10 !space-y-3 bg-gray-50">
        <span className="text-2xl font-semibold text-gray-700">Previous Trips</span>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 !w-full !mb-10 bg-gray-50">
            {trips.filter((trip) => trip._id !== currTrip?._id).length === 0 ? (
              <p className="text-gray-500">No trips available</p>
            ) : (
              trips
                .filter((trip) => trip._id !== currTrip?._id)
                .map((trip, _idx) => (
                  <TripCard
                    key={_idx}
                    trip={trip}
                    url={`${baseUrl}/trips/my-trips/${trip._id}`}
                  />
                ))
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Home