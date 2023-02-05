import React, { useState, useEffect } from "react";

const TimeCard = (props) => {
  const [active, setActive] = useState(false);

  function toggleClass() {
    const currentState = active;
    setActive(!currentState);
  }

  useEffect(() => {
    if (active) props.setTimeSelect([...props.timeSelect, props.time]);
    else {
      const filter = props.timeSelect.filter((time) => {
        return time !== props.time;
      });
      props.setTimeSelect(filter);
    }
  }, [active]);

  return (
    <button
      className={active ? " day red-box" : "day"}
      onClick={() => toggleClass()}
    >
      {props.time}
    </button>
  );
};

export default TimeCard;
