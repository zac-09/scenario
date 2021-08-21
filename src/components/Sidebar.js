import React from "react";
import "./sidebar.css";
import sprite from "./../assets/sprite.svg";
export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="side-bar-container">
      <div className="title-container">
        <h1 className="title">Create Scenario</h1>
      </div>
      <div className="description">
        You can drag these nodes to the pane on the right to create scenarios.
      </div>
      <div
        className="dndnode input test"
        onDragStart={(event) => onDragStart(event, ["input", "start"])}
        draggable
      >
        <svg class="icon">
          <use href={`${sprite}#icon-flag`}></use>
        </svg>
        Start
      </div>
      <div
        className="dndnode default"
        onDragStart={(event) => onDragStart(event, ["default", "condition"])}
        draggable
      >
        <svg class="icon">
          <use href={`${sprite}#icon-help`}></use>
        </svg>
        case
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, ["output", "end"])}
        draggable
      >
        <svg class="icon">
          <use href={`${sprite}#icon-finish`}></use>
        </svg>
        End
      </div>
    </aside>
  );
};
