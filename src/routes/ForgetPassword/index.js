import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'forget_password',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ForgetPassword = require('./containers/ForgetPasswordContainer').default
      // const reducer = require('./modules/counter').default

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'login', reducer })

      /*  Return getComponent   */
      cb(null, ForgetPassword)

    /* Webpack named bundle   */
    }, 'counter')
  }
})
