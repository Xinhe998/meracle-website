import React, { Component } from "react";
import ReactDOM from "react-dom";
// import './HomeView.scss'
export default class AddChild extends React.Component {
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
      child_eat_veg: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    //this.preventAnonymousAccess();
  }
  preventAnonymousAccess = () => {
    if (this.props.user) {
      alert("請先登入");
      browserHistory.push("/Login");
    }
  };
  handleSubmit = async () => {
    var formData = {
      account: this.props.user.account,
      child_name: this.state.child_name,
      child_gender: this.state.child_gender,
      child_birth: this.state.child_birth,
      child_avatar: this.state.child_avatar
    };
    console.log(formData);
    await fetch("http://localhost:64323/api/Member/CdRegister", {
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
    await fetch("http://localhost:64323/api/Survey/Questionnaire", {
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
  handleBirthChange = event => {
    this.setState({ child_birth: event.target.value });
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
    return (
      <div>
        <form>
          <label>
            孩子姓名：
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </label>
          <br />
          <label>
            孩子性別：
            <label className="checkbox-inline">
              <input
                type="radio"
                name="gender"
                onChange={this.handleGenderChange}
                value="男"
              />男
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="gender"
                onChange={this.handleGenderChange}
                value="女"
              />女
            </label>
          </label>
          <br />
          <label>
            孩子生日：
            <input
              type="date"
              className="form-control"
              value={this.state.birth}
              onChange={this.handleBirthChange}
            />
          </label>
          <br />
          <label>
            孩子大頭貼：
            <input
              type="file"
              className="form-control"
              value={this.state.child_avatar}
              onChange={this.handleAvatarChange}
            />
          </label>
          <br />
          <input type="button" value="確定" onClick={this.handleSubmit} />
        </form>
        <hr />
        <form>
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
        </form>
      </div>
    );
  }
}