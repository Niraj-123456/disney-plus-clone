import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Home from "./components/Home";
import Index from "./components/Index";
import Detail from "./components/Detail";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Header />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <ProtectedRoute exact path="/movie/:id" component={Detail} />

          <ProtectedRoute exact path="/home" component={Home} />

          <Route path="/">
            <Index />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
