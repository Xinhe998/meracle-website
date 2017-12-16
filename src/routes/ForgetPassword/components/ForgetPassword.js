import React from "react";
import PropTypes from "prop-types";
import Loading from "../../../components/Loading";
import { Button, Input, Form } from "antd";
import { Link } from "react-router";
import "./ForgetPassword.scss";
// import './HomeView.scss'
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class ForgetPassword extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      account: ""
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
      Account: ""
    };
    var isOk = false;
    this.props.form.validateFields((err, values) => {
      formData.account = values.account;
      if (!err) {
        isOk = true;
      }
    });
    if (isOk) {
      await fetch(project.api.url + "api/Member/ForgetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Account: formData.account
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
              case "帳號錯誤":
                break;
            }
          },
          function(e) {
            console.log(e);
          }
        );
    }
  };
  handleAccountChange = event => {
    this.setState({ account: event.target.value });
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
    return (
      <Form onSubmit={this.handleSubmit} className="forget-password-form">
        {isLoading && <Loading />}
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
        <div className="bottom-btn-wrapper">
          <Button
            size="large"
            onClick={this.handleSubmit}
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            className="meracle-outline-btn"
          >
            送出
          </Button>
        </div>
      </Form>
    );
  }
}
export default Form.create()(ForgetPassword);
