import React from "react";
// Router
import { Router, Switch } from "react-router";
import { createBrowserHistory } from "history";
// App Route Helper for Layouts
import LayoutRoute from "router/LayoutRoute"
// Helpers
import ScrollToTop from "components/helpers/ScrollToTop";
// Pages
import Home from "pages/Home"
import Colors from "pages/demo/Colors"
// Layouts
import NavWithFooter from "layouts/NavWithFooter"

// Create browser history for use with back buttons
export const history = createBrowserHistory();

// AppRouter includes all components in the app that require a router
const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <LayoutRoute path="/" component={Home} layout={NavWithFooter} exact />
        <LayoutRoute path="/demo/colors" component={Colors} layout={NavWithFooter} exact />
        {/* <LayoutRoute
          path="/authenticate"
          component={Authenticate}
          layout={MainLayout}
        />
        <LayoutRoute path="/start" component={Start} layout={MainLayout} />
        <LayoutRoute
          path="/learn"
          component={!!user ? Learn : Authenticate}
          layout={NoFooterMainLayout}
        />
        <LayoutRoute
          path="/calc"
          component={!!user ? Calculator : Authenticate}
          layout={MainLayout}
        />
        <LayoutRoute component={Error} layout={MainLayout} /> */}
      </Switch>
      <ScrollToTop />
    </Router>
  );
};

export default AppRouter;
