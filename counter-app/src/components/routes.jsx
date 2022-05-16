import React, { Component } from "react";
import { useState } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./home";
import Add from "./addProduct";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={Add} path="/add" />
    </BrowserRouter>
  );
};

export default Routes;
