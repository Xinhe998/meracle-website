import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";

class Logout extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    console.log(this.props.user);
    this.logout();
  }
  logout = () => {
    const data = {
      account: "",
      authorization: ""
    };
    localStorage.setItem("account", data.account);
    localStorage.setItem("authorization", data.authorization);
    this.props.userLogout(data);
    browserHistory.push("/");
  };
  render() {
    return <div />;
  }
}
export default Logout;
