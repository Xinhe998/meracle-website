import React, { Component } from "react";
import ReactDOM from "react-dom";
import { browserHistory } from "react-router";
import Loading from "../../../components/Loading";
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';// 加载 CSS
// import './HomeView.scss'
export default class Login extends React.Component {
  constructor () {
    super();
    this.state = {
      account: "",
      password: "",
      checkPassword: "",
      name: "",
      gender: "",
      birth: "",
      address: "",
      job: "",
      isLoading: true,
      checkPasswordError: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount () {
    // document.title = this.state.title + " | 憶想奇機"
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 300)
  }
  handleSubmit = async () => {
    var formData = {
      account: this.state.account,
      password: this.state.password,
      name: this.state.name,
      gender: this.state.gender,
      birth: this.state.birth,
      address: this.state.address,
      job: this.state.job
    };
    console.log(formData);
    await fetch("http://localhost:64323/api/Member/Register", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Account: formData.account,
        Password: formData.password,
        Name: formData.name,
        Address: formData.address,
        Birthday: formData.birth,
        Job: formData.job,
        Gender: formData.gender
      })
    })
      .then(res => res.json())
      .then(
        function(responseJson) {
          console.log(responseJson);
          switch (responseJson.result) {
            case "註冊成功，請去登入":
              alert("註冊成功，請去登入");
              // Clear form
              ReactDOM.findDOMNode(this.refs.textInput).value = "";
              browserHistory.push("/Login");
              break;
            case "帳號重複":
              alert("帳號重複");
              break;
            case "註冊失敗":
              alert("註冊失敗");
              break;
          }
        },
        function(e) {
          console.log(e);
        }
      );
  };
  handleAccountChange = event => {
    this.setState({ account: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  handleCheckPasswordChange = event => {
    this.setState({ checkPassword: event.target.value });
    if (event.target.value !== this.state.password) {
      this.setState({
        checkPasswordError: "密碼不一致"
      });
    } else {
      this.setState({
        checkPasswordError: ""
      });
    }
  };
  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };
  handleGenderChange = event => {
    this.setState({ gender: event.target.value });
  };
  handleAddressChange = event => {
    this.setState({ address: event.target.value });
  };
  handleBirthChange = event => {
    this.setState({ birth: event.target.value });
  };
  handleJobChange = event => {
    this.setState({ job: event.target.value });
  };
  render () {
    const isLoading = this.state.isLoading;
    return (
      <div>
        {isLoading && <Loading />}
        <form>
          <label>
            Email：
            <input
              type="text"
              className="form-control"
              value={this.state.account}
              onChange={this.handleAccountChange}
            />
          </label>
          <br />
          <label>
            密碼：
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </label>
          <br />
          <label>
            確認密碼：
            <input
              type="password"
              className="form-control"
              value={this.state.CheckPassword}
              onChange={this.handleCheckPasswordChange}
            />
            <span>{this.state.checkPasswordError}</span>
          </label>
          <br />
          <label>
            姓名：
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </label>
          <br />
          <label>
            性別：
            <input
              type="text"
              className="form-control"
              value={this.state.gender}
              onChange={this.handleGenderChange}
            />
          </label>
          <br />
          <label>
            地址：
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={this.handleAddressChange}
            />
          </label>
          <br />
          <label>
            生日：
            <DatePicker />
            <input
              type="date"
              className="form-control"
              value={this.state.birth}
              onChange={this.handleBirthChange}
            />
          </label>
          <br />
          <label>
            職業：
            <input
              type="text"
              className="form-control"
              value={this.state.job}
              onChange={this.handleJobChange}
            />
          </label>
          <br />
          <input type="button" value="註冊" onClick={this.handleSubmit} />
        </form>
      </div>
    )
  }
}
