import { connect } from 'react-redux'
import { userLogout } from '../modules/Logout'

import Logout from '../components/Logout'
const userDispatchToProps = {
  userLogout
}

const userStateToProps = (state) => ({
  user : state.user
})
export default connect(userStateToProps, userDispatchToProps)(Logout)