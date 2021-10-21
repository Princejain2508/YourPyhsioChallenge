import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { MdOutlineDeleteOutline } from "react-icons/md";
import "./css/ShowSlot.css";

export default function ShowSlots({ currentDate, date, user }) {
  const [showData, setShowData] = useState([]);
  const [totalHours, setTotalHours] = useState(null);
  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    if (showData) {
      let total = showData.reduce((total, data) => {
        total =
          total + parseInt(data.endTimeValue) - parseInt(data.startTimeValue);
        return total;
      }, 0);
      setTotalHours(total / 60);
      console.log(total);
    }
  }, [showData]);

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
              key: doc._delegate._document.key.path.segments[10],
              startTime: currData.fields.startTime.stringValue,
              endTime: currData.fields.endTime.stringValue,
              startTimeValue: currData.fields.startTimeValue.stringValue,
              endTimeValue: currData.fields.endTimeValue.stringValue,
            });
          });
          setShowData(data);
        });
    }
  };
  const deleteSlot = (key) => {
    db.collection("users")
      .doc(user.id)
      .collection("allSlots")
      .doc(date.date)
      .collection("slots")
      .doc(key)
      .delete();
  };

  return (
    <div className="showSlots">
      {showData?.length ? (
        <div className="showSlots__outerContainer">
          <div className="showSlots__currDate">
            <div className="showSlots__Date">{currentDate}</div>
            <div className="showSlots__totalHours">({` ${
              totalHours ? totalHours : ""
            } Hours`})</div>
          </div>
          <div className="showSlots__slotContainer">
            {showData.map((slot) => {
              return (
                <div className="showSlot__timing" key={slot.key}>
                  <div className="showSlot__startTiming">{slot.startTime}</div>
                  <span className="showSlot__constant">to</span>
                  <div className="showSlot__endTiming">{slot.endTime}</div>
                  <MdOutlineDeleteOutline
                    className="showSlot__deleteIcon"
                    onClick={() => deleteSlot(slot.key)}
                  />
                </div>
              );
            })}
          </div>{" "}
        </div>
      ) : null}
    </div>
  );
}
