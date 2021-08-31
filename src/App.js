import DnDFlow from "./components/Map";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import { notificationActions } from "./store";
import Notification from "./components/Notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import { Fragment, useEffect } from "react";
import { authenticate } from "./store/actions/auth";

function App() {
  const auth = useSelector((state) => state.auth);

  const notification = useSelector((state) => state.notification);
  const isLoggedIn = auth.isLoggedIn;
  const dispatch = useDispatch();
  const closeNotificationHandler = () => {
    dispatch(notificationActions.hideAlert());
  };
  const closeCardHandler = () => {
    dispatch(notificationActions.hideCardNotification());
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch(notificationActions.hideCardNotification());
      dispatch(notificationActions.hideAlert());
    }, [4000]);
  }, [dispatch]);
  useEffect(() => {
    const tryLogin = () => {
      const userData = localStorage.getItem("userData");
      const parsedData = JSON.parse(userData);
      if (!userData) {
        console.log("no data found");

        return (
          <Route path="/">
            <Redirect to="/auth" />
          </Route>
        );
      }
      const { user, token, expiryDate, devices } = parsedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !user) {
        console.log("token expired already");

        return (
          <Route path="/">
            <Redirect to="/auth" />
          </Route>
        );
      }
      const expiryTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authenticate(user, token, devices, expiryTime));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        {!isLoggedIn && (
          <Fragment>
            <Route path="/auth">
              {notification.showAlert && (
                <Alert
                  severity={notification.alertType}
                  onClose={closeNotificationHandler}
                  style={{ zIndex: 1000000 }}
                >
                  <span className="notification__text">
                    {notification.alertMessage}
                  </span>
                </Alert>
              )}
              {notification.showCardNotification && (
                <Notification
                  type={notification.cardNotificationType}
                  title={notification.cardNotificationTitle}
                  message={notification.cardMessage}
                  onClose={closeCardHandler}
                />
              )}
              <Auth />
            </Route>
            <Route path="/" exact>
              <Redirect to="/auth" />
            </Route>
            <Route path="*" exact>
              <Redirect to="/auth" />
            </Route>
          </Fragment>
        )}
        {isLoggedIn && (
          <Fragment>
            {notification.showAlert && (
              <Alert
                severity={notification.alertType}
                onClose={closeNotificationHandler}
                style={{ zIndex: 1000000 }}
              >
                <span className="notification__text">
                  {notification.alertMessage}
                </span>
              </Alert>
            )}
            {notification.showCardNotification && (
              <Notification
                type={notification.cardNotificationType}
                title={notification.cardNotificationTitle}
                message={notification.cardMessage}
                onClose={closeCardHandler}
              />
            )}
            <Route path="/create-scenario" exact>
              <DnDFlow />
            </Route>
            <Route path="/" exact>
              <Redirect to="/create-scenario" />
            </Route>
          </Fragment>
        )}
      </Switch>
    </div>
  );
}

export default App;
