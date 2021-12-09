import {
  authActions,
  notificationActions,
  scenarioActions,
  url,
} from "../index";

export const createScenario = (scenarioData, name) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const response = await fetch(`${url}/scenarios/saveScenario`, {
      method: "POST",
      body: JSON.stringify({
        data: scenarioData,
        name,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      //   console.log(error.message);
      dispatch(
        notificationActions.showAlert({ type: "error", message: error.message })
      );
      // return;
      throw new Error(error.message);
    }
    const data = await response.json();
    console.log("data from action", data);
    dispatch(
      notificationActions.showAlert({
        type: "success",
        message: "scenario successfully created",
      })
    );
  };
};
export const updateScenario = (scenarioData, name, id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const response = await fetch(`${url}/scenarios/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        data: scenarioData,
        name,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      //   console.log(error.message);
      dispatch(
        notificationActions.showAlert({ type: "error", message: error.message })
      );
      // return;
      throw new Error(error.message);
    }
    const data = await response.json();
  
    await dispatch(
      notificationActions.showAlert({
        type: "success",
        message: "scenario successfully updated",
      })
    );
  };
};

export const deleteScenario = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const response = await fetch(`${url}/scenarios/${id}`, {
      method: "DELETE",

      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      //   console.log(error.message);
      dispatch(
        notificationActions.showAlert({ type: "error", message: error.message })
      );
      return;
      // throw new Error(error.message);
    }
    const data = await response.json();
    console.log("data from action", data);
  };
};
export const getAllScenarios = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const response = await fetch(`${url}/scenarios/userScenarios`, {
      method: "GET",

      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      //   console.log(error.message);
      dispatch(
        notificationActions.showAlert({ type: "error", message: error.message })
      );
      return;
      // throw new Error(error.message);
    }
    const data = await response.json();
    console.log("data from action", data);
    const scenarios = data.scenarios;
    dispatch(scenarioActions.load({ scenarios }));
  };
};
export const getScenario = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;
    const response = await fetch(`${url}/scenarios/${id}`, {
      method: "GET",

      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      //   console.log(error.message);
      dispatch(
        notificationActions.showAlert({ type: "error", message: error.message })
      );
      return;
      // throw new Error(error.message);
    }
    const data = await response.json();
    console.log("data from fetch one", data);
    const scenario = data.scenario.data;
  await  dispatch(
      scenarioActions.setEditedScenario({
        data: scenario,
        name: data.scenario.name,
      })
    );

  };
};
