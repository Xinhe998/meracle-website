import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
// import './HomeView.scss'
class Logout extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      // account: "",
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this.logout();
  }
  logout = () => {
    console.log(this);
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
