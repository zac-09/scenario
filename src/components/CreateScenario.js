import React, { useState, useRef, useEffect, Fragment } from "react";
import { CircularProgress } from "@mui/material";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  updateEdge,
} from "react-flow-renderer";
import ConnectionLine from "./ConnectionLine";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import "./dnd.css";
import { createScenario } from "../store/actions/scenario";
import "./updatenode.css";
import sprite from "./../assets/sprite.svg";
import { useHistory } from "react-router";
import { notificationActions } from "../store";
const initialElements = [
  {
    id: "1",
    type: "input",
    data: { label: "Start Scenario" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const history = useHistory();
  const [isSaving, setisSaving] = useState(false);
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const [scenarioName, setScenarioName] = useState();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [clickedElement, setClickedEment] = useState({});
  const [label, setLabel] = useState(clickedElement?.data?.label);
  const [edgeLabel, setEdgeLabel] = useState();
  const [clickedEdge, setclickedEdge] = useState();
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onSaveScenario = async (e) => {
    e.preventDefault();
    if (elements.length > 2) {
      try {
        setisSaving(true);
        await dispatch(createScenario(elements, scenarioName));
        setisSaving(false);
        history.push("/scenario");
      } catch (err) {
        setisSaving(false);
      }
    } else {
      dispatch(
        notificationActions.showAlert({
          type: "error",
          message: "please create a node",
        })
      );
      return;
    }
  };
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow").split(",");
    // console.log('type is',type.split(","));

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    if (type[0] === "default") {
      const lead = {
        id: `${getId() + "lead"}`,
        data: { label: "question" },
        // position: { x: 250, y: 70 },
        position,
      };
      const left = {
        id: `${getId() + "left"}`,
        data: { label: "Case:" },
        // position: { x: 50, y: 200 },
        position: { x: lead.position.x - 200, y: lead.position.y + 120 },
      };
      const right = {
        id: `${getId() + "right"}`,
        data: { label: "Case:" },
        // position: { x: 450, y: 200 },
        position: { x: lead.position.x + 200, y: lead.position.y + 120 },
      };
      const arrowLeft = {
        id: `${getId() + "green"}`,
        source: lead.id,
        target: left.id,
        type: "step",
        label: "case 1",
        arrowHeadType: "arrowclosed",
        labelStyle: { fill: "green", fontWeight: 700, zIndex: 2344 },
        arrowHeadColor: "#101d2c",

        style: { stroke: "#101d2c" },
      };
      const arrowRight = {
        id: `${getId() + "red"}`,
        source: lead.id,
        target: right.id,
        type: "step",
        label: "case 2",
        labelStyle: { fill: "red", fontWeight: 700, zIndex: 2344 },
        style: { stroke: "#101d2c" },
        arrowHeadColor: "#101d2c",
        arrowHeadType: "arrowclosed",
      };
      console.log("the ids aare", lead.id, left.id, right.id);

      setElements((els) => {
        return [...els, lead, left, right, arrowLeft, arrowRight];
      });
      return;
    }

    const newNode = {
      id: getId(),
      type: type[0],
      position,
      data: { label: `${type[1]} ` },
    };

    setElements((es) => es.concat(newNode));
  };
  const onEdgeUpdate = (oldEdge, newConnection) => {
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  };
  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === clickedElement.id) {
          el.data = {
            ...el.data,
            label: label,
          };
        }

        return el;
      })
    );
  }, [setElements, clickedElement, label]);
  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === clickedEdge?.id) {
          console.log("element matcg", el.id, clickedEdge.id);

          el = {
            ...el,
            label: edgeLabel,
          };
        }

        return el;
      })
    );
  }, [setElements, clickedEdge, edgeLabel]);

  const deleteNodeHandler = (node) => {
    setElements((els) => {
      const filteredArray = els.filter((el) => el.id !== node.id);

      const index = filteredArray.findIndex(
        (el) => el.target && el.target === node.id
      );
      if (index >= 0) {
        filteredArray.splice(index, 1);
      }
      return filteredArray;
    });
    setClickedEment({});
    setLabel("");
  };

  const deleteEdgeHandler = (edge) => {
    setElements((els) => {
      const filteredArray = els.filter((el) => el.id !== edge.id);

      const index = filteredArray.findIndex((el) => el.id === edge.target);
      if (index >= 0) {
        filteredArray.splice(index, 1);
      }
      return filteredArray;
    });
  };
  const addCaseHandler = () => {
    const lead = clickedElement;
    console.log("the lead is", lead);
    const newNode = {
      id: `${getId() + "new node"}`,
      data: { label: "Case:" },
      // position: { x: 450, y: 200 },
      position: {
        x: lead.position.x + getRandomInt(-300, 300),
        y: lead.position.y + 120,
      },
    };
    const newEdge = {
      id: `${getId() + "red"}`,
      source: lead.id,
      target: newNode.id,

      type: "step",
      label: "new case",
      labelStyle: { fill: "red", fontWeight: 700 },
      style: { stroke: "#101d2c" },
      arrowHeadColor: "#101d2c",
      arrowHeadType: "arrowclosed",
    };
    setElements((es) => es.concat(newNode, newEdge));
  };
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        {/* <Sidebar
          isSaving={isSaving}
          onSaveScenario={onSaveScenario}
          scenarioName={scenarioName}
          setScenarioName={setScenarioName}
        /> */}
        

        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            onEdgeUpdate={onEdgeUpdate}
            arrowHeadColor="#101d2c"
            defaultZoom={1.5}
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onEdgeUpdate={onEdgeUpdate}
            onDragOver={onDragOver}
            connectionLineType="step"
            connectionLineComponent={ConnectionLine}
            connectionLineStyle={{ stroke: "red" }}
            onElementClick={(event, element) => {
              console.log("the element is", element);
              if (element.target) {
                setclickedEdge(element);
                elements.map((el) => {
                  if (el.id === element.id) {
                    setEdgeLabel(el.label);
                  }
                });
                return;
              }
              setClickedEment(element);

              setLabel(element.data.label);
            }}
          >
            <Controls />
          </ReactFlow>

          <div className="updatenode__controls">
            <h1 className="update-title">Change node</h1>
            {clickedElement.id && (
              <Fragment>
                <label className="label">label:</label>
                <div className="input-group">
                  <input
                    value={label}
                    onChange={(evt) => {
                      setLabel(evt.target.value);
                    }}
                    className="text-input"
                  />
                  <div
                    className="input-icon-container"
                    onClick={() => {
                      deleteNodeHandler(clickedElement);
                    }}
                  >
                    <svg class="input-icon">
                      <use href={`${sprite}#icon-cross`}></use>
                    </svg>
                  </div>
                </div>
              </Fragment>
            )}
            {elements.map((element) => {
              if (
                !clickedElement.target &&
                element.source === clickedElement.id &&
                clickedElement.id !== undefined
              ) {
                return (
                  <Fragment>
                    <div className="label-group">
                      <label className="label">case:</label>
                      <div className="input-group">
                        <input
                          value={element.label}
                          onChange={(evt) => {
                            setElements((elements) =>
                              elements.map((el) => {
                                if (el.id === element.id) {
                                  return {
                                    ...el,
                                    label: evt.target.value,
                                  };
                                }
                                return el;
                              })
                            );
                          }}
                          className="text-input"
                        />
                        <div
                          className="input-icon-container"
                          onClick={() => {
                            deleteEdgeHandler(element);
                          }}
                        >
                          <svg class="input-icon">
                            <use href={`${sprite}#icon-cross`}></use>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              }
            })}
            {/* {elements.length > 2 ? (
              <input
                placeholder="scenario name"
                value={scenarioName}
                onChange={(evt) => {
                  setScenarioName(evt.target.value);
                }}
                className="text-input"
              />
            ) : null} */}

            {clickedElement.id && (
              <div className="btn-container" onClick={addCaseHandler}>
                <a href="#" className="btn">
                  add case
                </a>
                {/* {elements.length > 2 ? (
                  <Fragment>
                    {!isSaving ? (
                      <a
                        onClick={onSaveScenario}
                        style={{ marginLeft: "8px" }}
                        href="#"
                        className="btn"
                      >
                        save scenario
                      </a>
                    ) : (
                      <CircularProgress
                        color="success"
                        style={{ marginLeft: "25px", marginTop: "10px" }}
                      />
                    )}
                  </Fragment>
                ) : null} */}
              </div>
            )}
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
