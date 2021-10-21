import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { db } from "./firebase";
import "./css/CreateSlot.css";

export default function CreateSlot({ currentDate, date, user }) {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startTimeValue, setStartTimeValue] = useState("Select Time");
  const [endTimeValue, setEndTimeValue] = useState("Select Time");
  const [slotData, setSlotData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [user]);
  const timing = [
    { time: "08:00 AM", value: 480 },
    { time: "08:30 AM", value: 510 },
    { time: "09:00 AM", value: 540 },
    { time: "09:30 AM", value: 570 },
    { time: "10:00 AM", value: 600 },
    { time: "10:30 AM", value: 630 },
    { time: "11:00 AM", value: 660 },
    { time: "11:30 AM", value: 690 },
    { time: "12:00 PM", value: 720 },
    { time: "12:30 PM", value: 750 },
    { time: "01:00 PM", value: 780 },
    { time: "01:30 PM", value: 810 },
    { time: "02:00 PM", value: 840 },
    { time: "02:30 PM", value: 870 },
    { time: "03:00 PM", value: 900 },
    { time: "03:30 PM", value: 930 },
    { time: "04:00 PM", value: 960 },
    { time: "04:30 PM", value: 990 },
    { time: "05:00 PM", value: 1020 },
    { time: "05:30 PM", value: 1050 },
    { time: "06:00 PM", value: 1080 },
    { time: "06:30 PM", value: 1110 },
    { time: "07:00 PM", value: 1140 },
    { time: "07:30 PM", value: 1170 },
    { time: "08:00 PM", value: 1200 },
    { time: "08:30 PM", value: 1230 },
    { time: "09:00 PM", value: 1260 },
    { time: "09:30 PM", value: 1290 },
    { time: "10:00 PM", value: 1320 },
    { time: "10:30 PM", value: 1350 },
    { time: "11:00 PM", value: 1380 },
  ];

  const fetchData = () => {
    if (user) {
      db.collection("users")
        .doc(user.id)
        .collection("allSlots")
        .doc(date.date)
        .collection("slots")
        .orderBy("startTimeValue", "asc")
        .onSnapshot((snapshot) => {
          var data = [];
          snapshot.docs?.map((doc) => {
            let currData = doc._delegate._document.data.partialValue.mapValue;
            data.push({
              startTimeValue: currData.fields.startTimeValue.stringValue,
              endTimeValue: currData.fields.endTimeValue.stringValue,
            });
          });
          setSlotData(data);
        });
    }
  };
  const isInputRight = (start, end) => {
    console.log(start, end);
    let res = false;
    for (var i = 0; i < slotData.length; i++) {
      if (
        !(
          (parseInt(slotData[i].startTimeValue) > parseInt(start) &&
            parseInt(slotData[i].startTimeValue) >= parseInt(end)) ||
          (parseInt(slotData[i].endTimeValue) < parseInt(end) &&
            parseInt(slotData[i].endTimeValue) <= parseInt(start)) ||
          end === "Select Time" ||
          start == "Select Time"
        )
      ) {
        res = true;
        break;
      }
    }
    return res;
  };

  const startTimeChange = (e) => {
    if (!user) {
      alert("Please Login or Register First");
      return;
    }
    let flag = isInputRight(e.target.value, endTimeValue);
    if (flag) {
      alert("Your Input Time Is Conflicting");
      return;
    }
    setStartTime(
      e.target.childNodes[e.target.selectedIndex].getAttribute("id")
    );
    setStartTimeValue(e.target.value);
  };

  const endTimeChange = (e) => {
    if (!user) {
      alert("Please Login or Register First");
      return;
    }
    let flag = isInputRight(startTimeValue, e.target.value);
    if (flag) {
      alert("Your Input Time Is Conflicting");
      return;
    }
    setEndTime(e.target.childNodes[e.target.selectedIndex].getAttribute("id"));
    setEndTimeValue(e.target.value);
  };

  const addSlot = () => {
    if (endTimeValue === 0 || startTimeValue === 0) {
      alert("Please Select Both Start Time And End Time");
    }
    if (parseInt(endTimeValue) <= parseInt(startTimeValue)) {
      alert("Your Input Time Is Conflicting");
      return;
    }
    if (user) {
      let id = (Math.random() * 1000000000).toString().slice(0, 6);
      db.collection("users")
        .doc(user.id)
        .collection("allSlots")
        .doc(date.date)
        .collection("slots")
        .doc(id)
        .set({
          startTime,
          endTime,
          startTimeValue,
          endTimeValue,
        });
      setStartTime(null);
      setEndTime(null);
      setStartTimeValue("Select Time");
      setEndTimeValue("Select Time");
    }
  };
  console.log(slotData);
  return (
    <div className="createSlot">
      <div className="createSlot__date">
        <div>{currentDate}</div>
      </div>
      <div className="createSlot__timings">
        <div className="createSlot__startTime">
          <select
            className="createSlot__select"
            onChange={startTimeChange}
            value={startTimeValue}
          >
            <option value="Select Time">Select Time</option>
            {timing.map((time) => {
              return (
                <option value={time.value} id={time.time} key={time.value}>
                  {time.time}
                </option>
              );
            })}
          </select>
        </div>
        <span className="createSlot__constant">to</span>
        <div className="createSlot__endTime">
          <select
            className="createSlot__select"
            onChange={endTimeChange}
            value={endTimeValue}
          >
            <option value="Select Time">Select Time</option>
            {timing.map((time) => {
              return (
                <option value={time.value} id={time.time} key={time.value}>
                  {time.time}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <AiOutlinePlusCircle
        className="createSlot__submitIcon"
        onClick={addSlot}
      />
    </div>
  );
}
