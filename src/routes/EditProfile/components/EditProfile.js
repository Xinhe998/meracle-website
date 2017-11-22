import React, { Component } from "react";
import ReactDOM from "react-dom";
import { browserHistory } from "react-router";
import Loading from "../../../components/Loading";
import {
  DatePicker,
  Button,
  Input,
  AutoComplete,
  Radio,
  Form,
  Upload,
  Icon,
  message
} from "antd";
import moment from "moment";
import "./EditProfile.scss";
const project = require("../../../../project.config");

const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const Option = AutoComplete.Option;
const RadioGroup = Radio.Group;

class EditProfile extends React.Component {
  static propTypes = {};
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
      avatar: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
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
      name: "",
      gender: "",
      birth: "",
      address: "",
      avatar: "",
      confirmDirty: false
    };
    var isOk = false;
    this.props.form.validateFields((err, values) => {
      formData.name = values.name;
      formData.gender = values.gender;
      formData.birth = moment(values.birth).format("YYYY-MM-DD");
      formData.address = values.address;
      formData.avatar = this.state.avatar;
      if (!err) {
        isOk = true;
      }
    });
    if (isOk) {
      this.setState({
        isLoading: true
      });
      await fetch("https://www.meracle.me/home/api/Member/EdlitPersonalPage", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.props.user.authorization
        },
        body: JSON.stringify({
          Account: this.props.user.account,
          Name: formData.name,
          Address: formData.address,
          Birthday: formData.birth,
          Gender: formData.gender
        })
      }).then(
        responseJson => {
          const data = {
            name: formData.name,
            gender: formData.gender,
            birth: formData.birth,
            address: formData.address
          };
          console.log("data", data);
          this.props.getUserData(data);
        },
        function(e) {
          console.log(e);
        }
      );
      if (this.state.avatar) {
        await fetch("https://www.meracle.me/home/api/Member/ReactPostImage", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.props.user.authorization
          },
          body: JSON.stringify({
            Account: this.props.user.account,
            FileStr: formData.avatar.substring(formData.avatar.search(",") + 1)
          })
        })
          .then(res => res.json())
          .then(responseJson => {}, function(e) {
            console.log(e);
          });
      }

      browserHistory.push(project.directory + "dashboard/profile");
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
    console.log(dateString);
    this.setState({ birth: dateString });
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  //#region 上傳avatar方法
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  beforeUpload = file => {
    console.log("beforeUpload", file);
    this.getBase64(file, avatar => this.setState({ avatar }));
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      message.error("只接受JPG圖片！");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("圖片大小需小於2MB！");
    }
    return false;
  };

  doOpen = event => {
    console.log("!!!!!!!!open");
    event = event || window.event;
    if (event.target.type !== "file") {
      event.preventDefault();
    }
  };
  //#endregion

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const isLoading = this.state.isLoading;
    const { result } = this.state;
    const nameError = isFieldTouched("name") && getFieldError("name");
    const genderError = isFieldTouched("gender") && getFieldError("gender");
    const birthError = isFieldTouched("birth") && getFieldError("birth");
    const addressError = isFieldTouched("address") && getFieldError("address");
    const avatarError = isFieldTouched("upload") && getFieldError("upload");

    const config = {
      rules: [{ type: "object", required: true, message: "請選擇生日" }],
      initialValue: moment(
        this.props.user_detail.birth.toString(),
        "YYYY-MM-DD"
      )
    };
    const avatar = this.state.avatar;

    function disabledDate(current) {
      // Can not select days after today
      return current && current.valueOf() > Date.now();
    }
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {isLoading && <Loading />}
        {this.props.user.account}
        <FormItem
          label="大頭貼"
          extra=""
          validateStatus={avatarError ? "error" : ""}
          help={avatarError || ""}
        >
          {getFieldDecorator("upload", {
            valuePropName: "fileList"
          })(
            <Upload
              className="avatar-uploader"
              name="avatar"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {avatar || this.props.user_detail.avatar ? (
                avatar ? (
                  <img src={avatar} alt="" className="avatar" />
                ) : (
                  <img
                    src={
                      "https://www.meracle.me/home/Filefolder/" +
                      this.props.user_detail.avatar +
                      "?time=" +
                      new Date().getTime()
                    }
                    alt=""
                    className="avatar"
                  />
                )
              ) : (
                <Icon type="plus" className="avatar-uploader-trigger" />
              )}
            </Upload>
          )}
        </FormItem>
        <FormItem
          label="姓名"
          validateStatus={nameError ? "error" : ""}
          help={nameError || ""}
        >
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "請輸入姓名" }],
            initialValue: this.props.user_detail.name
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
          {getFieldDecorator("gender", {
            initialValue: this.props.user_detail.gender
          })(
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
            rules: [{ required: false }],
            initialValue: this.props.user_detail.address
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
            <DatePicker
              onChange={this.handleBirthChange}
              placeholder="請選擇生日"
              disabledDate={disabledDate}
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
export default Form.create()(EditProfile);
