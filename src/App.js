import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Sandwich from "./pages/sandwich/sandwich";
import Tacos from "./pages/tacos/tacos";
import App from "./pages/counter/App"

const routes = [
  {
    path: "/",
    component: App
  },
  {
    path: "/sandwich",
    component: Sandwich
  },
  {
    path: "/tacos",
    component: Tacos,
  },
];

export default function RouteConfigExample() {
  return (
    <Router>
        <Switch>
          {routes.map((route) => (
            <Route
              exact
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
    </Router>
  );
}
