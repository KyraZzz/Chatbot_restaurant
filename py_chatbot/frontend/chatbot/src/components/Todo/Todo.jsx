import React from "react";

const Todo = (props) => {

    const optionsMarkup = props.state.todoList.map((option) => (
        <button
          className="food-category-button"
          key={option.id} onClick={() => props.actionProvider.handleMealSuggestion(option)}
        >
          {option.text}
        </button>
      ));

  return <div>{optionsMarkup}</div>;
};

export default Todo;