import React from "react";
import { IndexLink, Link } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./PageLayout.scss";
import jquery from 'jquery'
const $ = require('jquery')

require('bootstrap')
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';

// const isLogin = this.props.user;
class PageLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // console.log("!!!", this.props)
    const isLogin = this.props.user ? this.props.user.account : this.props.user;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown link
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

        <nav className="navbar navbar-inverse bg-inverse">
          <IndexLink className="navbar-brand" to="#">
            <img src={require('../../components/assets/logo_no_background.png')} className="d-inline-block align-top meracle-navbar-logo" alt="" />
            Meracle
          </IndexLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <IndexLink to="/" activeClassName="page-layout__nav-item--active">
                  Home
                </IndexLink>
              </li>
            </ul>
          </div>

          <div className="container">
            
            {" · "}
            <Link to="/login" activeClassName="page-layout__nav-item--active">
              登入
            </Link>
            {" · "}
            <Link
              to="/Register"
              activeClassName="page-layout__nav-item--active"
            >
              註冊
            </Link>
            {isLogin && " · "}
            {isLogin && (
              <Link
                to="/forget_password"
                activeClassName="page-layout__nav-item--active"
              >
                忘記密碼
              </Link>
            )}
            {isLogin && " · "}
            {isLogin && (
              <Link
                to="/change_password"
                activeClassName="page-layout__nav-item--active"
              >
                修改密碼
              </Link>
            )}
            {isLogin && " · "}
            {isLogin && (
              <Link
                to="/profile"
                activeClassName="page-layout__nav-item--active"
              >
                個人資料
              </Link>
            )}
            {isLogin && " · "}
            {isLogin && (
              <Link
                to="/addChild"
                activeClassName="page-layout__nav-item--active"
              >
                新增孩子
              </Link>
            )}
            {isLogin && " · "}
            {isLogin && (
              <Link
                to="/logout"
                activeClassName="page-layout__nav-item--active"
              >
                登出
              </Link>
            )}
            <div className="page-layout__viewport">{this.props.children}</div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);
