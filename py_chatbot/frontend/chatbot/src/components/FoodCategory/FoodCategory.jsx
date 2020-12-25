import React from "react";

import "./FoodCategory.css";

const FoodCategory = (props) => {
    const optionsMarkup = props.options.map((option) => (
    <button
      className="food-category-button"
      key={option.id} onClick={() => props.actionProvider.handlePrice(option)}
    >
      {option.text}
    </button>
  ));

  return <div className="food-category-container">{optionsMarkup}</div>;
};

export default FoodCategory;