import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
import { Card, Icon, Button } from "antd";

// import './HomeView.scss'
export default class Child extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.preventAnonymousAccess();
    this.getChildData();
  }
  preventAnonymousAccess = () => {
    if (!this.props.user) {
      alert("請先登入");
      browserHistory.push("/Login");
    }
  };
  getChildData = async () => {
    await fetch("http://meracal.azurewebsites.net/api/Member/CdPersonalPage", {
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
          if (responseJson.length) {
            const data = {
              name: responseJson[0].CdName,
              gender: responseJson[0].Gender.trim(),
              birth: responseJson[0].Birthday,
              address: responseJson[0].Address,
              avatar: responseJson[0].Imageurl
            };
            console.log(responseJson);
            this.props.getChildData(data);
          }
        },
        function(e) {
          console.log(e);
        }
      );
  };
  render() {
    return (
      <div>
        <Card style={{ width: "90%" }}>
          {/* 帳號：{this.props.user.account} <br />
          姓名：{this.props.child_detail.name} <br />
          性別：{this.props.child_detail.gender} <br />
          生日：{this.props.child_detail.birth} <br /> */}
        </Card>
        {/* <Button type="dashed" onClick={this.add} style={{ width: "90%", marginTop: "30px" }}>
          <Icon type="plus" /> Add field
        </Button> */}
      </div>
    );
  }
}
