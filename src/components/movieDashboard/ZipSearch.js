import React, { useState } from "react";

function ZipSearch(props) {
  const [zip, setZip] = useState(localStorage.getItem("zip") || "");

  const handleChange = e => {
    setZip(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem("zip", zip);
    console.log("zip")
    props.setZipCode(zip);
  };
  return (
    <div className="zipsearch">
      <form onSubmit={handleSubmit}>
        <input
          data-testid="zipcodesearch"
          className="fontAwesome"
          type="number"
          name="zipcode"
          placeholder="&#xf3c5;  Enter zip code to see movies near you"
          onChange={handleChange}
          value={zip}
        />
      </form>
    </div>
  );
}

export default ZipSearch;
