import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar";
import styles from "./canvas.module.css";
import CanvasDraw from "react-canvas-draw";
import { useSelector, useDispatch } from "react-redux";
import { SketchPicker } from "react-color";
import Slider from "react-input-slider";
import { url } from "../../store/index";

function Canvas() {
  const [color, setColor] = useState("red");
  const [canvasData, setCanvasData] = useState();
  const [name, setName] = useState("");
  const [brushRadius, setBrushRadius] = useState({ x: 2 });

  const token = useSelector((state) => state.auth.token);

  let saveableCanvas = useRef(null);

  const saveCanvas = async () => {
    const response = await fetch(`${url}/scenarios/saveCanvasScenario`, {
      method: "POST",
      body: JSON.stringify({
        data: canvasData,
        name: name,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error.message);
    } else {
      const data = await response.json();
      console.log("data from action", data);
    }
  };

  return (
    <div className={styles["container"]}>
      <div>
        <Sidebar />
      </div>
      <div>
        <div className={styles["canvas_content"]}>
          <CanvasDraw
            brushColor={color}
            ref={(canvasDraw) => (saveableCanvas = canvasDraw)}
            canvasWidth={900}
            canvasHeight={500}
            brushRadius={brushRadius.x}
          />
          <SketchPicker
            color={color}
            onChangeComplete={(color) => setColor(color.hex)}
          />
        </div>
        <p>{"x: " + brushRadius.x}</p>
        <Slider
          axis="x"
          xstep={0.1}
          xmin={0}
          xmax={10}
          x={brushRadius.x}
          onChange={({ x }) => setBrushRadius({ x: parseFloat(x.toFixed(2)) })}
        />
        <br />
        <input
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            setCanvasData(saveableCanvas.getSaveData());
            console.log("image is", saveableCanvas.getSaveData());
          }}
        >
          Log imagedata
        </button>

        <button onClick={saveCanvas}>Save</button>
      </div>
    </div>
  );
}

export default Canvas;
