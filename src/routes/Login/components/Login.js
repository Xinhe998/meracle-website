import React from "react";
import PropTypes from "prop-types";
import Loading from "../../../components/Loading";
import { Button, Input, Form, Alert, Modal, Icon } from "antd";
import { Link, browserHistory } from "react-router";
import "./Login.scss";
const project = require("../../../../project.config");
// import './Login.scss'
const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Login extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      isLoading: true,
      showLoginError: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // document.title = this.state.title + " | 憶想奇機";
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
      password: ""
    };
    var isOk = false;
    this.props.form.validateFields((err, values) => {
      formData.account = values.account;
      formData.password = values.password;
      if (!err) {
        isOk = true;
      }
    });
    if (isOk) {
      try {
        await fetch(project.api.url + "api/Member/Login", {
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
            async responseJson => {
              switch (responseJson.result) {
                case "帳號錯誤":
                  this.setState({
                    showLoginError: true
                  });
                  break;
                case "密碼錯誤":
                  this.setState({
                    showLoginError: true
                  });
                  break;
                case "登入成功":
                  const data = {
                    account: responseJson.Account,
                    authorization: responseJson.Authorization
                  };
                  await this.setState(data);
                  await localStorage.setItem("account", data.account);
                  await localStorage.setItem(
                    "authorization",
                    data.authorization
                  );
                  await this.props.userLogin(data);
                  var state_user = JSON.stringify(this.props.user);
                  await localStorage.setItem("state_user", state_user);
                  await browserHistory.push(project.directory + "dashboard/");
                  break;
              }
            },
            function(e) {
              console.log(e);
              Modal.error({
                title: "唉呀",
                content: "網路連線錯誤，請再試一次"
              });
            }
          );
      } catch (e) {}
    }
  };

  handleAccountChange = event => {
    this.setState({ account: event.target.value });
  };
  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const isLoading = this.state.isLoading;
    const isLoginError = this.state.showLoginError;
    const accountError = isFieldTouched("account") && getFieldError("account");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          {isLoginError ? (
            <Alert
              message="帳號或密碼錯誤"
              description="請再試一次"
              type="error"
              showIcon
            />
          ) : null}
          <FormItem
            label="E-mail"
            validateStatus={accountError ? "error" : ""}
            help={accountError || ""}
          >
            {getFieldDecorator("account", {
              rules: [
                {
                  required: true,
                  type: "email",
                  message: "請輸入您註冊時申請的E-mail"
                }
              ]
            })(
              <Input
                className="form-control"
                type="text"
                onChange={this.handleAccountChange}
              />
            )}
          </FormItem>
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
          <br />
          <div className="bottom-btn-wrapper">
            <Button
              size="large"
              onClick={this.handleSubmit}
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
              className="meracle-outline-btn"
            >
              登入
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
// Form.create()(Login);
export default Form.create()(Login);
