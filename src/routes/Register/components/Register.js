import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import Loading from "../../../components/Loading";
import "./Register.scss";
import {
  DatePicker,
  Button,
  Input,
  AutoComplete,
  Radio,
  Form,
  Icon,
  Tooltip
} from "antd";
import Login from "../../../routes/Login/containers/LoginContainer";
import ForgetPassword from "../../../routes/ForgetPassword/containers/ForgetPasswordContainer";
const project = require("../../../../project.config");
// import './HomeView.scss'
const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const Option = AutoComplete.Option;
const RadioGroup = Radio.Group;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      checkPassword: "",
      name: "",
      gender: "",
      birth: "",
      address: "",
      isLoading: true,
      checkPasswordError: "",
      result: [],
      curStep: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // document.title = this.state.title + " | 憶想奇機"
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 300);
    this.props.form.validateFields();
  }
  handleSubmit = async e => {
    e.preventDefault();
    var formData = {
      account: "",
      password: "",
      name: "",
      gender: "",
      birth: "",
      address: "",
      confirmDirty: false
    };
    var isOk = false;
    this.props.form.validateFields((err, values) => {
      formData.account = this.state.account;
      formData.password = this.state.password;
      formData.name = values.name;
      formData.gender = values.gender;
      formData.birth = values.birth;
      formData.address = values.address;
      if (!err) {
        isOk = true;
      }
    });

    var curStep = 1;
    if (isOk) {
      await fetch("https://www.meracle.me/home/api/Member/Register", {
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
          Gender: formData.gender
        })
      })
        .then(res => res.json())
        .then(
          function(responseJson) {
            console.log(responseJson);
            switch (responseJson.result) {
              case "註冊成功，請去登入":
                // browserHistory.push(project.directory + "Login");
                curStep = 3;
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
      await this.setState({
        curStep: curStep
      });
    }
  };
  handleSearch = value => {
    let result;
    if (!value || value.indexOf("@") >= 0) {
      result = [];
    } else {
      result = ["gmail.com", "yahoo.com.tw", "hotmail.com"].map(
        domain => `${value}@${domain}`
      );
    }
    this.setState({ result });
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
  handleBirthChange = (date, dateString) => {
    this.setState({ birth: dateString });
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("密碼不一致");
    } else {
      callback();
    }
  };
  toSecondStep = () => {
    this.setState({
      curStep: 2
    });
  };
  handleLogin = () => {
    this.setState({
      isHandlingLogin: true,
      isHandlingRegister: false,
      isHandlingForgetPassword: false
    });
    document.body.classList.add("overlay-open");
  };
  stopLogin = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingForgetPassword: false,
      isHandlingRegister: false
    });
    document.body.classList.remove("overlay-open");
  };

  handleRegister = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingForgetPassword: false,
      isHandlingRegister: true
    });
    document.body.classList.add("overlay-open");
  };
  stopRegister = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingRegister: false,
      isHandlingForgetPassword: false
    });
    document.body.classList.remove("overlay-open");
  };

  handleForgetPassword = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingRegister: false,
      isHandlingForgetPassword: true
    });
    document.body.classList.add("overlay-open");
  };
  stopForgetPassword = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingRegister: false,
      isHandlingForgetPassword: false
    });
    document.body.classList.remove("overlay-open");
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const isLoading = this.state.isLoading;
    const { result } = this.state;
    const children = result.map(email => {
      return <Option key={email}>{email}</Option>;
    });
    const accountError = isFieldTouched("account") && getFieldError("account");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    const nameError = isFieldTouched("name") && getFieldError("name");
    const genderError = isFieldTouched("gender") && getFieldError("gender");
    const birthError = isFieldTouched("birth") && getFieldError("birth");

    const addressError = isFieldTouched("address") && getFieldError("address");
    const checkPasswordError =
      isFieldTouched("checkPassword") && getFieldError("checkPassword");
    const config = {
      rules: [{ type: "object", required: true, message: "請選擇生日" }]
    };
    function disabledDate(current) {
      // Can not select days after today
      return current && current.valueOf() > Date.now();
    }
    var formOverlayStyle = {
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
      height: "105vh",
      WebkitAlignItems: "center",
      alignItems: "center",
      WebkitJustifyContent: "center",
      justifyContent: "center",
      position: "absolute",
      zIndex: 5000,
      top: this.state.scrollY,
      left: 0,
      overflowY: "hidden"
    };
    const isHandlingLogin = this.state.isHandlingLogin;
    const isHandlingForgetPassword = this.state.isHandlingForgetPassword;
    return (
      <div>
        {isHandlingLogin && (
          <div style={formOverlayStyle} className="formOverlay">
            <img
              src={require("../../../components/assets/logo_no_background.png")}
              className="d-inline-block align-top meracle-index-logo"
              alt=""
            />
            <h1>登入</h1>
            <p>
              還沒有憶想奇蹟帳號？ <a onClick={this.handleRegister}>註冊</a>
            </p>
            <Tooltip placement="bottom" title={"關閉"}>
              <Icon type="close" onClick={this.stopLogin} />
            </Tooltip>
            <div className="form-card">
              <Login />
              <div className="bottom-btn-wrapper">
                <Link onClick={this.handleForgetPassword}>忘記密碼？</Link>
              </div>
            </div>
          </div>
        )}
        {isHandlingForgetPassword && (
          <div style={formOverlayStyle} className="formOverlay">
            <img
              src={require("../../../components/assets/logo_no_background.png")}
              className="d-inline-block align-top meracle-index-logo"
              alt=""
            />
            <h1>忘記密碼</h1>
            <p>
              <Link onClick={this.handleLogin}>登入</Link>{" "}
              <Link onClick={this.handleRegister}>重新註冊</Link>
            </p>
            <Tooltip placement="bottom" title={"關閉"}>
              <Icon type="close" onClick={this.stopForgetPassword} />
            </Tooltip>
            <div className="form-card">
              <ForgetPassword />
            </div>
          </div>
        )}
        <Form onSubmit={this.handleSubmit} className="register-form">
          {this.state.curStep === 1 && (
            <FormItem
              label="E-mail"
              validateStatus={accountError ? "error" : ""}
              help={accountError || ""}
            >
              {getFieldDecorator("account", {
                rules: [
                  { required: true, type: "email", message: "請輸入E-mail" }
                ]
              })(
                <Input
                  className="form-control"
                  type="text"
                  onChange={this.handleAccountChange}
                />
              )}
            </FormItem>
          )}
          {this.state.curStep === 1 && (
            <FormItem
              label="密碼"
              validateStatus={passwordError ? "error" : ""}
              help={passwordError || ""}
            >
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "請輸入密碼" }]
              })(
                <Input
                  className="form-control"
                  type="password"
                  onChange={this.handlePasswordChange}
                />
              )}
            </FormItem>
          )}
          {this.state.curStep === 1 && (
            <FormItem
              label="確認密碼"
              validateStatus={checkPasswordError ? "error" : ""}
              help={checkPasswordError || ""}
            >
              {getFieldDecorator("checkPassword", {
                rules: [
                  {
                    required: true,
                    message: "請輸入確認密碼"
                  },
                  {
                    validator: this.checkPassword
                  }
                ]
              })(
                <Input
                  className="form-control"
                  type="password"
                  onBlur={this.handleConfirmBlur}
                  onChange={this.handleCheckPasswordChange}
                />
              )}
            </FormItem>
          )}
          {this.state.curStep === 1 && (
            <div className="bottom-btn-wrapper">
              <Button
                size="large"
                onClick={this.toSecondStep}
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                className="meracle-outline-btn"
              >
                註冊
              </Button>
            </div>
          )}
          {this.state.curStep === 2 && (
            <FormItem
              label="姓名"
              validateStatus={nameError ? "error" : ""}
              help={nameError || ""}
            >
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "請輸入姓名" }]
              })(
                <Input
                  className="form-control"
                  type="text"
                  onChange={this.handleNameChange}
                />
              )}
            </FormItem>
          )}
          {this.state.curStep === 2 && (
            <FormItem
              label="性別"
              validateStatus={genderError ? "error" : ""}
              help={genderError || ""}
            >
              {getFieldDecorator("gender")(
                <RadioGroup onChange={this.handleGenderChange}>
                  <Radio value="男">男</Radio>
                  <Radio value="女">女</Radio>
                </RadioGroup>
              )}
            </FormItem>
          )}
          {this.state.curStep === 2 && (
            <FormItem
              label="地址"
              validateStatus={addressError ? "error" : ""}
              help={addressError || ""}
            >
              {getFieldDecorator("address", {
                rules: [{ required: false }]
              })(
                <Input
                  className="form-control"
                  type="text"
                  onChange={this.handleAddressChange}
                />
              )}
            </FormItem>
          )}
          {this.state.curStep === 2 && (
            <FormItem
              label="生日"
              validateStatus={birthError ? "error" : ""}
              help={birthError || ""}
            >
              {getFieldDecorator("birth", config)(
                <DatePicker
                  onChange={this.handleBirthChange}
                  placeholder="請選擇生日"
                  disabledDate={disabledDate}
                />
              )}
            </FormItem>
          )}
          {this.state.curStep === 2 && (
            <div className="bottom-btn-wrapper">
              <Button
                size="large"
                onClick={this.handleSubmit}
                htmlType="submit"
                disabled={
                  !(
                    this.state.name &&
                    this.state.gender &&
                    this.state.birth &&
                    this.state.address
                  )
                }
                className="meracle-outline-btn"
              >
                完成
              </Button>
            </div>
          )}
          <div>
            {this.state.curStep === 3 &&
              (this.state.gender === "女" ? (
                <div>
                  <div className="avatar-wrapper">
                    <img
                      src={require("../assets/img_girl.png")}
                      className="d-inline-block align-top meracle-avatar"
                      alt=""
                      draggable="false"
                    />
                  </div>
                  <p className="register-name">{this.state.name + " "} 小姐</p>
                  <br />
                  <p className="register-email">{this.state.account}</p>
                  {/* <Button
                    size="large"
                    className="meracle-btn"
                    onClick={this.handleLogin}
                  >
                    去登入
                  </Button> */}
                </div>
              ) : (
                <div>
                  <div className="register-avatar-wrapper">
                    <img
                      src={require("../assets/img_boy.png")}
                      className="d-inline-block align-top meracle-avatar"
                      alt=""
                      draggable="false"
                    />
                  </div>
                  <p className="register-name">{this.state.name + " "} 先生</p>
                  <br />
                  <p className="register-email">{this.state.account}</p>
                  {/* <Button
                    size="large"
                    className="meracle-btn"
                    onClick={this.handleLogin}
                  >
                    去登入
                  </Button> */}
                </div>
              ))}
          </div>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Register);
