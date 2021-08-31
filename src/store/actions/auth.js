import { authActions, notificationActions, url } from "../index";

let timer;
export const logout = () => {
  clearLogoutTimer();
  localStorage.removeItem("userData");
  return authActions.logout();
};
export const authenticate = (user, token, expiryTime) => {
  return async (dispatch) => {
    await dispatch(authActions.authenticate({ token: token, user: user }));
    // await dispatch(
    //   deviceActions.setDeviceData({
    //     devices: devices,
    //     selectedDevice_id: devices[0].device_imei,
    //   })
    // );
    dispatch(setLogoutTimer(expiryTime));
  };
};
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const saveDataToStorage = (user, token, expirationDate) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      user: user,

      expiryDate: expirationDate.toISOString(),
    })
  );
};

export const login = (email, password, remember_me = false) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
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
    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn)
    );
    await dispatch(
      authActions.authenticate({ token: data.token, user: data.user })
    );
    // await dispatch(
    //   deviceActions.setDeviceData({
    //     devices: data.data.devices,
    //     selectedDevice_id: data.data.devices[0].device_imei,
    //   })
    // );
    // authenticate(data.token, data.data.user, +data.expiresIn);
    dispatch(setLogoutTimer(+data.expiresIn));

    saveDataToStorage(
      data.user,
      data.token,

      expirationDate
    );
  };
};
export const signup = (email, password, last_name, first_name) => {
  console.log("From action", email, password, last_name, first_name);

  return async (dispatch) => {
    const response = await fetch(`${url}/users/signup`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        first_name,
        last_name,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      //   console.log(error.message);
      dispatch(
        notificationActions.showAlert({ type: "error", message: error.message })
      );
      setTimeout(() => {
        dispatch(notificationActions.hideCardNotification());
      }, 7000);

      throw new Error(error.message);
    }
    dispatch(
      notificationActions.showAlert({
        type: "info",
        message: "account successfuly create please login",
      })
    );
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    const response = await fetch(`${url}/users/forgotPassword`, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      //   console.log(error.message);
      dispatch(
        notificationActions.showCardNotification({
          type: "error",
          message: error.message,
        })
      );
      setTimeout(() => {
        dispatch(notificationActions.hideCardNotification());
      }, 7000);
      return;
    }
    dispatch(
      notificationActions.showCardNotification({
        type: "success",
        message:
          "Password revocery intiated please check email for instructions",
      })
    );
  };
};
