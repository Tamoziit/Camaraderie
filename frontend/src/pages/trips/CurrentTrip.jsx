import { useEffect, useState } from "react";
import useGetMyCurrentTrip from "../../hooks/useGetMyCurrentTrip";

const CurrentTrip = () => {
	const [currTrip, setCurrTrip] = useState(null);
	const { loading, myCurrTrip } = useGetMyCurrentTrip();

	const fetchMyCurrTrip = async () => {
		const data = await myCurrTrip();
		setCurrTrip(data);
	}

	useEffect(() => {
		fetchMyCurrTrip();
	}, []);

	return (
		<div className="!p-4">{JSON.stringify(currTrip)}</div>
	)
}

export default CurrentTrip