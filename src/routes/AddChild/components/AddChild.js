import React, { Component } from "react";
import ReactDOM from "react-dom";
import { browserHistory } from "react-router";
import Loading from "../../../components/Loading";
import { DatePicker, Button, Input, Radio, Form } from "antd";
import AvatarCropper from "react-avatar-cropper";
// import './HomeView.scss'
const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const RadioGroup = Radio.Group;
class AddChild extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      child_name: "",
      child_gender: "",
      child_birth: "",
      child_avatar: "",
      child_sleep_time: "",
      child_conditions: "",
      child_food: "",
      child_eat_cereal: false,
      child_eat_meat: false,
      child_eat_milk: false,
      child_eat_fruit: false,
      child_eat_veg: false,
      isLoading: true,
      img: '../../../../src/components/assets/logo_no_background.png'
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
  componentWillMount() {
    this.preventAnonymousAccess();
  }
  preventAnonymousAccess = () => {
    if (!this.props.user) {
      alert("請先登入");
      browserHistory.push("/Login");
    }
  };
  handleSubmit = async e => {
    var formData = {
      account: "",
      child_name: "",
      child_gender: "",
      child_birth: "",
      child_avatar: ""
    };
    var isOk = false;
    this.props.form.validateFields((err, values) => {
      formData.account = values.account;
      formData.child_name = values.child_name;
      formData.child_gender = values.child_gender;
      formData.child_birth = values.child_birth;
      formData.child_avatar = values.child_avatar;
      if (!err) {
        isOk = true;
      }
    });
    console.log(formData);
    if (isOk) {
      await fetch("http://meracal.azurewebsites.net/api/Member/CdRegister", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Account: formData.account,
          CdName: formData.child_name,
          Birthday: formData.child_birth,
          Gender: formData.child_gender,
          Imageurl: formData.image
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
                this.setState({ fireRedirect: true });
                break;
              case "帳號重複":
                alert("帳號重複");
                break;
            }
          },
          function(e) {
            console.log(e);
          }
        );
    }
  };
  handleSurveySubmit = async () => {
    var formData = {
      account: this.props.user.account,
      child_name: this.props.child.child_name,
      child_sleep_time: this.state.child_sleep_time,
      child_conditions: this.state.child_conditions,
      child_eat_cereal: this.state.child_eat_cereal,
      child_eat_fruit: this.state.child_eat_fruit,
      child_eat_meat: this.state.child_eat_meat,
      child_eat_milk: this.state.child_eat_milk,
      child_eat_veg: this.state.child_eat_veg
    };
    console.log(formData);
    await fetch("http://meracal.azurewebsites.net/api/Survey/Questionnaire", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Account: formData.account,
        CdName: formData.child_name,
        Problem: formData.child_conditions,
        Avg_Sleep: formData.child_sleep_time,
        Eat_Fruit: formData.child_eat_fruit,
        Eat_Veg: formData.child_eat_veg,
        Eat_Cereal: formData.child_eat_cereal,
        Eat_Meat: formData.child_eat_meat,
        Eat_Milk: formData.child_eat_veg
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
              this.setState({ fireRedirect: true });
              break;
            case "帳號重複":
              alert("帳號重複");
              break;
          }
        },
        function(e) {
          console.log(e);
        }
      );
  };
  handleNameChange = event => {
    this.setState({ child_name: event.target.value });
  };
  handleGenderChange = event => {
    this.setState({ child_gender: event.target.value });
  };
  handleAvatarChange = event => {
    this.setState({ child_avatar: event.target.value });
  };
  handleBirthChange = (date, dateString) => {
    this.setState({ child_birth: dateString });
  };
  handleSleepTimeChange = event => {
    this.setState({ child_sleep_time: event.target.value });
  };
  handleFoodChange = event => {
    switch (event.target.value) {
      case "全榖根莖類":
        this.setState({ child_eat_cereal: event.target.checked });
        break;
      case "蛋豆魚肉類":
        this.setState({ child_eat_meat: event.target.checked });
        break;
      case "乳製品":
        this.setState({ child_eat_milk: event.target.checked });
        break;
      case "蔬菜類":
        this.setState({ child_eat_veg: event.target.checked });
        break;
      case "水果類":
        this.setState({ child_eat_fruit: event.target.checked });
        break;
    }
    this.setState({ child_food: event.target.value });
  };
  handleConditionChange = event => {
    this.setState({ child_conditions: event.target.value });
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const isLoading = this.state.isLoading;
    const config = {
      rules: [{ type: "object", required: true, message: "請選擇生日" }]
    };
    const childNameError =
      isFieldTouched("child_name") && getFieldError("child_name");
    const childGenderError = isFieldTouched("child_gender") && getFieldError("child_gender");
    const childBirthError = isFieldTouched("child_birth") && getFieldError("child_birth");
    const childAatarError = isFieldTouched("child_avatar") && getFieldError("child_avatar");
    const checkPasswordError =
      isFieldTouched("checkPassword") && getFieldError("checkPassword");
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {isLoading && <Loading />}
        <FormItem
          label="孩童姓名"
          validateStatus={childNameError ? "error" : ""}
          help={childNameError || ""}
        >
          {getFieldDecorator("child_name", {
            rules: [{ required: true, message: "請輸入孩童姓名" }]
          })(
            <Input
              className="form-control"
              type="text"
              onChange={this.handleNameChange}
            />
          )}
        </FormItem>
        <FormItem
          label="孩童性別"
          validateStatus={childGenderError ? "error" : ""}
          help={childGenderError || ""}
        >
          {getFieldDecorator("child_gender")(
            <RadioGroup onChange={this.handleGenderChange}>
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          label="孩童生日"
          validateStatus={childBirthError ? "error" : ""}
          help={childBirthError || ""}
        >
          {getFieldDecorator("child_birth", config)(
            <DatePicker onChange={this.handleBirthChange} placeholder="請選擇生日" />
          )}
        </FormItem>
          <label>
            孩子大頭貼：
            <input
              type="file"
              className="form-control"
              value={this.state.child_avatar}
              onChange={this.handleAvatarChange}
            />
            <AvatarCropper
              onRequestHide={this.handleRequestHide}
              onCrop={this.handleCrop}
              image={this.state.img}
              width={400}
              height={400}
            />
          </label>
          <br />
         
        <hr />
          <p>兒童調查</p>
          <label>
            孩童目前情況(單選)：
            <label className="radio-inline">
              <input
                type="radio"
                name="condition"
                onChange={this.handleConditionChange}
                value="正常"
              />正常
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="condition"
                onChange={this.handleConditionChange}
                value="過動"
              />過動
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="condition"
                onChange={this.handleConditionChange}
                value="自閉"
              />自閉
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="condition"
                onChange={this.handleConditionChange}
                value="學習障礙"
              />學習障礙
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="condition"
                onChange={this.handleConditionChange}
                value="智能障礙"
              />智能障礙
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="condition"
                onChange={this.handleConditionChange}
                value="其他特殊疾病"
              />其他特殊疾病
            </label>
          </label>
          <br />
          <label>
            孩童平均睡眠時間(單選)：
            <label className="radio-inline">
              <input
                type="radio"
                name="sleep"
                onChange={this.handleSleepTimeChange}
                value="6小時以下"
              />6小時以下
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="sleep"
                onChange={this.handleSleepTimeChange}
                value="6-7小時"
              />6-7小時
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="sleep"
                onChange={this.handleSleepTimeChange}
                value="7-8小時"
              />7-8小時
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="sleep"
                onChange={this.handleSleepTimeChange}
                value="8-9小時"
              />8-9小時
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="sleep"
                onChange={this.handleSleepTimeChange}
                value="9-10小時"
              />9-10小時
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="sleep"
                onChange={this.handleSleepTimeChange}
                value="10小時以上"
              />10小時以上
            </label>
          </label>
          <br />
          <label>
            較注重孩童哪方面的飲食(複選)：
            <label className="checkbox-inline">
              <input
                type="checkbox"
                name="food"
                onChange={this.handleFoodChange}
                value="全榖根莖類"
              />全榖根莖類
            </label>
            <label className="checkbox-inline">
              <input
                type="checkbox"
                name="food"
                onChange={this.handleFoodChange}
                value="蛋豆魚肉類"
              />蛋豆魚肉類
            </label>
            <label className="checkbox-inline">
              <input
                type="checkbox"
                name="food"
                onChange={this.handleFoodChange}
                value="乳製品"
              />乳製品
            </label>
            <label className="checkbox-inline">
              <input
                type="checkbox"
                name="food"
                onChange={this.handleFoodChange}
                value="蔬菜類"
              />蔬菜類
            </label>
            <label className="checkbox-inline">
              <input
                type="checkbox"
                name="food"
                onChange={this.handleFoodChange}
                value="水果類"
              />水果類
            </label>
          </label>
          <br />
          <input type="button" value="確定" onClick={this.handleSurveySubmit} />
        </Form>
    );
  }
}
export default Form.create()(AddChild);