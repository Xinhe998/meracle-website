import React from "react";
import PropTypes from "prop-types";
import Halogen from "halogen";
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
  componentDidMount() {
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
          function(responseJson) {
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
            }
          },
          function(e) {
            console.log(e);
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
    var color = "#064065";
    var overlayStyle = {
      display: "-webkit-flex",
      display: "flex",
      WebkitFlex: "0 1 auto",
      flex: "0 1 auto",
      WebkitFlexDirection: "column",
      flexDirection: "column",
      WebkitFlexGrow: 1,
      flexGrow: 1,
      WebkitFlexShrink: 0,
      flexShrink: 0,
      width: "100%",
      height: "100%",
      WebkitAlignItems: "center",
      alignItems: "center",
      WebkitJustifyContent: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.9)",
      position: "absolute",
      zIndex: 100,
      top: 0,
      left: 0
    };
    const isLoading = this.state.isLoading;
    return (
      <div className="form-group">
        {isLoading && (
          <div style={overlayStyle}>
            <Halogen.BeatLoader color={color} size="20px" margin="6px" />
          </div>
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
    );
  }
}
