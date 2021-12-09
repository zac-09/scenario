import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  scenarios: [],
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