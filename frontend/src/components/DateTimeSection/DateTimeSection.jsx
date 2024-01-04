import "./DateTimeSection.css";
import { useState, useEffect } from "react";

const DateTimeSection = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  return (
    <div className="datetime-container">
      <p className="date-text">
        {date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="time-text">
        {date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
    </div>
  );
};

export default DateTimeSection;
