import React from "react";
import { Layout, Menu, Icon } from "antd";
import PropTypes from "prop-types";
const { Header, Sider, Content } = Layout;
import { IndexLink, Link } from "react-router";
import "./DashboardLayout.scss";

export default class DashBoardLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <img
              src="./../../components/assets/logo_no_background.png"
              style={{ width: "100%" }}
            />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link
                to="/dashboard/addChild"
                className="dashboard-left-link"
                activeClassName="dashboare-left-link-active"
              >
                <Icon type="user" /> <span> 新增孩子 </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link
                to="/dashboard/profile"
                className="dashboard-left-link"
                activeClassName="dashboare-left-link-active"
              >
                <Icon type="video-camera" /> <span> 個人資料 </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link
                to="/dashboard/change_password"
                className="dashboard-left-link"
                activeClassName="dashboare-left-link-active"
              >
                <Icon type="upload" /> <span> 修改密碼 </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link
                to="/logout"
                className="dashboard-left-link"
                activeClassName="dashboare-left-link-active"
              >
                <Icon type="upload" /> <span> 登出 </span>
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
