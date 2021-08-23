import React, { useState, useRef, useEffect, Fragment } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  updateEdge,
} from "react-flow-renderer";
import ConnectionLine from "./ConnectionLine";
import Sidebar from "./Sidebar";
// const edgeType = 'smoothstep';
import "./dnd.css";
// import UpdateNode from "./UpdateNode";
import "./updatenode.css";

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
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [clickedElement, setClickedEment] = useState({});
  const [label, setLabel] = useState(clickedElement?.data?.label);
  const [edgeLabel, setEdgeLabel] = useState();
  const [clickedEdge, setclickedEdge] = useState();
  const onConnect = (params) => setElements((els) => addEdge(params, els));
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

          // it's important that you create a new object here
          // in order to notify react flow about the change
          el = {
            ...el,
            label: edgeLabel,
          };
        }

        return el;
      })
    );
    // setElements((prevstate) => {
    //   console.log("the prev stae is", prevstate);
    //   return []
    // });
  }, [setElements, clickedEdge, edgeLabel]);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />

        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            onNodeDoubleClick={(event, node) => {
              console.log("the node is", node);
              setElements((els) => els.filter((el) => el.id !== node.id));
            }}
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
            onEdgeContextMenu={(event, edge) => {
              event.preventDefault();
              console.log(edge);
              const lead = elements.find((el) => (el.id = edge.source));
              console.log("the lead is", lead);
              const newNode = {
                id: `${getId() + "new node"}`,
                data: { label: "Case:" },
                // position: { x: 450, y: 200 },
                position: {
                  x: edge.id.includes("red")
                    ? lead.position.x + 300
                    : lead.position.x - 300,
                  y: lead.position.y + 200,
                },
              };
              const newCase = {
                id: `${getId() + "red"}`,
                source: edge.source,
                target: newNode.id,

                type: "step",
                label: "new case",
                labelStyle: { fill: "red", fontWeight: 700 },
                style: { stroke: "#101d2c" },
                arrowHeadColor: "#101d2c",
                arrowHeadType: "arrowclosed",
              };
              setElements((es) => es.concat(newNode, newCase));
            }}
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
            {/* <Background variant="dots" gap={10} size={1} /> */}
            <Controls />
          </ReactFlow>
          {/* <UpdateNode element={clickedElement} setElements={setElements} />
           */}
          <div className="updatenode__controls">
            <h1 className="update-title">Change label</h1>
            <label className="label">label:</label>
            <input
              value={label}
              onChange={(evt) => {
                setLabel(evt.target.value);
              }}
              className="text-input"
            />
            {clickedEdge && (
              <Fragment>
                <label className="label">case:</label>
                <input
                  value={edgeLabel}
                  onChange={(evt) => {
                    setEdgeLabel(evt.target.value);
                  }}
                  className="text-input"
                />
              </Fragment>
            )}
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
