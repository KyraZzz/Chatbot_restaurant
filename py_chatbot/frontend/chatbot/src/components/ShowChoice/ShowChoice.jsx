import React from "react";

import "./ShowChoice.css";

const ShowChoice = (props) => {
  return (
    <ul className="link-list">
    <li key="1" className="link-list-item">
      <a
        href={props.chosenRestUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="show-choice-item-url"
      >
        {props.chosenRestText}
      </a>
      </li>
      </ul>
  )
};

export default ShowChoice;