import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
import { Card, Icon, Button } from "antd";
import Loading from "../../../components/Loading";
import "./Child.scss";

// import './HomeView.scss'
export default class Child extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isHaveChild: false
    };
  }
  async componentWillMount() {
    await this.checkHavaChild();
    if (this.state.isHaveChild) {
      await this.getChildData();
    }
    await setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 300);
  }
  checkHavaChild = async () => {
    await fetch("https://www.meracle.me/home/api/Member/isAccHaveChild", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.user.authorization
      },
      body: JSON.stringify({
        Account: this.props.user.account
      })
    })
      .then(res => res.json())
      .then(
        responseJson => {
          this.setState({
            isHaveChild: responseJson
          });
        },
        function(e) {
          console.log(e);
        }
      );
  };
  getChildData = async () => {
    //取得有哪些學童，存姓名至array
    await fetch("https://www.meracle.me/home/api/Member/GetAccountCdName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.user.authorization
      },
      body: JSON.stringify({
        Account: this.props.user.account
      })
    })
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
      await fetch("https://www.meracle.me/home/api/Member/CdPersonalPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.props.user.authorization
        },
        body: JSON.stringify({
          Account: this.props.user.account,
          CdName: this.props.child[index].name
        })
      })
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

  render() {
    const child = this.props.child;
    const startGame = cdName => {
      var newWindow = window.open("../../Game/farmer.html");
      newWindow.account = this.props.user.account;
      newWindow.authorization = this.props.user.authorization;
      newWindow.child_name = cdName;
      //取用：window.account
    };
    const isLoading = this.state.isLoading;
    var loopIndex = 0;
    return (
      <div>
        {isLoading && <Loading />}
        {Object.keys(child).map(function(index) {
          loopIndex = loopIndex + 1;
          if (child[index].name) {
            return (
              <Card
                style={{ width: "90%", marginBottom: 20 }}
                extra={
                  <Button
                    onClick={() => {
                      startGame(child[index].name);
                    }}
                  >
                    進入遊戲
                  </Button>
                }
              >
                <div>
                  <div className="avatar-wrapper">
                    {child[index].avatar !== "" ? (
                      <img
                        className="dashboard-avatar"
                        src={
                          "https://www.meracle.me/home/Filefolder/" +
                          child[index].avatar +
                          "?time=" +
                          new Date().getTime()
                        }
                        alt=""
                      />
                    ) : (
                      <img
                        className="dashboard-avatar"
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                        alt=""
                      />
                    )}
                  </div>
                  <br />
                  <p>姓名：{child[index].name}</p>
                  <p>性別：{child[index].gender}</p>
                  <p>生日：{child[index].birth}</p>
                </div>
              </Card>
            );
          } else {
            if (loopIndex < 2) return <p>尚無學童資料</p>;
          }
        })}
        {/* <Button type="dashed" onClick={this.add} style={{ width: "90%", marginTop: "30px" }}>
          <Icon type="plus" /> Add field
        </Button> */}
      </div>
    );
  }
}
