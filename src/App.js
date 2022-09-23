import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Home from "./components/Home";
import Index from "./components/Index";
import Detail from "./components/Detail";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/common/PrivateRoute";
import { currentUser } from "./features/user/userSlice";

import { useSelector } from "react-redux";

function App() {
  const user = useSelector(currentUser);
  return (
    <div className="App">
      <Router basename="/disney-plus-clone">
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/home"
            element={
              <PrivateRoute user={user}>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/movie/:id"
            element={
              <PrivateRoute user={user}>
                <Detail />
              </PrivateRoute>
            }
          />

          <Route exact path="/" element={<Index />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
