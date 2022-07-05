import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  scenarios: [],
  canvasScenarios: [],
  editedCanvasScenario: {},
  editedScenario:[],
  editedScenarioName:"",
  editedCanvasScenarioName:'',
};

const scenarioSlice = createSlice({
  name: "scenario",
  initialState: intialState,
  reducers: {
    load(state, action) {
      state.scenarios = action.payload.scenarios;
    },
    loadCanvasScenarios(state, action) {
      state.canvasScenarios = action.payload.canvasScenarios;
    },
    setEditedScenario(state, action) {
      state.editedScenario = action.payload.data;
      state.editedScenarioName = action.payload.name;
    },
    setEditedCanvasScenario(state, action) {
      state.editedCanvasScenario = action.payload.data;
      state.editedCanvasScenarioName = action.payload.name;
    },
    addScenario(state, action) {
      state.scenarios = state.scenarios.push(action.scenario);
    },
    updateScenario(state, action) {
      state.scenarios = action.payload.scenarios;
    },
    updateCanvasScenario(state, action) {
      state.scenarios = action.payload.scenarios;
    },
  },
});

export default scenarioSlice;
