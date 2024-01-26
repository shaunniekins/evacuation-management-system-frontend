/*!

=========================================================
* Purity UI Dashboard - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/purity-ui-dashboard/blob/master/LICENSE.md)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthProvider } from "context/AuthContext";

import PrivateRoute from "./utils/PrivateRoute";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

ReactDOM.render(
  <HashRouter>
    <Switch>
      {/* <Router> */}
      <AuthProvider>
        {/* <Route path={`/admin`} component={AdminLayout} /> */}
        <Route path={`/auth`} component={AuthLayout} />

        <PrivateRoute path={`/admin`} component={AdminLayout} />
        <Redirect from={`/`} to="/admin/dashboard" />
        {/* <Redirect from={`/auth`} to="/auth/signin" /> */}
      </AuthProvider>
      {/* </Router> */}
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
