// import React from 'react';
// import { Route, IndexRoute } from 'react-router';
import PageLayout from "../layouts/PageLayout/PageLayout";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import NotFound from "./NotFound";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ForgetPassword from "./ForgetPassword";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Logout from "./Logout";
import AddChild from "./AddChild";
import Dashboard from "./Dashboard";
import Child from "./Child";
import PublicData from "./PublicData";
import EditChild from "./EditChild";

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = store => [
  {
    path: "/React/",
    component: PageLayout,
    indexRoute: Home,
    childRoutes: [
      Login(store),
      Register(store),
      ForgetPassword(store),
      Logout(store)
    ]
  },
  {
    path: "/React/dashboard/",
    component: DashboardLayout,
    indexRoute: Dashboard(store),
    childRoutes: [
      ChangePassword(store),
      Profile(store),
      Logout(store),
      AddChild(store),
      Child(store),
      EditChild(store),
      EditProfile(store),
      PublicData(store)
    ]
  },
  {
    path: "*",
    component: PageLayout,
    indexRoute: NotFound
  }
];
/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes;
