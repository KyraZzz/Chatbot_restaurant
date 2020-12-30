import React from "react";
import "./LearningOptions.css";

const LearningOptions = (props) => {
  const options = [
    { 
      text: "Search by Name", 
      handler: props.actionProvider.handleName,
      id: 1 
    },
    { text: "Search by Category", handler: props.actionProvider.handleCategory, id: 2 }
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default LearningOptions;