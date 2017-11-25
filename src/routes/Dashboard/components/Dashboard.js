import React from "react";
import PropTypes, { object } from "prop-types";
import Loading from "../../../components/Loading";
import { browserHistory } from "react-router";
import { Card, Progress, Icon, Menu, Dropdown, Button } from "antd";
import "./Dashboard.scss";
import moment from "moment";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";

export default class Dashboard extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      latest_percentage: 0,
      selectedCdName: "",
      isHaveChild: false
    };
  }
  componentWillMount() {
    this.getChildData();
  }
  async componentDidMount() {
    await this.checkHavaChild();
    await this.getLatestData();
    await this.animatePercentage();
    await this.getBestDataOfThisWeek();
    await this.getAvgStatusScore();
    await setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  }

  animatePercentage = () => {
    var percent = this.state.latestData_score;
    setTimeout(() => {
      this.setState({ latest_percentage: percent });
    }, 2800);
  };

  checkHavaChild = async () => {
    //檢查此帳號是否擁有學童
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
            this.setState({
              selectedCdName: this.props.child[0].name
            });
          }
        },
        function(e) {
          console.log(e);
        }
      );
  };

  getLatestData = async () => {
    //最新數據
    await fetch("https://www.meracle.me/home/api/Survey/CdNewScoreTable", {
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
            latestData_name: responseJson[0].CdName,
            latestData_status: responseJson[0].StatusName,
            latestData_time: responseJson[0].CreateTime.toString(),
            latestData_score: responseJson[0].Score,
            latestData_different: responseJson[0].DifferScore
          });
        },
        function(e) {
          console.log(e);
        }
      );
  };
  getBestDataOfThisWeek = async () => {
    //本周最佳表現
    await fetch("https://www.meracle.me/home/api/Survey/WeekOfBestScoreCd", {
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
          var weekday = new Array(7);
          weekday[0] = "週日";
          weekday[1] = "周一";
          weekday[2] = "周二";
          weekday[3] = "周三";
          weekday[4] = "周四";
          weekday[5] = "周五";
          weekday[6] = "周六";
          this.setState({
            bestDataOfWeek_name: responseJson[0].CdName,
            bestDataOfWeek_gender: responseJson[0].StatusName,
            bestDataOfWeek_time:
              weekday[moment(responseJson[0].CreateTime).format("E")],
            bestDataOfWeek_score: responseJson[0].Score
          });
        },
        function(e) {
          console.log(e);
        }
      );
  };

  getAvgStatusScore = async () => {
    //各個狀態平均
    const child = this.props.child;
    const user = this.props.user;
    var avgArrary = [];
    Object.keys(child).map(function(key, index) {
      fetch("https://www.meracle.me/home/api/Survey/AvgCdWeekStatusOfScore", {
        //跑所有小孩
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.authorization
        },
        body: JSON.stringify({
          Account: user.account,
          CdName: child[key].name
        })
      })
        .then(res => res.json())
        .then(
          async responseJson => {
            for (var i = 0; i <= 5; i++) {
              //跑六個狀態
              avgArrary.push({
                status: responseJson[i].StatusName
              });
              avgArrary[i][child[key].name.toString()] =
                responseJson[i].AvgScore;
            }
            await avgArrary.splice(6);
          },
          function(e) {
            console.log(e);
          }
        );
    });
    await this.setState({
      personal_average_memory_data: avgArrary
    });
  };

  handleDropdownClick = event => {
    this.setState({
      selectedCdName: event.item.props.children
    });
    // var newWindow = window.open("../../Game/FarmerGame/farmer.html");
    // newWindow.account = this.props.user.account;
    // newWindow.authorization = this.props.user.authorization;
    // newWindow.child_name = event.item.props.children;
  };
  render() {
    var personal_average_memory_data = this.state.personal_average_memory_data;
    const child_color = ["#9ACBD9", "#F5808B", "#F2992E", "#2F9A9E", "#A77DC2"];
    const isMobile =
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i);
    const isLoading = this.state.isLoading;
    const best_memory_data = [
      { name: "", 黃小明: 50, 陳小花: 200 },
      { name: "9/2", 黃小明: 90, 陳小花: 150 },
      { name: "9/5", 黃小明: 65, 陳小花: 130 },
      { name: "9/7", 黃小明: 80, 陳小花: 70 },
      { name: "9/8", 黃小明: 95, 陳小花: 68 },
      { name: "9/11", 黃小明: 88, 陳小花: 100 },
      { name: "9/15", 黃小明: 120, 陳小花: 160 }
    ];
    var dropdownIndex = 0;
    const child = this.props.child;
    const dropdownMenu = (
      <Menu selectable defaultActiveFirst onSelect={this.handleDropdownClick}>
        {Object.keys(child).map(function(index) {
          dropdownIndex = dropdownIndex + 1;
          return <Menu.Item key={dropdownIndex}>{child[index].name}</Menu.Item>;
        })}
      </Menu>
    );
    const startFarmerGame = () => {
      var newWindow = window.open("../../Game/FarmerGame/farmer.html");
      newWindow.account = this.props.user.account;
      newWindow.authorization = this.props.user.authorization;
      newWindow.child_name = this.state.selectedCdName;
      //取用：window.account
    };
    const startBackerGame = () => {
      var newWindow = window.open("../../Game/BakeryGame/game_first_page.html");
      newWindow.account = this.props.user.account;
      newWindow.authorization = this.props.user.authorization;
      newWindow.child_name = this.state.selectedCdName;
    };
    return (
      <div>
        {isLoading && <Loading />}
        <div>
          <div className="row">
            <div className="col-md-12">
              <Card
                style={{ width: "100%" }}
                className="dashboard-index-card enter-game-wrapper"
              >
                {this.state.isHaveChild ? (
                  <div className="row">
                    <div className="col-md-12 col-lg-3 enter-game-title-wrapper">
                      <span className="enter-game-title">選擇要進入憶想城市的孩童</span>
                    </div>
                    <div className="col-md-12 col-lg-3 cdname-dropdown-wrapper">
                      <Dropdown.Button
                        overlay={dropdownMenu}
                        trigger={["click"]}
                        placement="bottomRight"
                        className="meracle-dropdown-btn"
                      >
                        {this.state.selectedCdName
                          ? this.state.selectedCdName
                          : this.props.child[0].name}
                      </Dropdown.Button>
                    </div>
                    <div className="col-md-5 col-lg-2">
                      <Button
                        className="meracle-outline-btn float-right"
                        onClick={() => startFarmerGame()}
                      >
                        進入遊戲
                      </Button>
                    </div>
                    <div className="col-md-7 col-lg-4">
                      <Button
                        className="meracle-btn"
                        onClick={() => startBackerGame()}
                      >
                        進入遊戲＆測量腦波
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-md-12 col-lg-3 enter-game-title-wrapper">
                      <span className="enter-game-title">
                        您尚未有孩童的資料，憶想奇蹟提供您可以同時管理五個孩童，快加入我們！
                      </span>
                    </div>
                  </div>
                )}
              </Card>
            </div>
            <div className="col-md-9">
              <Card
                title="個人平均狀態記憶力"
                style={{ width: "100%" }}
                className="dashboard-index-card avg-data-wrapper"
              >
                <ResponsiveContainer aspect={2.3}>
                  <BarChart data={personal_average_memory_data}>
                    <XAxis
                      dataKey="status"
                      tickLine={false}
                      tick={{ fill: "#6D7084", fontSize: 12, opacity: 0.8 }}
                    />
                    <YAxis
                      tickLine={false}
                      tick={{ fill: "#6D7084", fontSize: 12, opacity: 0.8 }}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip cursor={{ fill: "#F0F0F0" }} />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{ fontSize: 12, color: "#6D7084" }}
                    />
                    {!isLoading
                      ? Object.keys(child).map(function(key) {
                          return (
                            <Bar
                              dataKey={child[key].name}
                              fill={child_color[key]}
                              animationDuration={2000}
                              isAnimationActive={true}
                            />
                          );
                        })
                      : null}
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <div className="col-md-3">
              <div className="row">
                <div className="col-md-12">
                  <Card
                    title="最新數據"
                    style={{ width: "100%" }}
                    className="dashboard-index-card latest-data-wrapper"
                  >
                    <p className="latest-data-name">
                      {this.state.latestData_name}
                    </p>
                    <p className="latest-data-time">
                      {moment(this.state.latestData_time).format(
                        "YYYY/MM/DD HH:mm"
                      )}{" "}
                      {this.state.latestData_status}
                    </p>
                    <Progress
                      type="circle"
                      percent={this.state.latest_percentage}
                      format={percent => `${percent}`}
                      strokeWidth={5}
                    />
                    <p className="progress-gain hidden-md-down">
                      <Icon type="caret-up" /> {this.state.latestData_different}
                    </p>
                  </Card>
                </div>
                <div className="col-md-12">
                  <Card
                    title="本週最佳表現"
                    style={{ width: "100%" }}
                    className="dashboard-index-card best-data-wrapper"
                  >
                    <div className="row">
                      <div className="col-lg-6">
                        <span className="info-text">
                          <img
                            className="best-section-icon"
                            src={require("../assets/calender_yellow.png")}
                          />{" "}
                          {this.state.bestDataOfWeek_time}
                        </span>
                      </div>
                      <div className="col-lg-6">
                        <span className="info-text">
                          <img
                            className="best-section-icon"
                            src={require("../assets/person_pink.png")}
                          />{" "}
                          {this.state.bestDataOfWeek_name}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <Card
                title="各狀態平均記憶力"
                style={{ width: "100%" }}
                className="dashboard-index-card"
              />
            </div>
            <div className="col-md-6">
              <Card
                title="每週平均表現"
                style={{ width: "100%" }}
                className="dashboard-index-card"
              >
                <ResponsiveContainer aspect={1.5}>
                  <LineChart data={best_memory_data} className="linechart">
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      tick={{ fill: "#6D7084", fontSize: 12, opacity: 0.8 }}
                    />
                    <YAxis
                      tickLine={false}
                      tick={{ fill: "#6D7084", fontSize: 12, opacity: 0.8 }}
                    />
                    <CartesianGrid strokeDasharray="3 3" stroke="#B4DAE5" />
                    <Tooltip />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{ fontSize: 12, color: "#6D7084" }}
                    />
                    {!isLoading ? (
                      <Line
                        type="monotone"
                        dataKey="黃小明"
                        stroke="#F2992E"
                        strokeWidth="4"
                        dot={{ stroke: "#F2992E", strokeWidth: 4 }}
                        animationDuration={2000}
                      />
                    ) : null}
                    {!isLoading ? (
                      <Line
                        type="monotone"
                        dataKey="陳小花"
                        stroke="#F5808B"
                        strokeWidth="4"
                        dot={{ stroke: "#F5808B", strokeWidth: 4 }}
                        animationDuration={2000}
                      />
                    ) : null}
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
