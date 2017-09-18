// import React from 'react';
// import { Route, IndexRoute } from 'react-router';
import CoreLayout from '../layouts/PageLayout/PageLayout'
import NotFound from "./NotFound";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ForgetPassword from "./ForgetPassword";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import Logout from "./Logout";
import AddChild from "./AddChild";

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = store => (
  {
    path: "/",
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
      Login(store),
      Register(store),
      ForgetPassword(store),
      ChangePassword(store),
      Profile(store),
      Logout(store),
      AddChild(store),
      NotFound,
    ]
  }
);
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
