import React, { useState } from "react";

function ZipSearch(props) {
  const toggleMenu = () => {
    document.getElementById("filter").classList.toggle("toggle-menu2");
  };

  const [values, setValues] = useState({
    filter: "",
    rating: ["1", "2", "3", "4", "5"],
    mature: ["G", "PG", "PG-13", "R"]
  });
  const submit = event => {
    event.preventDefault();
    props.setFilter(values);
    console.log(props.filters);
  };
  const change = event => {
    setValues({ ...values, filter: event.target.value });
  };

  const changeRating = event => {
    let temp = values.rating;
    if (temp.includes(event.target.value)) {
      temp.splice(temp.indexOf(event.target.value), 1);
    } else {
      temp.push(event.target.value);
    }
    setValues({ ...values, rating: temp });
  };

  const changeMature = event => {
    let temp = values.mature;
    if (temp.includes(event.target.value)) {
      temp.splice(temp.indexOf(event.target.value), 1);
    } else {
      temp.push(event.target.value);
    }
    setValues({ ...values, mature: temp });
  };

  return (
    <div>
      <div onClick={toggleMenu} id="hamburger-menu" className="hamburger-menu">
        <div className="linediv">
          Filter
          <div className="linecon">
            <div className="line1 black" data-testid="line1 bl"></div>
            <div className="line1 white" data-testid="line1 wh"></div>
            <div className="line2 black" data-testid="line2 bl"></div>
            <div className="line2 white" data-testid="line2 wh"></div>
            <div className="line3 black" data-testid="line3 bl"></div>
            <div className="line3 white" data-testid="line3 wh"></div>
          </div>
        </div>
      </div>

      <div className="menu-filter" id="filter">
        <form
          className="filtering"
          id="ratingSelect"
          onSubmit={(toggleMenu, submit)}
        >
          <div className="sorting">
            <label>Sort By</label>
            <label className="label-text">
              <input
                data-testid="recentform"
                type="checkbox"
                value="recent"
                name="filter"
                onChange={change}
              />
              Most Recent
            </label>
            <label className="label-text">
              <input
                data-testid="oldform"
                type="checkbox"
                value="old"
                onChange={change}
                name="filter"
              />
              Oldest
            </label>
            <label className="label-text">
              <input
                data-testid="azform"
                type="checkbox"
                value="az"
                name="filter"
                onChange={change}
              />
              A-Z
            </label>
            <label className="label-text">
              <input
                data-testid="zaform"
                type="checkbox"
                value="za"
                name="filter"
                onChange={change}
              />
              Z-A
            </label>
          </div>
          <div className="divider"></div>
          <div className="movie-rating">
            Rating
            <label className="label-text">
              <input
                data-testid="rform"
                type="checkbox"
                name="stars"
                id="R"
                value="R"
                onChange={changeMature}
                defaultChecked
              />
              R
            </label>
            <label className="label-text">
              <input
                data-testid="13form"
                type="checkbox"
                name="stars"
                value="PG-13"
                onChange={changeMature}
                defaultChecked
              />
              PG-13
            </label>
            <label className="label-text">
              <input
                data-testid="pgform"
                type="checkbox"
                name="stars"
                value="PG"
                onChange={changeMature}
                defaultChecked
              />
              PG
            </label>
            <label className="label-text">
              <input
                data-testid="gform"
                type="checkbox"
                name="stars"
                value="G"
                onChange={changeMature}
                defaultChecked
              />
              G
            </label>
          </div>
          <div className="divider"></div>
          <div className="movie-review">
            <label>Review Rating</label>
            <div className="star-buttons">
              <label>
                <input
                  data-testid="1form"
                  type="checkbox"
                  name="stars"
                  value="1"
                  onChange={changeRating}
                  defaultChecked
                />
                <span className="icon-full">★</span>
                <span className="icon">☆</span>
                <span className="icon">☆</span>
                <span className="icon">☆</span>
                <span className="icon">☆</span>
              </label>
              <label>
                <input
                  data-testid="2form"
                  type="checkbox"
                  name="stars"
                  value="2"
                  onChange={changeRating}
                  defaultChecked
                />
                <span className="icon-full">★</span>
                <span className="icon-full">★</span>
                <span className="icon">☆</span>
                <span className="icon">☆</span>
                <span className="icon">☆</span>
              </label>
              <label>
                <input
                  data-testid="3form"
                  type="checkbox"
                  name="stars"
                  value="3"
                  onChange={changeRating}
                  defaultChecked
                />
                <span className="icon-full">★</span>
                <span className="icon-full">★</span>
                <span className="icon-full">★</span>
                <span className="icon">☆</span>
                <span className="icon">☆</span>
              </label>
              <label>
                <input
                  data-testid="4form"
                  type="checkbox"
                  name="stars"
                  value="4"
                  onChange={changeRating}
                  defaultChecked
                />
                <span className="icon-full">★</span>
                <span className="icon-full">★</span>
                <span className="icon-full">★</span>
                <span className="icon-full">★</span>
                <span className="icon">☆</span>
              </label>
              <label>
                <input
                  data-testid="5form"
                  type="checkbox"
                  name="stars"
                  value="5"
                  onChange={changeRating}
                  defaultChecked
                />
                <span className="icon-full">★</span>
                <span className="icon-full">★</span>
                <span className="icon-full">★</span>
                <span className="icon-full">★</span>
                <span className="icon-full">★</span>
              </label>
            </div>
          </div>
          <button onClick={() => toggleMenu() } className="results-btn" data-testid="filter-btn">See Results</button>
        </form>
      </div>
    </div>
  );
}
export default ZipSearch;
