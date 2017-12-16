import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon, Tooltip, Modal, Button } from "antd";
import PropTypes from "prop-types";
const { Header, Sider, Content } = Layout;
import { IndexLink, Link } from "react-router";
import "./DashboardLayout.scss";
import createStore from "../../store/createStore";
import { getUserData } from "../../store/userDetail";
import { userLogin } from "../../store/user";
import { browserHistory } from "react-router";
const project = require("../../../project.config");
const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm;

class DashBoardLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };
  constructor(props) {
    super(props);
    this.getProfileData = this.getProfileData.bind(this);
    if (
      localStorage.getItem("account") &&
      localStorage.getItem("authorization") &&
      localStorage.getItem("account") !== "undefined" &&
      localStorage.getItem("authorization") !== "undefined"
    ) {
      if (localStorage.getItem("account")) {
        this.fetchUserData();
      } else {
        this.preventAnonymousAccess();
      }
    } else {
      this.preventAnonymousAccess();
    }
    var widh = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
    const menuKey = [
      "首頁",
      "測量結果",
      "大眾數據",
      "學童資料",
      "用戶資料",
      "新增學童"
    ];
    this.state = {
      collapsed: widh <= 768,
      selectedTitle: getCookie("selectedKey")
        ? menuKey[getCookie("selectedKey") - 1]
        : "首頁",
      selectedKey: getCookie("selectedKey") ? getCookie("selectedKey") : 0
    };
    document.cookie = "selectedKey=" + this.state.selectedKey;
  }
  windowResize = () => {
    var widh = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    if (widh <= 768) {
      this.setState({
        collapsed: true
      });
    }
  };
  fetchUserData = async () => {
    let data = {
      account: localStorage.getItem("account"),
      authorization: localStorage.getItem("authorization")
    };
    await this.props.userLogin(data);
    await this.getProfileData(data);
  };
  preventAnonymousAccess = () => {
    if (!this.props.user) {
      browserHistory.push(project.directory);
    } else {
      if (!this.props.user.account) {
        browserHistory.push(project.directory);
      }
    }
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  getProfileData = async user => {
    await fetch(project.api.url + "api/Member/PersonalPage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.authorization
      },
      body: JSON.stringify({
        Account: user.account
      })
    })
      .then(res => res.json())
      .then(
        responseJson => {
          const data = {
            name: responseJson[0].Name,
            gender: responseJson[0].Gender.trim(),
            birth: responseJson[0].Birthday,
            address: responseJson[0].Address,
            avatar: responseJson[0].Imageurl
          };
          this.props.getUserData(data);
        },
        function(e) {
          console.log(e);
        }
      );
  };
  confirmLogout = () => {
    confirm({
      title: "您確定要登出嗎？",
      okText: "確定",
      cancelText: "取消",
      wrapClassName: "confirm_logout_modal",
      onOk() {
        browserHistory.push(project.directory + "Logout");
      },
      onCancel() {}
    });
  };
  reloadToIndex = () => {
    browserHistory.push(project.directory);
  };

  handleSiderSelect = async event => {
    const menuKey = [
      "首頁",
      "測量結果",
      "大眾數據",
      "學童資料",
      "用戶資料",
      "新增學童"
    ];
    if (event.key < 7) {
      await this.setState({
        selectedKey: event.key,
        selectedTitle: menuKey[event.key - 1]
      });
    }
    document.cookie = "selectedKey=" + this.state.selectedKey;
  };
  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          className="meracle-sider"
        >
          <div className="sider-wrapper">
            <div className="logo" onClick={this.reloadToIndex}>
              <img
                className="logo-img"
                src={require("../../components/assets/logo_no_background.png")}
                alt=""
              />
              <span>eracle</span>
            </div>
            <div className="avatar-wrapper">
              {this.props.user_detail.avatar !== "" ? (
                <img
                  className="dashboard-avatar"
                  src={
                    project.api.url +
                    "Filefolder/" +
                    this.props.user_detail.avatar +
                    "?time=" +
                    new Date().getTime()
                  }
                  alt=""
                />
              ) : (
                <img
                  className="dashboard-avatar"
                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  alt=""
                />
              )}
            </div>
            <p className="user-name">
              {this.props.user_detail ? this.props.user_detail.name : ""}
            </p>
            <hr />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={
                this.state.selectedKey ? [this.state.selectedKey] : ["1"]
              }
              onSelect={this.handleSiderSelect}
            >
              <Menu.Item key="1">
                <Link
                  to={project.directory + "dashboard/"}
                  className="dashboard-left-link"
                  activeClassName="dashboare-left-link-active"
                >
                  <img
                    className="sider-icon"
                    src={require("./assets/home.png")}
                  />{" "}
                  <span> 首頁 </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link
                  to={project.directory + "dashboard/memory_result"}
                  className="dashboard-left-link"
                  activeClassName="dashboare-left-link-active"
                >
                  <img
                    className="sider-icon"
                    src={require("./assets/graph.png")}
                  />{" "}
                  <span> 測量結果 </span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link
                  to={project.directory + "dashboard/public_data"}
                  className="dashboard-left-link"
                  activeClassName="dashboare-left-link-active"
                >
                  <img
                    className="sider-icon"
                    src={require("./assets/chart.png")}
                  />
                  <span> 大眾數據 </span>
                </Link>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={
                  <Link
                    className="dashboard-left-link"
                    activeClassName="dashboare-left-link-active"
                  >
                    <img
                      className="sider-icon"
                      src={require("./assets/person_white.png")}
                    />
                    <span className="link-sub-title">會員專區</span>
                  </Link>
                }
              >
                <Menu.Item key="4">
                  <Link
                    to={project.directory + "dashboard/Child"}
                    className="dashboard-left-link link-sub-item"
                    activeClassName="dashboare-left-link-active"
                  >
                    <span> 學童資料 </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link
                    to={project.directory + "dashboard/profile"}
                    className="dashboard-left-link link-sub-item"
                    activeClassName="dashboare-left-link-active"
                  >
                    <span> 用戶資料 </span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link
                    to={project.directory + "dashboard/addChild"}
                    className="dashboard-left-link link-sub-item"
                    activeClassName="dashboare-left-link-active"
                  >
                    <span> 新增學童 </span>
                  </Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="7" className="logout-menu-item">
                <Link
                  onClick={this.confirmLogout}
                  className="dashboard-left-link"
                >
                  <img
                    className="sider-icon"
                    src={require("./assets/signout.png")}
                  />
                  <span> 登出 </span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            <span className="document-name">
              {this.state.selectedTitle ? this.state.selectedTitle : null}
            </span>
          </Header>
          <Content
            className="layout-content"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
const mapDispatchToProps = {
  getUserData,
  userLogin
};

const mapStateToProps = state => ({
  user: state.user,
  user_detail: state.user_detail
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardLayout);
