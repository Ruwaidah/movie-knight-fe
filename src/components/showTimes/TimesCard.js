import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./showtime.scss";

const TimesCard = (props) => {
  const navigate = useNavigate();
  // const {
  //   fetchingData,
  //   MovieSelects,
  //   daySelects,
  //   ticketsNumber,
  //   seatsSelects,
  //   timeSelects,
  //   results,
  // } = useSelector((state) => state.users);
  const [isSelect, setIsSelect] = useState({
    clicked: false,
  });

  function Turing24To12(time) {
    let amOrpm = parseInt(time) >= 12 ? "PM" : "AM";
    let hours = ((parseInt(time) + 11) % 12) + 1;
    let min = time.slice(3, 5);

    return `${hours}:${min} ${amOrpm}`;
  }

  useEffect(() => {
    setIsSelect({ clicked: false });
  }, [props.active]);

  const picked = (data) => {
    props.setActive(!props.active);
    setTimeout(() => {
      setIsSelect({
        clicked: !isSelect.clicked,
      });
    }, []);
  };

  return (
    <>
      <p
        className={
          props.ind > 0
            ? isSelect.clicked
              ? `bright-red timeshow white-text`
              : `timeshow white-text`
            : isSelect.clicked
            ? `bright-red timeshow`
            : `timeshow`
        }
        onClick={() => picked(props.time + props.date)}
      >
        {Turing24To12(props.time)}
      </p>
      {isSelect.clicked ? (
        <button
          className="next-button"
          id="tickets-btn"
          onClick={() => navigate("/signup")}
        >
          Get tickets
        </button>
      ) : null}
    </>
  );
};

export default TimesCard;
