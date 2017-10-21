import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'logout',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Logout = require('./containers/LogoutContainer').default
      const userReducer = require('../../store/user').default
      // const userDetailReducer = require('../../store/userDetail').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'user', userReducer })
      // injectReducer(store, { key: 'user', userDetailReducer })

      /*  Return getComponent   */
      cb(null, Logout)

    /* Webpack named bundle   */
    }, 'user')
  }
})
