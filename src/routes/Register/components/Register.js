import React, { Component } from "react";
import ReactDOM from "react-dom";
import { browserHistory } from "react-router";
import Loading from "../../../components/Loading";
import { DatePicker, Button, Input, AutoComplete, Radio, Form } from "antd";
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
      result: []
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
    console.log(formData)
    this.props.form.validateFields((err, values) => {
      formData.account = values.account;
      formData.password = values.password;
      formData.name = values.name;
      formData.gender = values.gender;
      formData.birth = values.birth;
      formData.address = values.address;
      if (!err) {
        isOk = true;
      }
    });
    if (isOk) {
      await fetch("http://meracle.azurewebsites.net/api/Member/Register", {
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
                alert("註冊成功，請去登入");
                // Clear form
                // ReactDOM.findDOM Node(this.refs.textInput).value = "";
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
  handleAccountChange = val => {
    this.setState({ account: val });
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
        <FormItem
          label="生日"
          validateStatus={birthError ? "error" : ""}
          help={birthError || ""}
        >
          {getFieldDecorator("birth", config)(
            <DatePicker onChange={this.handleBirthChange} placeholder="請選擇生日" />
          )}
        </FormItem>

        <Button
          type="primary"
          size="large"
          onClick={this.handleSubmit}
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
        >
          註冊
        </Button>
      </Form>
    );
  }
}
export default Form.create()(Register);
