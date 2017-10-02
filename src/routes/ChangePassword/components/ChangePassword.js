import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
import Loading from "../../../components/Loading";
import { DatePicker, Button, Input, AutoComplete, Radio, Form } from "antd";
// import './HomeView.scss'
const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class ChangePassword extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      oldPassword: "",
      newPassword: "",
      confirmDirty: false
    };
  }
  componentWillMount() {
    this.preventAnonymousAccess();
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
  preventAnonymousAccess = () => {
    if (this.props.user) {
      alert("請先登入");
      browserHistory.push("/Login");
    }
  };
  handleSubmit = async e => {
    e.preventDefault();
    var formData = {
      account: "",
      oldPassword: "",
      newPassword: ""
    };
    var isOk = false;
    this.props.form.validateFields((err, values) => {
      formData.account = values.account;
      formData.oldPassword = values.oldPassword;
      formData.newPassword = values.newPassword;
      if (!err) {
        isOk = true;
      }
    });
    console.log(formData);
    if (isOk) {
      await fetch("http://meracal.azurewebsites.net/api/Member/EditPassword", {
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
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("newPassword")) {
      callback("密碼不一致");
    } else {
      callback();
    }
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const isLoading = this.state.isLoading;
    const accountError = isFieldTouched("account") && getFieldError("account");
    const oldPasswordError =
      isFieldTouched("oldPassword") && getFieldError("oldPassword");
    const newPasswordError =
      isFieldTouched("newPassword") && getFieldError("newPassword");
    const checkNewPasswordError =
      isFieldTouched("checkNewPassword") &&
      getFieldError("checkNewPassword");
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {isLoading && <Loading />}
        <FormItem
          label="E-mail"
          validateStatus={accountError ? "error" : ""}
          help={accountError || ""}
        >
          {getFieldDecorator("account", {
            rules: [{ required: true, type: "email", message: "請輸入E-mail" }]
          })(
            <Input
              className="form-control"
              type="text"
              onChange={this.handleAccountChange}
            />
          )}
        </FormItem>
        <FormItem
          label="舊密碼"
          validateStatus={oldPasswordError ? "error" : ""}
          help={oldPasswordError || ""}
        >
          {getFieldDecorator("oldPassword", {
            rules: [{ required: true, message: "請輸入密碼" }]
          })(
            <Input
              className="form-control"
              type="password"
              onChange={this.handleOldPasswordChange}
            />
          )}
        </FormItem>
        <FormItem
          label="新密碼"
          validateStatus={newPasswordError ? "error" : ""}
          help={newPasswordError || ""}
        >
          {getFieldDecorator("newPassword", {
            rules: [{ required: true, message: "請輸入密碼" }]
          })(
            <Input
              className="form-control"
              type="password"
              onChange={this.handleNewPasswordChange}
            />
          )}
        </FormItem>
        <FormItem
          label="確認新密碼"
          validateStatus={checkNewPasswordError ? "error" : ""}
          help={checkNewPasswordError || ""}
        >
          {getFieldDecorator("checkNewPassword", {
            rules: [
              {
                required: true,
                message: "請輸入密碼"
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
              onChange={this.handleCheckNewPasswordChange}
            />
          )}
        </FormItem>
        <Button
          type="primary"
          size="large"
          onClick={this.handleSubmit}
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
        >
          送出
        </Button>
      </Form>
    );
  }
}
export default Form.create()(ChangePassword);
