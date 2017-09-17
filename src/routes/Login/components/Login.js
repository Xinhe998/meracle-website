import React from "react";
import PropTypes from "prop-types";
// import './HomeView.scss'
export default class Login extends React.Component {
  static propTypes = {};
  constructor (props) {
    super(props)
    this.state = {
      account: '',
      password: '',
    }
    this.logout = this.logout.bind(this);
  }
  logout() {}
  handleSubmit = async () => {
    try {
      var formData = {
        account: this.state.account,
        password: this.state.password
      };
      console.log(formData);
      await fetch("http://localhost:64323/api/Member/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Account: formData.account,
          Password: formData.password
        })
      })
        .then(res => res.json())
        .then(
          function (responseJson) {
            console.log(responseJson);
            switch (responseJson.result) {
                case "帳號錯誤":
                break;
                case "密碼錯誤":
                break;
                case "登入成功":
                    const data = {
                        account: responseJson.account,
                    }
                    this.props.userLogin(data);
                    break;
            }
          },
          function(e) {
            console.log(e);
          }
        )
    } catch (e) {}
  };
  handleAccountChange = event => {
    this.setState({ account: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  render() {
    return (
      <div>
        <form>
          <label>
            帳號：
            <input
              type="text"
              value={this.state.account}
              onChange={this.handleAccountChange}
            />
          </label>
          <br />
          <label>
            密碼：
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </label>
          <br />
          <input type="button" value="登入" onClick={this.handleSubmit} />
        </form>
      </div>
    )
  }
}
