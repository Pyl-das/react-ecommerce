import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import CategoryList from "./components/CategoryList";
import AddCategory from "./components/AddCategory";

import { logout } from "./slices/auth";

import EventBus from "./common/EventBus";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard('admin');
    } else {
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/category-list" element={<CategoryList />}></Route>
        <Route path="/add-category" element={<AddCategory />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App