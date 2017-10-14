import React from "react";
import PropTypes from "prop-types";
import { browserHistory, Link } from "react-router";
import { Card, Icon, Button } from "antd";

// import './HomeView.scss'
export default class Profile extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.preventAnonymousAccess();
    this.getProfileData();
  }
  preventAnonymousAccess = () => {
    if (
      !this.props.user &&
      !localStorage.getItem("account") &&
      !localStorage.getItem("authorization")
    ) {
      alert("請先登入");
      browserHistory.push("/Login");
    }
  };
  getProfileData = async () => {
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
      <div>
        <Card
          style={{ width: "90%" }}
          extra={<Link to="/dashboard/edit_profile">編輯</Link>}
        >
          帳號：{this.props.user.account} <br />
          姓名：{this.props.user_detail.name} <br />
          性別：{this.props.user_detail.gender} <br />
          生日：{this.props.user_detail.birth} <br />
        </Card>
        {/* <Button type="dashed" onClick={this.add} style={{ width: "90%", marginTop: "30px" }}>
          <Icon type="plus" /> Add field
        </Button> */}
      </div>
    );
  }
}
