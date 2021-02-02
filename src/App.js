import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Trader from "./pages/Trader/Trader";
import Counter from "./pages/counter/Counter"

const routes = [
  {
    path: "/",
    component: Trader
  },
  {
    path: "/counter",
    component: Counter
  }
];

function App() {
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

export default App;
