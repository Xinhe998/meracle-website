import { connect } from "react-redux";
import { userLogout } from "../../../store/user";
import { getUserData } from "../../../store/userDetail";

import Logout from "../components/Logout";
const userDispatchToProps = {
  userLogout,
  getUserData
};

const userStateToProps = state => ({
  user: state.user,
  user_detail: state.user_detail
});
export default connect(userStateToProps, userDispatchToProps)(Logout);
