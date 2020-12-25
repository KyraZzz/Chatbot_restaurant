import React from "react";

import "./PriceRange.css";

const PriceRange = (props) => {
    const optionsMarkup = props.options.map((option) => (
    <button
      className="food-category-button"
      key={option.id} onClick={() => props.actionProvider.handleMealSuggestion(option)}
    >
      {option.text}
    </button>
  ));

  return <div className="food-category-container">{optionsMarkup}</div>;
};

export default PriceRange;