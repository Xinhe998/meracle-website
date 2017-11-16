import React, { Component } from "react";
import ReactDom from "react-dom";
import { browserHistory } from "react-router";
import Loading from "../../../components/Loading";
import {
  DatePicker,
  Button,
  Input,
  Radio,
  Form,
  Upload,
  Icon,
  message,
  Modal,
  Checkbox,
  Steps
} from "antd";
import moment from "moment";
import "./EditChild.scss";

const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const RadioGroup = Radio.Group;
const Step = Steps.Step;

class EditChild extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      child_name: sessionStorage.child_editing_name,
      child_gender: "",
      child_birth: sessionStorage.child_editing_birth,
      child_avatar: "",
      isLoading: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchChildData = this.fetchChildData.bind(this);
  }
  async componentWillMount() {
    if (!sessionStorage.child_editing_name) {
      await browserHistory.push("/React/dashboard/Child");
    } else {
      await this.fetchChildData();
      await setTimeout(() => {
        this.setState({
          isLoading: false
        });
      }, 300);
    }
  }

  componentDidMount() {
    // document.title = this.state.title + " | 憶想奇機"
    this.props.form.validateFields();
  }

  fetchChildData = async () => {
    await fetch("https://www.meracle.me/home/api/Member/CdPersonalPage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.user.authorization
      },
      body: JSON.stringify({
        Account: this.props.user.account,
        CdName: this.state.child_name
      })
    })
      .then(res => res.json())
      .then(
        responseJson => {
          if (responseJson.length) {
            console.log(responseJson[0]);
            this.setState({
              child_gender: responseJson[0].Gender,
              child_birth: responseJson[0].Birthday,
              child_avatar: responseJson[0].Imageurl
            });
            this.props.form.setFieldsValue({
              child_gender: responseJson[0].Gender,
              child_avatar: responseJson[0].Imageurl
            });
            console.log("this.state=> ", this.state);
          }
        },
        function(e) {
          console.log(e);
        }
      );
  };
  handleSubmit = async e => {
    var formData = {
      account: "",
      child_name: "",
      child_gender: "",
      child_birth: "",
      child_avatar: ""
    };
    this.props.form.validateFields((err, values) => {
      console.log(values);
      formData.account = this.props.user.account;
      formData.child_name = values.child_name;
      formData.child_gender = values.child_gender;
      formData.child_birth = moment(values.child_birth).format("YYYY-MM-DD");
      formData.child_avatar = sessionStorage.child_avatar;
    });
    console.log("formData ==>", formData);
    await fetch("https://www.meracle.me/home/api/Member/EdlitCdPersonalPage", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.user.authorization
      },
      body: JSON.stringify({
        Account: this.props.user.account,
        CdName: formData.child_name,
        Birthday: formData.child_birth,
        Gender: formData.child_gender
      })
    })
      .then(res => res.json())
      .then(
        function(responseJson) {
          console.log(responseJson);
          switch (responseJson.result) {
            case "新增成功":
              break;
          }
        },
        function(e) {
          console.log(e);
        }
      );
    if (sessionStorage.child_avatar) {
      await fetch("https://www.meracle.me/home/api/Member/ReactPostImage", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.props.user.authorization
        },
        body: JSON.stringify({
          Account: this.props.user.account,
          CdName: formData.child_name,
          FileStr: formData.child_avatar.substring(
            formData.child_avatar.search(",") + 1
          )
        })
      })
        .then(res => res.json())
        .then(
          responseJson => {
            console.log(responseJson);
          },
          function(e) {
            console.log(e);
          }
        );
    }
    await Modal.success({
      title: "成功！",
      content: "修改學童資料完成"
    });
    await sessionStorage.clear();
    await browserHistory.push("/React/dashboard/child/");
  };

  //#region 上傳avatar方法
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  beforeUpload = file => {
    console.log("beforeUpload", file);
    this.getBase64(file, child_avatar => {
      this.setState({ child_avatar });
      sessionStorage.child_avatar = child_avatar;
    });
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
    event = event || window.event;
    if (event.target.type !== "file") {
      event.preventDefault();
    }
  };
  //#endregion

  handleNameChange = event => {
    this.setState({ child_name: event.target.value });
  };
  handleGenderChange = event => {
    this.setState({ child_gender: event.target.value });
  };
  handleBirthChange = (date, dateString) => {
    this.setState({ child_birth: dateString });
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
      rules: [{ type: "object", required: true, message: "請選擇生日" }],
      initialValue: moment(this.state.child_birth.toString(), "YYYY-MM-DD")
    };
    const childNameError =
      isFieldTouched("child_name") && getFieldError("child_name");
    const childGenderError =
      isFieldTouched("child_gender") && getFieldError("child_gender");
    const childBirthError =
      isFieldTouched("child_birth") && getFieldError("child_birth");
    const childAatarError =
      isFieldTouched("child_avatar") && getFieldError("child_avatar");
    const avatarError = isFieldTouched("upload") && getFieldError("upload");

    function disabledDate(current) {
      // Can not select days after today
      return current && current.valueOf() > Date.now();
    }
    const child_avatar = this.state.child_avatar;
    return (
      <div>
        {isLoading && <Loading />}
        <Form>
          <FormItem
            label="孩子大頭貼"
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
              >
                {child_avatar ? (
                  <img
                    src={
                      "https://www.meracle.me/home/Filefolder/" + child_avatar
                    }
                    alt=""
                    className="avatar"
                  />
                ) : (
                  <Icon type="plus" className="avatar-uploader-trigger" />
                )}
              </Upload>
            )}
          </FormItem>
          <FormItem
            label="孩童姓名"
            validateStatus={childNameError ? "error" : ""}
            help={childNameError || ""}
          >
            {getFieldDecorator("child_name", {
              rules: [{ required: true, message: "請輸入孩童姓名" }],
              initialValue: this.state.child_name
            })(
              <Input
                className="form-control"
                type="text"
                onChange={this.handleNameChange}
                disabled={true}
              />
            )}
          </FormItem>
          <FormItem
            label="孩童性別"
            validateStatus={childGenderError ? "error" : ""}
            help={childGenderError || ""}
          >
            {getFieldDecorator("child_gender", {
              rules: [{ required: true, message: "請選擇孩童性別" }],
              initialValue: this.state.child_gender
            })(
              <RadioGroup onChange={this.handleGenderChange}>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="孩童生日"
            validateStatus={childBirthError ? "error" : ""}
            help={childBirthError || ""}
          >
            {getFieldDecorator("child_birth", config)(
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
          <Button
            size="large"
            onClick={() => {
              browserHistory.push("/React/dashboard/Child");
              sessionStorage.clear();
            }}
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            取消
          </Button>
        </Form>
      </div>
    );
  }
}
var FileUpload = React.createClass({
  handleFile: function(e) {
    var reader = new FileReader();
    var file = e.target.files[0];

    if (!file) return;

    reader.onload = function(img) {
      ReactDom.findDOMNode(this.refs.in).value = "";
      this.props.handleFileChange(img.target.result);
    }.bind(this);
    reader.readAsDataURL(file);
  },

  render: function() {
    return (
      <input ref="in" type="file" accept="image/*" onChange={this.handleFile} />
    );
  }
});
export default Form.create()(EditChild);
