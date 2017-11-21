import { injectReducer } from '../../store/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const Dashboard = require('./containers/DashboardContainer').default
      const reducer = require('../../store/child').default
      injectReducer(store, { key: 'child', reducer })
      cb(null, Dashboard)

    /* Webpack named bundle   */
    }, 'user')
  }
})
