import React from "react";
import { connect } from "react-redux";
import { Layout, Menu, Icon, Tooltip } from "antd";
import PropTypes from "prop-types";
const { Header, Sider, Content } = Layout;
import { IndexLink, Link } from "react-router";
import "./DashboardLayout.scss";
import createStore from "../../store/createStore";

class DashBoardLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };
  constructor(props) {
    super(props);
  }
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  componentWillUnmount() {
    console.log(this.props.user);
    localStorage.setItem("state_user", this.props.user);
  }
  componentWillMount() {
    if (localStorage.getItem("state_user")) {
      const store = createStore(localStorage.getItem("state_user"));
      store.subscribe(() => {
        // user: store.getState().user
      });
      console.log(this.props);
    }
  }
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
            <img
              className="dashboard-avatar"
              src="https://avatars.io/facebook/xinhe998"
              alt=""
            />
          </div>
          <p className="user-name">{this.props.user_detail.name}</p>
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
const mapDispatchToProps = {};

const mapStateToProps = state => ({
  user: state.user,
  user_detail: state.user_detail
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardLayout);
