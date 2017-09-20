import React from "react";
import PropTypes from "prop-types";
import Loading from "../../../components/Loading"
// import './Login.scss'
export default class Login extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      isLoading: true
    };
  }
  componentDidMount () {
    // document.title = this.state.title + " | 憶想奇機";
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 300);
  }
  handleSubmit = async () => {
    try {
      var formData = {
        account: this.state.account,
        password: this.state.password
      };
      console.log(formData)
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
                  account: responseJson.account
                };
                this.props.userLogin(data);
                break;
              case "尚未填寫問卷":
                break;
            }
          },
          function (e) {
            console.log(e)
          }
        );
    } catch (e) {}
  };
  handleAccountChange = event => {
    this.setState({ account: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    const isLoading = this.state.isLoading;
    return (
      <div className="form-group">
        {isLoading && (
          <Loading />
        )}
        <form>
          <label>
            Email：
            <input
              className="form-control"
              type="text"
              value={this.state.account}
              onChange={this.handleAccountChange}
            />
          </label>
          <br />
          <label>
            密碼：
            <input
              className="form-control"
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
