import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon, Tooltip } from "antd";
import PropTypes from "prop-types";
const { Header, Sider, Content } = Layout;
import { IndexLink, Link } from "react-router";
import "./DashboardLayout.scss";
import createStore from "../../store/createStore";
import { getUserData } from "../../store/userDetail";
import { browserHistory } from "react-router";

class DashBoardLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };
  constructor(props) {
    super(props);
    this.getProfileData = this.getProfileData.bind(this);
  }
  state = {
    collapsed: false
  };

  preventAnonymousAccess = () => {
    if (!this.props.user) {
      alert("請先登入");
      browserHistory.push("/Login");
    }
  };
  componentWillUnmount() {
    console.log(this.props.user);
    localStorage.setItem("state_user", this.props.user);
  }
  componentWillMount() {
    this.preventAnonymousAccess();
    if (localStorage.getItem("state_user")) {
      const store = createStore(localStorage.getItem("state_user"));
      store.subscribe(() => {
        // user: store.getState().user
      });
      console.log(this.props);
    }
  }
  componentDidMount() {
    this.getProfileData();
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  getProfileData = async () => {
    console.log(this.props.user);
    await fetch("http://meracal.azurewebsites.net/api/Member/PersonalPage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.user.authorization
      },
      body: JSON.stringify({
        Account: this.props.user.account
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
  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
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
                src={this.props.user_detail.avatar}
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link
                to="/dashboard"
                className="dashboard-left-link"
                activeClassName="dashboare-left-link-active"
              >
                <Icon type="home" /> <span> 首頁 </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link
                to="/dashboard/addChild"
                className="dashboard-left-link"
                activeClassName="dashboare-left-link-active"
              >
                <Icon type="user-add" /> <span> 新增孩子 </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link
                to="/dashboard/Child"
                className="dashboard-left-link"
                activeClassName="dashboare-left-link-active"
              >
                <Icon type="database" /> <span> 學童資料 </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link
                to="/dashboard/profile"
                className="dashboard-left-link"
                activeClassName="dashboare-left-link-active"
              >
                <Icon type="file" /> <span> 個人資料 </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link
                to="/dashboard/change_password"
                className="dashboard-left-link"
                activeClassName="dashboare-left-link-active"
              >
                <Icon type="key" /> <span> 修改密碼 </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link
                to="/dashboard/public_data"
                className="dashboard-left-link"
                activeClassName="dashboare-left-link-active"
              >
                <Icon type="area-chart" /> <span> 大眾數據 </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link
                to="/logout"
                className="dashboard-left-link"
                activeClassName="dashboare-left-link-active"
              >
                <Icon type="logout" /> <span> 登出 </span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
            <span className="document-name">首頁</span>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
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
  getUserData
};

const mapStateToProps = state => ({
  user: state.user,
  user_detail: state.user_detail
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardLayout);
