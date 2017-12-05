import React from "react";
import { IndexLink, Link } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Icon, Tooltip } from "antd";
import Login from "../../routes/Login/containers/LoginContainer";
import Register from "../../routes/Register/containers/RegisterContainer";
import ForgetPassword from "../../routes/ForgetPassword/containers/ForgetPasswordContainer";

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
      isScrollTop: true,
      isHandlingLogin: false,
      isHandlingRegister: false
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
    this.setState({
      scrollY: y
    });
    if (y === 0) {
      document.getElementById("navbar").classList.remove("not-in-top");
    } else {
      document.getElementById("navbar").classList.add("not-in-top");
    }
  }

  handleLogin = () => {
    this.setState({
      isHandlingLogin: true,
      isHandlingRegister: false,
      isHandlingForgetPassword: false,
    });
    document.body.classList.add("overlay-open");
  };
  stopLogin = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingForgetPassword: false,
      isHandlingRegister: false
    });
    document.body.classList.remove("overlay-open");
  };

  handleRegister = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingForgetPassword: false,
      isHandlingRegister: true
    });
    document.body.classList.add("overlay-open");
  };
  stopRegister = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingRegister: false,
      isHandlingForgetPassword: false
    });
    document.body.classList.remove("overlay-open");
  };

  handleForgetPassword = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingRegister: false,
      isHandlingForgetPassword: true
    });
    document.body.classList.add("overlay-open");
  };
  stopForgetPassword = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingRegister: false,
      isHandlingForgetPassword: false
    });
    document.body.classList.remove("overlay-open");
  };

  render() {
    var formOverlayStyle = {
      display: "-webkit-flex",
      display: "flex",
      WebkitFlex: "0 1 auto",
      flex: "0 1 auto",
      WebkitFlexDirection: "column",
      flexDirection: "column",
      WebkitFlexGrow: 1,
      flexGrow: 1,
      WebkitFlexShrink: 0,
      flexShrink: 0,
      width: "100%",
      height: "105vh",
      WebkitAlignItems: "center",
      alignItems: "center",
      WebkitJustifyContent: "center",
      justifyContent: "center",
      position: "absolute",
      zIndex: 5000,
      top: this.state.scrollY,
      left: 0,
      overflowY: "hidden"
    };
    const isLogin = this.props.user ? this.props.user.account : this.props.user;
    const isHandlingLogin = this.state.isHandlingLogin;
    const isHandlingRegister = this.state.isHandlingRegister;
    const isHandlingForgetPassword = this.state.isHandlingForgetPassword;
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
                    onClick={this.handleLogin}
                    className="nav-link"
                    activeClassName="active"
                  >
                    登入
                  </Link>
                </li>
              )}
              {!isLogin && (
                <li className="nav-item">
                  <Button className="joinus-btn" onClick={this.handleRegister}>
                    加入我們
                  </Button>
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
        {isHandlingLogin && (
          <div style={formOverlayStyle} className="formOverlay">
            <img
              src={require("../../components/assets/logo_no_background.png")}
              className="d-inline-block align-top meracle-index-logo"
              alt=""
            />
            <h1>登入</h1>
            <p>
              還沒有憶想奇蹟帳號？ <a onClick={this.handleRegister}>註冊</a>
            </p>
            <Tooltip placement="bottom" title={"關閉"}>
              <Icon type="close" onClick={this.stopLogin} />
            </Tooltip>
            <div className="form-card">
              <Login />
              <div className="bottom-btn-wrapper">
                <Link onClick={this.handleForgetPassword}>忘記密碼？</Link>
              </div>
            </div>
          </div>
        )}
        {isHandlingRegister && (
          <div style={formOverlayStyle} className="formOverlay">
            <img
              src={require("../../components/assets/logo_no_background.png")}
              className="d-inline-block align-top meracle-index-logo"
              alt=""
            />
            <h1>註冊帳號</h1>
            <p>
              已經有憶想奇蹟帳號了？ <a onClick={this.handleLogin}>登入</a>
            </p>
            <Tooltip placement="bottom" title={"關閉"}>
              <Icon type="close" onClick={this.stopRegister} />
            </Tooltip>
            <div className="form-card">
              <Register />
            </div>
          </div>
        )}
        {isHandlingForgetPassword && (
          <div style={formOverlayStyle} className="formOverlay">
            <img
              src={require("../../components/assets/logo_no_background.png")}
              className="d-inline-block align-top meracle-index-logo"
              alt=""
            />
            <h1>忘記密碼</h1>
            <p>
              <Link onClick={this.handleLogin}>登入</Link>{" "}
              <Link onClick={this.handleRegister}>重新註冊</Link>
            </p>
            <Tooltip placement="bottom" title={"關閉"}>
              <Icon type="close" onClick={this.stopForgetPassword} />
            </Tooltip>
            <div className="form-card">
              <ForgetPassword />
            </div>
          </div>
        )}
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
