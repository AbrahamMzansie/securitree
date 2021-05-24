import "./App.css";
import React, { useEffect } from "react";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { isUserLoggedIn } from "./actions/authActions";
import Hierarchy from "./containers/Hierarchy";
import ManageDoor from "./containers/ManageDoor";
import UnlockDoor from "./containers/ManageDoor/UnlockDoor";
import LockDoor  from "./containers/ManageDoor/LockDoor";
import DoorDetails from "./containers/ManageDoor/DoorDetails";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth && !auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);
  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute exact path="/hierarchy" component={Hierarchy} />
        <PrivateRoute exact path="/manage-doors" component={ManageDoor} />
        <PrivateRoute exact path="/lock-doors" component={LockDoor} />
        <PrivateRoute exact path="/unlock-doors" component={UnlockDoor} />
        <PrivateRoute exact path="/:doorId/:doorStatus/doorDetails" component={DoorDetails} />
        <PrivateRoute exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
