import React, { useState, useEffect } from "react";

const IntervalString = () => {
  const statuses = [".", "..", "..."];
  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentStateIndex((prevIndex) => (prevIndex + 1) % statuses.length);
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>{statuses[currentStateIndex]}</div>;
};

export default IntervalString;
