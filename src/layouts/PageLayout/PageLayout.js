import React from "react";
import { IndexLink, Link } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "antd";

import "./PageLayout.scss";
require("bootstrap");
import "bootstrap/js/dist/util";
import "bootstrap/js/dist/dropdown";
import { userLogin } from "../../store/user";
const project = require("../../../project.config");
// const isLogin = this.props.user;
class PageLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };
  constructor(props) {
    super(props);
    this.state = {
      isScrollTop: true
    };
    this.handleScroll = this.handleScroll.bind(this);
    if (
      localStorage.getItem("state_user") &&
      localStorage.getItem("state_user") !== "undefined"
    ) {
      if (JSON.parse(localStorage.getItem("state_user")).account) {
        let data = {
          account: JSON.parse(localStorage.getItem("state_user")).account,
          authorization: JSON.parse(localStorage.getItem("state_user"))
            .authorization
        };
        // this.props.userLogin(data);
      }
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll(event) {
    var y =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (y === 0) {
      document.getElementById("navbar").classList.remove("not-in-top");
    } else {
      document.getElementById("navbar").classList.add("not-in-top");
    }
  }
  render() {
    const isLogin = this.props.user ? this.props.user.account : this.props.user;
    return (
      <div className="meracle-navbar">
        <nav
          className="navbar navbar-expand-md navbar-light bg-light"
          id="navbar"
        >
          <IndexLink className="navbar-brand" to={project.directory}>
            <img
              src={require("../../components/assets/logo_no_background.png")}
              className="d-inline-block align-top meracle-navbar-logo"
              alt=""
            />
          </IndexLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {/* <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li> */}
              {!isLogin && (
                <li className="nav-item">
                  <Link
                    to={project.directory + "login"}
                    className="nav-link"
                    activeClassName="active"
                  >
                    登入
                  </Link>
                </li>
              )}
              {!isLogin && (
                <li className="nav-item">
                  <Button className="joinus-btn">加入我們</Button>
                </li>
              )}
              {isLogin && (
                <li className="nav-item">
                  <Link
                    to={project.directory + "dashboard/"}
                    className="nav-link"
                    activeClassName="active"
                  >
                    管理
                  </Link>
                </li>
              )}
              {isLogin && (
                <li className="nav-item">
                  <Link
                    to={project.directory + "logout"}
                    className="nav-link"
                    activeClassName="active"
                  >
                    登出
                  </Link>
                </li>
              )}

              {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown link
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li> */}
            </ul>
          </div>
        </nav>
        <div className="page-layout__viewport">{this.props.children}</div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  userLogin
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);
