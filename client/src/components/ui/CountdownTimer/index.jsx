import React, { useEffect, useState } from "react";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

const CountdownTimer = () => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Helper function to calculate remaining time
  function getRemainingTime() {
    const now = new Date();
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    ); // 23:59:59.999
    const diffMs = endOfDay - now;

    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    return { hours, minutes, seconds };
  }

  return (
    <div className="flex items-center space-x-2 bg-white p-2 px-5 rounded-full shadow-md ">
      <div className="w-8 h-8  text-white rounded-full flex items-center justify-center">
      <MdOutlineAccessTimeFilled className="text-5xl  text-red-500 rounded-full" />
      </div>
      <p className="text-gray-700 font-medium text-lg">
        Ends in: {remainingTime.hours.toString().padStart(2, "0")}:
        {remainingTime.minutes.toString().padStart(2, "0")}:
        {remainingTime.seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
};

export default CountdownTimer;
