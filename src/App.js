import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import history from "./services/history";
import Header from "./components/header/Header"
import Trader from "./pages/trader/Trader";
import Session from "./components/session/session"

const routes = [
  {
    path: "/",
    component: Trader
  },
  {
    path: "/authcode",
    component: Session
  }
];

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Router history={history}>
      <Header />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
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
      </main>
    </Router>
  );
}

export default App;
