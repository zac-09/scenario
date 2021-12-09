import React, { Fragment } from "react";
import "./sidebar.css";
import { CircularProgress } from "@mui/material";

import sprite from "./../assets/sprite.svg";
import { NavLink } from "react-router-dom";
const Sidebar = (props) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Fragment>
      <aside className="side-bar-container">
        <div className="title-container">
          <h1 className="title">Create Scenario</h1>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            placeholder="scenario name"
            value={props.scenarioName}
            onChange={(evt) => {
              props.setScenarioName(evt.target.value);
            }}
            className="text-input"
          />
          <Fragment>
            {!props.isSaving ? (
              <NavLink
                to="/scenario"
                className="btn-yellow-link"
                onClick={props.onSaveScenario}
                style={{ marginTop: "20px" }}
              >
                <span className="btn--green btn">
                  {props.isEdit ? "update scenario" : "Save scenario"}
                </span>
              </NavLink>
            ) : (
              <CircularProgress
                color="success"
                style={{ marginLeft: "65px", marginTop: "10px" }}
              />
            )}
          </Fragment>
        </div>

        <div style={{ position: "absolute", bottom: "40px" }}>
          <NavLink
            to="/scenario"
            className="btn-yellow-link"
            style={{ marginTop: "40px" }}
          >
            <span className="btn--yellow btn">Back to dashboard</span>
          </NavLink>
        </div>
      </aside>
    </Fragment>
  );
};
export default Sidebar;
