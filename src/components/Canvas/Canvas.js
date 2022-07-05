import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../Sidebar'
import './Canvas.css'
import CanvasDraw from "react-canvas-draw";
import { useSelector, useDispatch } from 'react-redux'

function Canvas() {

    const [color, setColor] = useState('red')
    const [canvasData, setCanvasData] = useState()
    const [name, setName] = useState('')

    const token = useSelector(state => state.auth.token)

    let saveableCanvas = useRef(null)



    const saveCanvas = async () => {
        const response = await fetch(`http://localhost:4000/api/v1/scenarios/saveCanvasScenario`, {
            method: "POST",
            body: JSON.stringify({
                data: canvasData,
                name:name
            }),
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
        if (!response.ok) {
            const error = await response.json();
            console.log(error.message);

        }
        const data = await response.json();
        console.log("data from action", data);

    };



return (
    <div className='container'>
        <div>
            <Sidebar
            />
        </div>
        <div>
            <h1>Canvas</h1>
            <CanvasDraw brushColor={color} ref={canvasDraw => (saveableCanvas = canvasDraw)} />
            <input required onChange={(e) => {setName(e.target.value)}}></input>
            <button onClick={() => {
                setCanvasData(saveableCanvas.getSaveData())
                console.log('image is', saveableCanvas.getSaveData())
            }
            }>Log imagedata</button>

            <button onClick={saveCanvas}>Save</button>
        </div>
    </div>
)
}

export default Canvas