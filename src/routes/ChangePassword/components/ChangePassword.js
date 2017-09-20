import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
// import './HomeView.scss'
export default class ChangePassword extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      oldPassword: "",
      newPassword: ""
    };
  }
  componentWillMount () {
    this.preventAnonymousAccess()
  }
  preventAnonymousAccess = () => {
    if (this.props.user) {
      alert("請先登入")
      browserHistory.push("/Login")
    }
  };
  handleSubmit = async () => {
    var formData = {
      Account: this.state.account,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      checkNewPassword: this.state.checkNewPassword
    };
    console.log(formData);
    if (this.checkPassword()) {
      await fetch("http://localhost:64323/api/Member/EditPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Account: formData.account,
          odPassword: formData.oldPassword,
          Password: formData.newPassword
        })
      })
        .then(res => res.json())
        .then(
          function(responseJson) {
            console.log(responseJson);
            switch (responseJson.result) {
              case "修改成功":
                break;
              case "密碼錯誤":
                break;
            }
          },
          function(e) {
            console.log(e);
          }
        );
    } else {
      alert("確認密碼輸入錯誤");
    }
  };
  checkPassword = () => {
    if (this.state.newPassword !== this.state.checkNewPassword) {
      return false;
    } else {
      return true;
    }
  };
  handleAccountChange = event => {
    this.setState({ account: event.target.value });
  };
  handleOldPasswordChange = event => {
    this.setState({ oldPassword: event.target.value });
  };
  handleNewPasswordChange = event => {
    this.setState({ newPassword: event.target.value });
  };
  handleCheckNewPasswordChange = event => {
    this.setState({ checkNewPassword: event.target.value });
  };

  render() {
    return (
      <div>
        <form>
          <label>
            帳號：
            <input
              className="form-control"
              type="text"
              value={this.state.account}
              onChange={this.handleAccountChange}
            />
          </label>
          <br />
          <label>
            舊密碼：
            <input
              className="form-control"
              type="password"
              value={this.state.oldPassword}
              onChange={this.handleOldPasswordChange}
            />
          </label>
          <br />
          <label>
            新密碼：
            <input
              className="form-control"
              type="password"
              value={this.state.newPassword}
              onChange={this.handleNewPasswordChange}
            />
          </label>
          <br />
          <label>
            確認新密碼：
            <input
              className="form-control"
              type="password"
              value={this.state.checkNewPassword}
              onChange={this.handleCheckNewPasswordChange}
            />
          </label>
          <br />
          <input type="button" value="送出" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}
