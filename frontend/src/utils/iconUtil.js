import { FaPlane, FaTrain, FaBus, FaCar } from "react-icons/fa";
import { MdDirectionsBoat } from "react-icons/md";
import React from "react";

const getTransportIcon = (mode) => {
    switch (mode?.toLowerCase()) {
        case "flight":
            return React.createElement(FaPlane, { className: "text-blue-500" });
        case "train":
            return React.createElement(FaTrain, { className: "text-orange-500" });
        case "bus":
            return React.createElement(FaBus, { className: "text-green-500" });
        case "car":
            return React.createElement(FaCar, { className: "text-red-500" });
        case "boat":
            return React.createElement(MdDirectionsBoat, { className: "text-cyan-500" });
        default:
            return React.createElement(FaPlane, { className: "text-gray-500" });
    }
};

export default getTransportIcon;