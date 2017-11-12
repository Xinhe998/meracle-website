import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
import { Card, Icon, Button } from "antd";

// import './HomeView.scss'
export default class Child extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.getChildData();
  }
  getChildData = async () => {
    //取得有哪些學童，存姓名至array
    await fetch(
      "https://www.meracle.me/home/api/Member/GetAccountCdName",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.props.user.authorization
        },
        body: JSON.stringify({
          Account: this.props.user.account
        })
      }
    )
      .then(res => res.json())
      .then(
        responseJson => {
          var cdArray = [];
          if (responseJson.CdName.length) {
            for (var index in responseJson.CdName) {
              let cdData = {
                name: responseJson.CdName[index],
                gender: "",
                birth: "",
                avatar: ""
              };
              cdArray.push(cdData);
            }
            this.props.getChildData(cdArray);
          }
        },
        function(e) {
          console.log(e);
        }
      );
    //依取得的學童姓名拿詳細資料
    var cdDetailArray = [];
    for (var index in this.props.child) {
      console.log("!!!",this.props.child[index]);
      await fetch(
        "https://www.meracle.me/home/api/Member/CdPersonalPage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.props.user.authorization
          },
          body: JSON.stringify({
            Account: this.props.user.account,
            CdName: this.props.child[index].name
          })
        }
      )
        .then(res => res.json())
        .then(
          responseJson => {
            if (responseJson.length) {
              var cdDetailData = {
                name: responseJson[0].CdName,
                gender: responseJson[0].Gender.trim(),
                birth: responseJson[0].Birthday,
                avatar: responseJson[0].Imageurl
              };
              cdDetailArray.push(cdDetailData);
            }
          },
          function(e) {
            console.log(e);
          }
        );
      this.props.getChildData(cdDetailArray);
    }
  };
  test = () => {
    var newWindow = window.open('../../../../../BakeryGame/game_first_page.html');
    newWindow.my_special_setting = "Hello World";
  }
  render() {
    const child = this.props.child
    return (
      <div>
        <Button onClick={this.test}>Click</Button>
        {Object.keys(child).map(function(index) {
          console.log('index=>', index);
          return <Card style={{ width: "90%" }}>
            <p>姓名：{child[index].name}</p>
            <p>性別：{child[index].gender}</p>
            <p>生日：{child[index].birth}</p>
          </Card>;
        })}
        {/* <Button type="dashed" onClick={this.add} style={{ width: "90%", marginTop: "30px" }}>
          <Icon type="plus" /> Add field
        </Button> */}
      </div>
    );
  }
}
