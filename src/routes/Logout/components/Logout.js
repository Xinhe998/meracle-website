import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from 'react-router'
// import './HomeView.scss'
export default class Logout extends React.Component {
  static propTypes = {};
  constructor (props) {
    super(props)
    this.state = {
      account: '',
    }
    this.logout = this.logout.bind(this);
  }
  componentWillMount() {
    this.logout();
  }
  logout = () => {
    const data = {
      
    }
    this.props.userLogout(data);
    browserHistory.push('/')
  }
  render() {
    return (
    <div></div>
    )
  }
}
