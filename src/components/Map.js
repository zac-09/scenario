import React, { useState, useRef, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  
} from "react-flow-renderer";
import ConnectionLine from './ConnectionLine'
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
  const [edge, setEdge] = useState(clickedElement?.data?.label);
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
        labelStyle: { fill: "green", fontWeight: 700 },
        arrowHeadColor: "#101d2c",

        style: { stroke: "#101d2c" },
      };
      const arrowRight = {
        id: `${getId() + "red"}`,
        source: lead.id,
        target: right.id,
        type: "step",
        label: "case 2",
        labelStyle: { fill: "red", fontWeight: 700 },
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
    // setElements((els) => updateEdge(oldEdge, newConnection, els));
    console.log("updated edge", oldEdge, newConnection);
  };
  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === clickedElement.id) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          console.log("the label isd", label);

          el.data = {
            ...el.data,
            label: label,
          };
        }

        return el;
      })
    );
  }, [setElements, clickedElement, label]);

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />

        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
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
            connectionLineStyle={{stroke:"red"}}
            onElementClick={(event, element) => {
              console.log("the element is", element);
              if (element.target) {
                // elements.forEach(el=>{
                //   if (el.id = element.id){
                //     console.log('The edge is',el.label);

                //   }
                // })
                return;
              }
              setLabel(element.data.label);

              setClickedEment(element);
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
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
