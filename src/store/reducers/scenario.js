import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  scenarios: [],
  canvasScenarios: {},
  editedScenario:[],
  editedScenarioName:""
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
    addScenario(state, action) {
      state.scenarios = state.scenarios.push(action.scenario);
    },
    updateScenario(state, action) {
      state.scenarios = action.payload.scenarios;
    },
  },
});

export default scenarioSlice;
