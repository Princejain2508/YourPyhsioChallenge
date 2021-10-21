import React from "react";
import CreateSlot from "./CreateSlot";

import "./css/AddSlot.css";


export default function AddSlot({ dates, weekdays, months, user }) {
  
  return (
    <div className="addSlot">
      {dates.map((date, i) => {
        let currentDate = `${date.date.slice(8, 10)} ${
          months[parseInt(date.date.slice(5, 7))]
        } ${weekdays[date.day]}`;
        return (
          <CreateSlot
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
