import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'edit_profile',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const EditProfile = require('./containers/EditProfileContainer').default
      const reducer = require('./modules/EditProfile').default

      /*  Add the reducer to the store on key 'counter'  */
      // injectReducer(store, { key: 'user_detail', reducer })

      /*  Return getComponent   */
      cb(null, EditProfile)

    /* Webpack named bundle   */
    }, 'counter')
  }
})
