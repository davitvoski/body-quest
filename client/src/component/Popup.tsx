import React from "react";
import "../styles/Popup.css";

export const Popup = (props: any) => {
  return (
    <div
      className="popup-box"
      onClick={(event) => {
        if (event.target.className === "popup-box") {
          props.handleClose();
        }
      }}
    >
      <div className="box">
        <p id="title">{props.exercise.name}</p>
        <div className="body">
          <p className="body-text">
            <b>Equipment: </b>
            {props.exercise.equipment}
          </p>
          <p className="body-text">
            <b>Body Part: </b>
            {props.exercise.body_part}
          </p>
          <p className="body-text">
            <b>Target: </b>
            {props.exercise.target}
          </p>
        </div>

        <img
          className="exercise-image"
          alt="exercise"
          src="https://www.inspireusafoundation.org/wp-content/uploads/2022/05/weighted-push-up.gif"
        ></img>
        <button className="add">+</button>
      </div>
    </div>
  );
};
