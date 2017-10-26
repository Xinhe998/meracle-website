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
import "./AddChild.scss";

const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const RadioGroup = Radio.Group;
const Step = Steps.Step;

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
      imageUrl: null,
      current: 0,
      stepStatus: "wait"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.step1 = this.step1.bind(this);
  }

  next() {
    const current = this.state.current + 1;
    console.log("current=>", current);
    if (current === 1) {
      this.step1(event);
    }
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    console.log("current=>", current);
    this.setState({ current });
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
  componentWillMount() {}
  handleSubmit = async e => {
    var formData = {
      account: "",
      child_name: "",
      child_gender: "",
      child_birth: "",
      child_avatar: "",
      child_condition: "",
      child_sleep_time: "",
      child_eat_cereal: null,
      child_eat_fruit: null,
      child_eat_meat: null,
      child_eat_milk: null,
      child_eat_veg: null
    };
    var isOk = false;
    this.props.form.validateFields((err, values) => {
      formData.account = this.props.user.account;
      formData.child_name = values.child_name;
      formData.child_gender = values.child_gender;
      formData.child_birth = moment(values.child_birth).format("YYYY-MM-DD");
      formData.child_avatar = this.state.child_avatar;
      formData.child_condition = values.child_condition;
      if (!err) {
        isOk = true;
      }
    });
    console.log(formData);
    console.log("account:", this.props.user.account);
    console.log("CdName", formData.child_name);
    console.log("Birth", formData.child_birth);
    console.log("Gender", formData.child_gender);
    await fetch("http://meracle.azurewebsites.net/api/Member/CdRegister", {
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
            case "已達新增上限":
              Modal.error({
                title: "唉呀",
                content: "學童數量已達新增上限"
              });
              break;
            case "新增成功":
              browserHistory.push("/profile");
              break;
            case "姓名重複":
              Modal.error({
                title: "唉呀",
                content: "學童姓名不可重複！"
              });
              break;
          }
        },
        function(e) {
          console.log(e);
        }
      );
    if (this.state.child_avatar) {
      await fetch(
        "http://meracle.azurewebsites.net/api/Member/ReactPostImage",
        {
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
        }
      )
        .then(res => res.json())
        .then(responseJson => {}, function(e) {
          console.log(e);
        });
    }
    await fetch("http://meracle.azurewebsites.net/api/Survey/Questionnaire", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.user.authorization
      },
      body: JSON.stringify({
        Account: this.props.user.account,
        CdName: formData.child_name,
        Problem: formData.child_condition
      })
    })
      .then(res => res.json())
      .then(responseJson => {}, function(e) {
        console.log(e);
      });
  };

  //#region 暫存第1步驟data
  step1 = async e => {
    this.props.form.validateFields((err, values) => {
      console.log("values", values);
      console.log("err", err);
      this.setState({
        account: values.account,
        child_name: values.child_name,
        child_gender: values.child_gender,
        child_birth: values.child_birth
      });
    });
    console.log(this.state);
  };
  //#endregion

  //#region 暫存第2步驟data
  step2 = async e => {
    this.props.form.validateFields((err, values) => {
      console.log("values", values);
      console.log("err", err);
      this.setState({
        child_avatar: values.child_avatar
      });
    });
    console.log(this.state);
  };
  //#endregion

  //#region 暫存第3步驟data
  step3 = async e => {
    this.props.form.validateFields((err, values) => {
      console.log("values", values);
      console.log("err", err);
      this.setState({
        child_conditions: values.child_conditions,
        child_sleep_time: values.sleep_time
      });
    });
    console.log(this.state);
  };
  //#endregion

  //#region 上傳avatar方法
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  beforeUpload = file => {
    console.log("beforeUpload", file);
    this.getBase64(file, child_avatar => this.setState({ child_avatar }));
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

  handleChange = info => {
    console.log("!!!!!!!handleChange");
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({ imageUrl })
      );
    } else if (info.file.status === "error") {
      message.error("圖片上傳失敗 !");
    }
  };

  doOpen = event => {
    event = event || window.event;
    if (event.target.type !== "file") {
      event.preventDefault();
    }
  };
  //#endregion

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
    await fetch("http://meracle.azurewebsites.net/api/Survey/Questionnaire", {
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
  handleFoodChange = checkedValues => {
    console.log(checkedValues);
    if (checkedValues.indexOf("全榖根莖類") > -1) {
      this.setState({ child_eat_cereal: true });
    } else {
      this.setState({ child_eat_cereal: false });
    }
    if (checkedValues.indexOf("蛋豆魚肉類") > -1) {
      this.setState({ child_eat_meat: event.target.checked });
    } else {
      this.setState({ child_eat_meat: false });
    }
    if (checkedValues.indexOf("乳製品") > -1) {
      this.setState({ child_eat_milk: true });
    } else {
      this.setState({ child_eat_milk: false });
    }
    if (checkedValues.indexOf("蔬菜類") > -1) {
      this.setState({ child_eat_veg: true });
    } else {
      this.setState({ child_eat_veg: false });
    }
    if (checkedValues.indexOf("水果類") > -1) {
      this.setState({ child_eat_fruit: true });
    } else {
      this.setState({ child_eat_fruit: false });
    }
    this.setState({ child_food: checkedValues });
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
      rules: [{ type: "object", required: true, message: "請選擇生日" }],
      initialValue: this.state.child_birth
        ? moment(this.state.child_birth, "YYYY-MM-DD")
        : null
    };
    const childNameError =
      isFieldTouched("child_name") && getFieldError("child_name");
    const childGenderError =
      isFieldTouched("child_gender") && getFieldError("child_gender");
    const childBirthError =
      isFieldTouched("child_birth") && getFieldError("child_birth");
    const childAatarError =
      isFieldTouched("child_avatar") && getFieldError("child_avatar");
    const checkPasswordError =
      isFieldTouched("checkPassword") && getFieldError("checkPassword");
    const childConditionError =
      isFieldTouched("child_condition") && getFieldError("child_condition");
    const sleepTimeError =
      isFieldTouched("sleep_time") && getFieldError("sleep_time");
    const foodError = isFieldTouched("food") && getFieldError("food");
    const avatarError = isFieldTouched("upload") && getFieldError("upload");

    function disabledDate(current) {
      // Can not select days after today
      return current && current.valueOf() > Date.now();
    }
    const child_avatar = this.state.child_avatar;
    const { current } = this.state;
    const steps = [
      {
        title: "First",
        content: (
          <Form name="step1">
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
          </Form>
        )
      },
      {
        title: "Second",
        content: (
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
                    <img src={child_avatar} alt="" className="avatar" />
                  ) : (
                    <Icon type="plus" className="avatar-uploader-trigger" />
                  )}
                </Upload>
              )}
            </FormItem>
          </Form>
        )
      },
      {
        title: "Last",
        content: (
          <div>
            <h4>填寫問卷</h4>
            <p>幫助我們更了解您的孩童</p>
            <br />
            <Form>
              <FormItem
                label="孩童目前情況(單選)"
                validateStatus={childConditionError ? "error" : ""}
                help={childConditionError || ""}
              >
                {getFieldDecorator("child_condition", {
                  rules: [{ required: true, message: "此欄位必選" }],
                  initialValue: this.state.child_conditions
                })(
                  <RadioGroup onChange={this.handleConditionChange}>
                    <Radio value="正常">正常</Radio>
                    <Radio value="過動">過動</Radio>
                    <Radio value="自閉">自閉</Radio>
                    <Radio value="學習障礙">學習障礙</Radio>
                    <Radio value="智能障礙">智能障礙</Radio>
                    <Radio value="其他特殊疾病">其他特殊疾病</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem
                label="孩童平均睡眠時間(單選)"
                validateStatus={sleepTimeError ? "error" : ""}
                help={sleepTimeError || ""}
              >
                {getFieldDecorator("sleep_time", {
                  rules: [{ required: true, message: "此欄位必選" }],
                  initialValue: this.state.child_sleep_time
                })(
                  <RadioGroup onChange={this.handleSleepTimeChange}>
                    <Radio value="6小時以下">6小時以下</Radio>
                    <Radio value="6-7小時">6-7小時</Radio>
                    <Radio value="7-8小時">7-8小時</Radio>
                    <Radio value="8-9小時">8-9小時</Radio>
                    <Radio value="9-10小時">9-10小時</Radio>
                    <Radio value="10小時以上">10小時以上</Radio>
                  </RadioGroup>
                )}
              </FormItem>
              <FormItem
                label="較注重孩童哪方面的飲食(複選)"
                validateStatus={foodError ? "error" : ""}
                help={foodError || ""}
              >
                {getFieldDecorator("food", {
                  rules: [{ required: true, message: "此欄位必選" }],
                  initialValue: this.state.child_food
                })(
                  <Checkbox.Group onChange={this.handleFoodChange}>
                    <Checkbox value="全榖根莖類">全榖根莖類</Checkbox>
                    <Checkbox value="蛋豆魚肉類">蛋豆魚肉類</Checkbox>
                    <Checkbox value="乳製品">乳製品</Checkbox>
                    <Checkbox value="蔬菜類">蔬菜類</Checkbox>
                    <Checkbox value="水果類">水果類</Checkbox>
                  </Checkbox.Group>
                )}
              </FormItem>
            </Form>
          </div>
        )
      }
    ];
    return (
      <div>
        {isLoading && <Loading />}
        <Steps progressDot current={current}>
          {steps.map(item => (
            <Step
              key={item.title}
              title={item.title}
              status={this.stepStatus}
            />
          ))}
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action">
          {this.state.current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          )}

          {this.state.current === steps.length - 1 && (
            <Button type="primary" onClick={this.handleSubmit}>
              送出
            </Button>
          )}

          {this.state.current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
        </div>
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
export default Form.create()(AddChild);
