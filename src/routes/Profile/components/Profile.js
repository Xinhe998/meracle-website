import React from "react";
import PropTypes from "prop-types";
import { browserHistory, Link } from "react-router";
import { Card, Icon, Button } from "antd";
import Loading from "../../../components/Loading";
import "./Profile.scss";
const project = require("../../../../project.config");
// import './HomeView.scss'
export default class Profile extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentWillMount() {
    this.getProfileData();
  }
  componentDidMount() {
    // document.title = this.state.title + " | 憶想奇機";
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 300);
  }
  getProfileData = async () => {
    await fetch(project.api.url + "api/Member/PersonalPage", {
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
    const isLoading = this.state.isLoading;
    return (
      <div>
        {isLoading && <Loading />}
        <Card
          title="用戶資料"
          className="profile-data-wrapper"
          style={{ width: "90%" }}
        >
          <div className="row">
            <div>
              <p>姓名</p>
              <span className="profile-data">
                {this.props.user_detail.name}
              </span>
            </div>
            <div>
              <p>性別</p>
              <span className="profile-data">
                {this.props.user_detail.gender}
              </span>
            </div>
            <div>
              <p>出生年月日</p>
              <span className="profile-data">
                {this.props.user_detail.birth}
              </span>
            </div>
            <div>
              <p>電子信箱</p>
              <span className="profile-data">{this.props.user.account}</span>
            </div>
            <div className="link-wrapper">
              <Link
                to={project.directory + "dashboard/edit_profile/"}
                className="profile-edit-link"
              >
                編輯資料
              </Link>
              <Link
                to={project.directory + "dashboard/change_password/"}
                className="change-password-link"
              >
                修改密碼
              </Link>
            </div>
          </div>
        </Card>
        {/* <Button type="dashed" onClick={this.add} style={{ width: "90%", marginTop: "30px" }}>
          <Icon type="plus" /> Add field
        </Button> */}
      </div>
    );
  }
}
