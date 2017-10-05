import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'public_data',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const PublicData = require('./containers/PublicDataContainer').default
      const reducer = require('./modules/PublicData').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'user_detail', reducer })

      /*  Return getComponent   */
      cb(null, PublicData)

    /* Webpack named bundle   */
    }, 'user')
  }
})
