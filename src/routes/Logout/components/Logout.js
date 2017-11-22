import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
const project = require("../../../../project.config");

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
    const userData = {
      account: "",
      authorization: ""
    };
    const userDeailData = {
      name: "",
      gender: "",
      birth: "",
      avatar: "",
      address: ""
    };
    localStorage.clear();
    this.props.userLogout(userData);
    this.props.getUserData(userDeailData);
    browserHistory.push(project.directory);
  };
  render() {
    return <div />;
  }
}
export default Logout;
