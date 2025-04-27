import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfileTab from "../../components/home/ProfileTab";
import useGetMyTrips from "../../hooks/useGetMyTrips";

const Home = () => {
  const [greeting, setGreeting] = useState('Find Your Perfect Travel Buddy');
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const { loading, myTrips } = useGetMyTrips();
  const [trips, setTrips] = useState([]);

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
    console.log(data)
    setTrips(data);
  }

  useEffect(() => {
    getMyTrips();
  }, []);
  console.log(trips)

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
        <div className="container">
          <div className="dashboard-layout">
            <ProfileTab
              trips={trips.length}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home