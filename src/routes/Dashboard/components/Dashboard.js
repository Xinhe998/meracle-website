import React from "react";
import PropTypes, { object } from "prop-types";
import Loading from "../../../components/Loading";
import { browserHistory, Redirect } from "react-router";
import { Card, Progress, Icon, Menu, Dropdown, Button, Table } from "antd";
import "./Dashboard.scss";
import moment from "moment";
const project = require("../../../../project.config");

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
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
  async componentDidMount() {
    if (
      localStorage.getItem("account") &&
      localStorage.getItem("authorization") &&
      localStorage.getItem("account") !== "undefined" &&
      localStorage.getItem("authorization") !== "undefined"
    ) {
      await this.checkHavaChild();
      await this.getChildData();
      await this.getAvgStatusScore();
      await this.getLatestData();
      await this.animatePercentage();
      await this.getBestDataOfThisWeek();
      await this.getChildBestMemory();
      await this.getDayAvgScore();
    } else {
      this.preventAnonymousAccess();
    }

    await setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  }
  preventAnonymousAccess = () => {
    if (!this.props.user) {
      browserHistory.push(project.directory);
    } else {
      if (!this.props.user.account) {
        browserHistory.push(project.directory);
      }
    }
  };
  animatePercentage = () => {
    var percent = this.state.latestData_score;
    setTimeout(() => {
      this.setState({ latest_percentage: percent });
    }, 2800);
  };

  checkHavaChild = async () => {
    //檢查此帳號是否擁有學童
    await fetch(project.api.url + "api/Member/isAccHaveChild", {
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
    const child_color = ["#9ACBD9", "#F5808B", "#F2992E", "#2F9A9E", "#A77DC2"];
    //取得有哪些學童，存姓名至array
    await fetch(project.api.url + "api/Member/GetAccountCdName", {
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
                avatar: "",
                color: child_color[index]
              };
              cdArray.push(cdData);
            }
            this.props.getChildData(cdArray);
            if (this.state.isHaveChild) {
              this.setState({
                selectedCdName: this.props.child[0].name,
                selectedSymbol: (
                  <div
                    className="child-circle d-inline-block"
                    style={{
                      backgroundColor: this.props.child[0].color
                    }}
                  />
                )
              });
            }
          }
        },
        function(e) {
          console.log(e);
        }
      );
  };

  getLatestData = async () => {
    //最新數據
    await fetch(project.api.url + "api/Survey/CdNewScoreTable", {
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
          if (responseJson.length) {
            this.setState({
              latestData_name: responseJson[0].CdName,
              latestData_status: responseJson[0].StatusName,
              latestData_time: responseJson[0].CreateTime.toString(),
              latestData_score: responseJson[0].Score,
              latestData_different: responseJson[0].DifferScore
            });
            const child = this.props.child;
            var latestData_color;
            Object.keys(child).map(function(key, index) {
              if (responseJson[0].CdName === child[index].name) {
                latestData_color = child[index].color;
              }
            });
            this.setState({
              latestData_color: latestData_color
            });
          } else {
            this.setState({
              latestData_name: "無數據"
            });
          }
        },
        function(e) {
          console.log(e);
        }
      );
  };
  getBestDataOfThisWeek = async () => {
    //本周最佳表現
    await fetch(project.api.url + "api/Survey/WeekOfBestScoreCd", {
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
          if (responseJson.length) {
            var weekday = new Array(7);
            weekday[0] = "週日";
            weekday[1] = "週一";
            weekday[2] = "週二";
            weekday[3] = "週三";
            weekday[4] = "週四";
            weekday[5] = "週五";
            weekday[6] = "週六";
            this.setState({
              bestDataOfWeek_name: responseJson[0].CdName,
              bestDataOfWeek_gender: responseJson[0].StatusName,
              bestDataOfWeek_time:
                weekday[moment(responseJson[0].CreateTime).format("E")],
              bestDataOfWeek_score: responseJson[0].Score
            });
          }
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
      fetch(project.api.url + "api/Survey/AvgCdStatusOfScore", {
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

  getChildBestMemory = async () => {
    //孩童最佳記憶力
    const child = this.props.child;
    const user = await this.props.user;
    var resultArrary = [];
    const statusArr = [
      "運動前",
      "運動後",
      "吃飯前",
      "吃飯後",
      "睡覺前",
      "剛睡醒"
    ];
    await Object.keys(child).map(function(key, index) {
      fetch(project.api.url + "api/Survey/CdBestOfScore", {
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
            var weekday = await new Array(7);
            weekday[0] = await "日";
            weekday[1] = await "一";
            weekday[2] = await "二";
            weekday[3] = await "三";
            weekday[4] = await "四";
            weekday[5] = await "五";
            weekday[6] = await "六";
            for (var i = 0; i <= Object.keys(child).length; i++) {
              if (responseJson[i]) {
                await resultArrary.push({
                  name: child[key].name,
                  score: responseJson[i].Score,
                  status: statusArr[responseJson[i].Status],
                  date: moment(responseJson[i].CreateTime).format("YYYY-MM-DD"),
                  time: moment(responseJson[i].CreateTime).format("HH:mm"),
                  weekDay:
                    weekday[moment(responseJson[i].CreateTime).format("E")]
                });
              }
            }
          },
          function(e) {
            console.log(e);
          }
        );
    });
    await this.setState({
      bestMemory: resultArrary
    });
  };

  getDayAvgScore = async () => {
    //每日平均記憶力
    const child = this.props.child;
    const user = this.props.user;
    var avgArrary = [];
    Object.keys(child).map(function(key, index) {
      if (child[key].name) {
        fetch(project.api.url + "api/Survey/CdAllOfScoreByTimerTable", {
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
              if (responseJson.length) {
                for (var i = 0; i < Object.keys(responseJson).length; i++) {
                  //跑六個狀態
                  avgArrary.push({
                    range: responseJson[i].TimeRangeName
                  });
                  avgArrary[i][child[key].name.toString()] =
                    responseJson[i].Score;
                }
              }
              await avgArrary.splice(6);
            },
            function(e) {
              console.log(e);
            }
          );
      }
    });
    await this.setState({
      personal_day_memory_data: avgArrary
    });
  };

  handleDropdownClick = event => {
    this.setState({
      selectedCdName: event.item.props.children.props.children[1],
      selectedSymbol: event.item.props.children.props.children[0]
    });
  };
  redirectToAddChild = () => {
    browserHistory.push(project.directory + "dashboard/addChild");
  };
  render() {
    var personal_average_memory_data = this.state.personal_average_memory_data;
    const isMobile =
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i);
    const isLoading = this.state.isLoading;
    const personal_day_memory_data = this.state.personal_day_memory_data;
    var dropdownIndex = 0;
    const child = this.props.child;
    const dropdownMenu = (
      <Menu selectable defaultActiveFirst onSelect={this.handleDropdownClick}>
        {Object.keys(child).map(function(index) {
          dropdownIndex = dropdownIndex + 1;
          return (
            <Menu.Item key={dropdownIndex}>
              <span>
                <div
                  className="child-circle d-inline-block"
                  style={{
                    backgroundColor: child[index].color
                  }}
                />
                {child[index].name}
              </span>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    const startGame = () => {
      var newWindow = window.open("../../Game/map/index.html");
      newWindow.account = this.props.user.account;
      newWindow.authorization = this.props.user.authorization;
      newWindow.child_name = this.state.selectedCdName;
      //取用：window.account
    };
    // const startBackerGame = () => {
    //   var newWindow = window.open("../../Game/BakeryGame/game_first_page.html");
    //   newWindow.account = this.props.user.account;
    //   newWindow.authorization = this.props.user.authorization;
    //   newWindow.child_name = this.state.selectedCdName;
    // };
    const child_color = ["#9ACBD9", "#F5808B", "#F2992E", "#2F9A9E", "#A77DC2"];
    switch (this.state.latestData_color) {
      case "#9ACBD9":
        var latestData_color_type = "child_color_1";
        break;
      case "#F5808B":
        var latestData_color_type = "child_color_2";
        break;
      case "#F2992E":
        var latestData_color_type = "child_color_3";
        break;
      case "#2F9A9E":
        var latestData_color_type = "child_color_4";
        break;
      case "#A77DC2":
        var latestData_color_type = "child_color_5";
        break;
    }
    const hasNoChildAvgStatusData = [
      {
        status: "運動前",
        無: null
      },
      {
        status: "運動後",
        無: null
      },
      {
        status: "吃飯前",
        無: null
      },
      {
        status: "吃飯後",
        無: null
      },
      {
        status: "睡覺前",
        無: null
      },
      {
        status: "剛睡醒",
        無: null
      }
    ];

    const bestMemoryColumns = [
      {
        title: "score",
        dataIndex: "score",
        key: "score",
        width: 80
      },
      {
        title: "detail",
        dataIndex: "detail",
        key: "detail"
      }
    ];
    var bestMemoryData = [];
    for (var index in this.state.bestMemory) {
      bestMemoryData.push({
        key: index,
        score: (
          <span style={{ color: child_color[index] }}>
            {this.state.bestMemory[index].score}
          </span>
        ),
        detail: (
          <div className="row">
            <div className="col-md-12 child_best_momory_data_name">
              {this.state.bestMemory[index].name}
            </div>
            <div className="col-md-12 child_best_momory_data_detail">
              {this.state.bestMemory[index].date} ({
                this.state.bestMemory[index].weekDay
              })
              {"  "}
              {this.state.bestMemory[index].time}
              {"  "}
              {this.state.bestMemory[index].status}
            </div>
          </div>
        )
      });
    }

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
                      <span className="enter-game-title">
                        選擇要進入憶想城市的孩童
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-3 cdname-dropdown-wrapper">
                      <Dropdown.Button
                        overlay={dropdownMenu}
                        trigger={["click"]}
                        placement="bottomRight"
                        className="meracle-dropdown-btn"
                      >
                        {this.state.selectedCdName ? (
                          <span>
                            {this.state.selectedSymbol}
                            {this.state.selectedCdName}
                          </span>
                        ) : (
                          <span>
                            <div
                              className="child-circle d-inline-block"
                              style={{
                                backgroundColor: this.props.child[0].color
                              }}
                            />
                            {this.props.child[0].name}
                          </span>
                        )}
                      </Dropdown.Button>
                    </div>
                    {/* <div className="col-md-5 col-lg-2">
                      <Button
                        className="meracle-outline-btn float-right"
                        onClick={() => startFarmerGame()}
                      >
                        進入遊戲
                      </Button>
                    </div> */}
                    <div className="col-md-12 col-lg-6">
                      <Button
                        className="meracle-btn"
                        onClick={() => startGame()}
                      >
                        進入遊戲 ＆ 測量腦波
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-md-12 col-lg-8 enter-game-title-wrapper">
                      <span className="enter-game-title">
                        您尚未有孩童的資料，憶想奇蹟提供您可以同時管理五個孩童，快加入我們！
                      </span>
                    </div>
                    <div className="col-md-12 col-lg-4">
                      <Button
                        className="meracle-btn"
                        onClick={() => this.redirectToAddChild()}
                      >
                        新增孩童
                      </Button>
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
                {!isLoading ? (
                  <ResponsiveContainer aspect={2.3}>
                    <BarChart
                      data={
                        this.state.isHaveChild
                          ? personal_average_memory_data
                          : hasNoChildAvgStatusData
                      }
                      barGap={0}
                    >
                      <XAxis
                        dataKey="status"
                        tickLine={false}
                        tick={{
                          fill: "#6D7084",
                          fontSize: 12,
                          opacity: 0.8
                        }}
                        axisLine={false}
                      />
                      <YAxis
                        tickLine={false}
                        tick={{ fill: "#6D7084", fontSize: 12, opacity: 0.8 }}
                        axisLine={false}
                      />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip cursor={{ fill: "#F0F0F0", opacity: 0.6 }} />
                      <Legend
                        iconType="circle"
                        wrapperStyle={{ fontSize: 12, color: "#6D7084" }}
                      />
                      {!isLoading && child ? (
                        Object.keys(child).map(function(key) {
                          return (
                            <Bar
                              key={key}
                              dataKey={child[key].name}
                              fill={child[key].color}
                              animationDuration={2000}
                              barSize={15}
                            />
                          );
                        })
                      ) : (
                        <Bar
                          key={key}
                          dataKey={"無"}
                          fill={"#6D7084"}
                          animationDuration={2000}
                          barSize={15}
                        />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                ) : null}
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
                    {this.state.latestData_time ? (
                      <p className="latest-data-time">
                        {moment(this.state.latestData_time).format(
                          "YYYY/MM/DD HH:mm"
                        )}{" "}
                        {this.state.latestData_status}
                      </p>
                    ) : null}
                    <Progress
                      type="circle"
                      percent={this.state.latest_percentage}
                      format={percent => `${percent}`}
                      strokeWidth={5}
                      className={latestData_color_type}
                    />
                    {this.state.latestData_different !== undefined &&
                      this.state.latestData_different >= 0 && (
                        <p
                          className="progress-gain hidden-md-down"
                          style={{ color: this.state.latestData_color }}
                        >
                          <Icon type="caret-up" />{" "}
                          {this.state.latestData_different}
                        </p>
                      )}
                    {this.state.latestData_different !== undefined &&
                      this.state.latestData_different < 0 && (
                        <p
                          className="progress-gain hidden-md-down"
                          style={{ color: this.state.latestData_color }}
                        >
                          <Icon type="caret-down" />{" "}
                          {Math.abs(this.state.latestData_different)}
                        </p>
                      )}
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
                        {this.state.bestDataOfWeek_time ? (
                          <span className="info-text">
                            <img
                              className="best-section-icon"
                              src={require("../assets/calender_yellow.png")}
                            />{" "}
                            {this.state.bestDataOfWeek_time}
                          </span>
                        ) : (
                          <span className="info-text">
                            <img
                              className="best-section-icon"
                              src={require("../assets/calender.png")}
                            />{" "}
                            無
                          </span>
                        )}
                      </div>
                      <div className="col-lg-6">
                        {this.state.bestDataOfWeek_name ? (
                          <span className="info-text">
                            <img
                              className="best-section-icon"
                              src={require("../assets/person_pink.png")}
                            />{" "}
                            {this.state.bestDataOfWeek_name}
                          </span>
                        ) : (
                          <span className="info-text">
                            <img
                              className="best-section-icon"
                              src={require("../assets/person.png")}
                            />{" "}
                            無
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <Card
                title="孩童最佳記憶力"
                style={{ width: "100%" }}
                className="dashboard-index-card"
              >
                <Table
                  columns={bestMemoryColumns}
                  dataSource={bestMemoryData}
                  showHeader={false}
                  pagination={false}
                  locale={{ emptyText: "無數據" }}
                  className="every_child_best_momory_table"
                />
              </Card>
            </div>
            <div className="col-md-6">
              <Card
                title="每日平均記憶力"
                style={{ width: "100%" }}
                className="dashboard-index-card"
              >
                {!isLoading && (
                  <ResponsiveContainer aspect={1.5}>
                    <LineChart
                      data={personal_day_memory_data}
                      className="linechart"
                    >
                      <XAxis
                        dataKey="range"
                        tickLine={false}
                        tick={{ fill: "#6D7084", fontSize: 12, opacity: 0.8 }}
                        axisLine={false}
                      />
                      <YAxis
                        tickLine={false}
                        tick={{ fill: "#6D7084", fontSize: 12, opacity: 0.8 }}
                        axisLine={false}
                      />
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#6D7084"
                        opacity="0.2"
                      />
                      <Tooltip />
                      <Legend
                        iconType="circle"
                        wrapperStyle={{ fontSize: 12, color: "#6D7084" }}
                      />
                      {!isLoading && child
                        ? Object.keys(child).map(function(key) {
                            return (
                              <Line
                                type="monotone"
                                dataKey={child[key].name}
                                stroke={child[key].color}
                                strokeWidth="4"
                                dot={{
                                  stroke: child[key].color,
                                  strokeWidth: 4,
                                  fill: child[key].color
                                }}
                                animationDuration={2000}
                              />
                            );
                          })
                        : null}
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
