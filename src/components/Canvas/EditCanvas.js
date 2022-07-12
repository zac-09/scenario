import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../Sidebar'
import styles from'./canvas.module.css'
import CanvasDraw from "react-canvas-draw";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from "react-router";
import {
    updateCanvasScenario,
} from "../../store/actions/scenario";

function EditCanvas() {

    const [color, setColor] = useState('red')
    const [canvasData, setCanvasData] = useState()
    const [name, setName] = useState('')
    const [isSaving, setisSaving] = useState(false);

    const params = useParams();
    const history = useHistory();

    const dispatch = useDispatch()

    const canvasScenarioData = useSelector(state => state.scenario.editedCanvasScenario)
    const canvasScenarioName = useSelector(state => state.scenario.editedCanvasScenarioName)
    const token = useSelector(state => state.auth.token)

    let loadableCanvas = useRef(null)



    const onUpdateCanvas = async () => {

      
            const response = await fetch(`http://localhost:4000/api/v1/scenarios/canvas/${params.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    data: canvasData,
                    name:name || canvasScenarioName
                }),
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            if (!response.ok) {
                //const error = await response.json();
                console.log('error.message');
    
            }
            const data = await response.json();
            console.log("data from action", data);
    
        

        // try {
        //     setisSaving(true);
        //     await dispatch(updateCanvasScenario(canvasData, name || canvasScenarioName, params.id));
        //     setisSaving(false);
        //     history.push("/scenario");
        // } catch (err) {
        //     setisSaving(false);
        // }

    }

    const onEditCanvas = () => {

    }



    return (
        <div className='container'>
            <div>
                <Sidebar
                    scenarioName={canvasScenarioName}
                />
            </div>
            <div>
                <h1>Canvas</h1>
                <CanvasDraw brushColor={color}
                    ref={canvasDraw => (loadableCanvas = canvasDraw)}
                    saveData={canvasScenarioData}
                />
                <input required onChange={(e) => { setName(e.target.value) }}></input>

                <button onClick={() => {
                    setCanvasData(loadableCanvas.getSaveData())
                    console.log('image is', loadableCanvas.getSaveData())
                }
                }>Log imagedata</button>

                <button onClick={onUpdateCanvas}>Save</button>
            </div>
        </div>
    )
}

export default EditCanvas