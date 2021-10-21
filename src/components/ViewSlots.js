import React from "react";
import ShowSlots from "./ShowSlots";

import "./css/ViewSlots.css";

export default function ViewSlots({ dates, weekdays, months, user }) {
  return (
    <div className="viewSlots">
      {dates.map((date, i) => {
        let currentDate = `${date.date.slice(8, 10)} ${
          months[parseInt(date.date.slice(5, 7))]
        } ${weekdays[date.day]}`;
        return (
          <ShowSlots
            currentDate={currentDate}
            date={date}
            key={i}
            user={user}
          />
        );
      })}
    </div>
  );
}
