import React, { useEffect, useState } from "react";
import AddSlot from "./AddSlot";
import ViewSlots from "./ViewSlots";
import Moment from "moment";
import "./css/Home.css";
import Header from "./Header";

export default function Home({ user }) {
  const [dates, setDates] = useState([]);
  const [weekdays, setWeekDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [toggleFlag, setToggleFlag] = useState(true);
  useEffect(() => {
    let startDate = Moment();
    let endDate = Moment().add(7, "d");
    const week = startDate._locale._weekdaysShort;
    const month = startDate._locale._monthsShort;
    let listOfdate = [];
    while (startDate.isBefore(endDate, "day")) {
      let date = startDate.format().slice(0, 10);
      let day = startDate._d.getDay();
      listOfdate.push({ date, day });
      startDate = startDate.add(1, "d");
    }
    setDates(listOfdate);
    setWeekDays(week);
    setMonths(month);
  }, []);
  const flagViewSlot = () => {
    if (!user) {
      alert("Please Login First");
    } else {
      setToggleFlag(false);
    }
  };
  console.log(toggleFlag);
  return (
    <div className="home">
      <Header user={user} />
      <div className="home__container">
        <div className="home__toggleContainer">
          <div className="home__toogle">
            <div
              className={`home__toggleToAddSlot ${
                toggleFlag ? "selected" : ""
              }`}
              onClick={() => setToggleFlag(true)}
            >
              ADD-SLOT
            </div>
            <div
              className={`home__toggleToViewSlot ${
                toggleFlag ? "" : "selected"
              }`}
              onClick={() => flagViewSlot()}
            >
              VIEW-SLOT
            </div>
          </div>
        </div>
        <div className="home__header">
          <div className="home__headerStartTime">Start Time</div>
          <div className="home__headerEndTime">End Time</div>
        </div>
        {toggleFlag ? (
          <AddSlot
            dates={dates}
            weekdays={weekdays}
            months={months}
            user={user}
          />
        ) : (
          <ViewSlots
            user={user}
            dates={dates}
            weekdays={weekdays}
            months={months}
          />
        )}
      </div>
    </div>
  );
}
