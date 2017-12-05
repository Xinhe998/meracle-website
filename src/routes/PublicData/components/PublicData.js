import React from "react";
import PropTypes from "prop-types";
import Loading from "../../../components/Loading";
import { Card } from "antd";
import "./PublicData.scss";

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
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarRadiusAxis,
  PolarAngleAxis,
  PolarGrid,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Sector,
  Cell,
  LabelList
} from "recharts";

export default class PublicData extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    await this.getAvgSleepTime();
    await this.getAvgMemory();
    await this.getAvgAgeOfMemory();
    await this.getAvgFoodOfMemory();
    await this.getConditionOfMemory();
    await setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 800);
  }

  getAvgSleepTime = async () => {
    //本周最佳表現
    var avgArrary = [];
    await fetch(
      "https://www.meracle.me/home/api/Survey/AvgPublicSleepAvgScoreNoOrderby",
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(
        async responseJson => {
          if (responseJson.length) {
            for (var i = 0; i <= Object.keys(responseJson).length - 1; i++) {
              //跑六個狀態
              avgArrary.push({
                name: responseJson[i].Avg_SleepName,
                score: responseJson[i].AvgScore
              });
            }
            await this.setState({
              avg_sleeptime_memory_data: avgArrary
            });
          }
        },
        function(e) {
          console.log(e);
        }
      );
  };

  getAvgMemory = async () => {
    //大眾孩童每日平均表現
    var avgArrary = [];
    await fetch(
      "https://www.meracle.me/home/api/Survey/AvgPublicMemeryOrderBy",
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(
        async responseJson => {
          if (responseJson.length) {
            for (var i = 0; i <= Object.keys(responseJson).length - 1; i++) {
              //跑六個狀態
              avgArrary.push({
                name: responseJson[i].TimeRangeName,
                score: responseJson[i].Score
              });
            }
            await this.setState({
              avg_memory_data: avgArrary
            });
          }
        },
        function(e) {
          console.log(e);
        }
      );
  };

  getAvgAgeOfMemory = async () => {
    //大眾孩童各年齡記憶力
    var avgArrary = [];
    await fetch(
      "https://www.meracle.me/home/api/Survey/AvgPublicAgeRangeScoreOrderby",
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(
        async responseJson => {
          if (responseJson.length) {
            for (var i = 0; i <= Object.keys(responseJson).length - 1; i++) {
              avgArrary.push({
                age: responseJson[i].AgeRangeName,
                score: responseJson[i].AvgScore
              });
            }
            await this.setState({
              avg_age_of_memory: avgArrary
            });
          }
        },
        function(e) {
          console.log(e);
        }
      );
  };

  getAvgFoodOfMemory = async () => {
    //大眾孩童各年齡記憶力
    var avgArrary = [];
    await fetch(
      "https://www.meracle.me/home/api/Survey/AvgPublicCerealOrderBy",
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(
        async responseJson => {
          if (responseJson.length) {
            for (var i = 0; i <= Object.keys(responseJson).length - 1; i++) {
              avgArrary.push({
                food: responseJson[i].Key,
                score: responseJson[i].Value
              });
            }
            await this.setState({
              avg_food_of_memory: avgArrary
            });
          }
        },
        function(e) {
          console.log(e);
        }
      );
  };

  getConditionOfMemory = async () => {
    //大眾孩童生理狀況
    var avgArrary = [];
    await fetch("https://www.meracle.me/home/api/Survey/AvgPublicBodyAvgScoreOrderBy", {
      method: "GET"
    })
      .then(res => res.json())
      .then(
        async responseJson => {
          if (responseJson.length) {
            for (var i = 0; i <= Object.keys(responseJson).length - 1; i++) {
              avgArrary.push({
                condition: responseJson[i].Problem,
                score: responseJson[i].AvgScore
              });
            }
            await this.setState({
              condition_of_memory: avgArrary
            });
          }
        },
        function(e) {
          console.log(e);
        }
      );
  };

  render() {
    const isMobile =
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i);
    const isLoading = this.state.isLoading;
    var avgSleepMemoryData = [],
      avgMemoryData = [],
      avgAgeOfMemory = [],
      avgFoodOfMemory = [],
      conditionOfMemory = [];
    for (var index in this.state.avg_sleeptime_memory_data) {
      avgSleepMemoryData.push({
        key: index,
        sleeptime: this.state.avg_sleeptime_memory_data[index].name,
        score: this.state.avg_sleeptime_memory_data[index].score
      });
    }
    for (var index1 in this.state.avg_memory_data) {
      avgMemoryData.push({
        key: index1,
        range: this.state.avg_memory_data[index1].name.substring(
          0,
          this.state.avg_memory_data[index1].name.indexOf("~") + 1
        ),
        score: this.state.avg_memory_data[index1].score
      });
    }
    for (var index2 in this.state.avg_age_of_memory) {
      avgAgeOfMemory.push({
        key: index2,
        age: this.state.avg_age_of_memory[index2].age,
        score: this.state.avg_age_of_memory[index2].score,
        background: 100
      });
    }

    function foodAlias(foodName) {
      switch (foodName) {
        case "Eat_Milk":
          return "乳製品";
          break;
        case "Eat_Veg":
          return "蔬菜類";
          break;
        case "Eat_Fruit":
          return "水果類";
          break;
        case "Eat_Meat":
          return "蛋豆魚肉類";
          break;
        case "Eat_Cereal":
          return "全穀根莖類";
          break;
      }
    }
    for (var index3 in this.state.avg_food_of_memory) {
      avgFoodOfMemory.push({
        dataKey: index3,
        name: foodAlias(this.state.avg_food_of_memory[index3].food),
        value: this.state.avg_food_of_memory[index3].score
      });
    }

    for (var index4 in this.state.condition_of_memory) {
      conditionOfMemory.push({
        dataKey: index4,
        name: this.state.condition_of_memory[index4].condition,
        value: this.state.condition_of_memory[index4].score
      });
    }
    const COLORS = [
      "#092B42",
      "#9ACBD9",
      "#2F9A9E",
      "#F2992E",
      "#F5808B",
      "#A77DC2"
    ];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}`}
        </text>
      );
    };
    return (
      <div>
        {isLoading && <Loading />}
        <div className="row">
          <div className="col-md-6">
            <Card
              title="大眾孩童每日平均記憶力指數"
              style={{ width: "100%" }}
              className="dashboard-index-card"
            >
              <ResponsiveContainer aspect={2.2}>
                <ComposedChart data={avgMemoryData} className="linechart">
                  <XAxis dataKey="range" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(109,112,132,0.2)"
                  />
                  {!isLoading ? (
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#9ACBD9"
                      strokeWidth="4"
                      dot={{
                        stroke: "#9ACBD9",
                        strokeWidth: 4,
                        fill: "#9ACBD9"
                      }}
                      animationDuration={2000}
                    />
                  ) : null}
                  <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9ACBD9" stopOpacity={0.4} />
                      <stop
                        offset="100%"
                        stopColor="#9ACBD9"
                        stopOpacity={0.4}
                      />
                    </linearGradient>
                  </defs>
                  {!isLoading ? (
                    <Area
                      type="monotone"
                      dataKey="name"
                      stroke="#9ACBD9"
                      fillOpacity={1}
                      fill="url(#colorPv)"
                    />
                  ) : null}
                </ComposedChart>
              </ResponsiveContainer>
            </Card>

            <Card
              title="大眾孩童飲食攝取狀況"
              style={{ width: "100%" }}
              className="dashboard-index-card"
            >
              <div className="row">
                {!isLoading ? (
                  <ResponsiveContainer aspect={1.5}>
                    <PieChart>
                      <Pie
                        data={avgFoodOfMemory}
                        innerRadius={80}
                        outerRadius={120}
                        label={renderCustomizedLabel}
                        labelLine={false}
                      >
                        {avgFoodOfMemory.map((entry, index) => (
                          <Cell fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend
                        iconType="circle"
                        wrapperStyle={{ fontSize: 12, color: "#6D7084" }}
                      />
                      <Tooltip
                        cursor={{ fill: "#F0F0F0", opacity: 0.6 }}
                        wrapperStyle={{
                          background: "#9ACBD9",
                          borderWidth: 2,
                          borderRadius: 100,
                          borderColor: "#fff",
                          color: "#FFF",
                          shadowColor: "#000",
                          shadowOpacity: 0.2,
                          shadowOffset: { width: 1, height: 3 },
                          zIndex: 100
                        }}
                        itemStyle={{
                          color: "#fff",
                          fontSize: 16,
                          fontWeight: 400
                        }}
                        offset={20}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : null}
                {!isLoading ? (
                  <img
                    src={require("../assets/food.png")}
                    className="condition-chart-img"
                    alt=""
                    draggable={false}
                  />
                ) : null}
              </div>

              {/* <div className="condition-chart-background" /> */}
            </Card>
            <Card
              title="大眾孩童各年齡記憶力"
              style={{ width: "100%" }}
              className="dashboard-index-card"
            >
              <ResponsiveContainer aspect={1.5}>
                <RadarChart data={avgAgeOfMemory}>
                  <Radar
                    name="比例"
                    dataKey="background"
                    stroke="#AFD6E1"
                    fill="#AFD6E1"
                    fillOpacity={0.7}
                  />
                  {!isLoading ? (
                    <Radar
                      name="比例"
                      dataKey="score"
                      stroke="#144669"
                      fill="#144669"
                      fillOpacity={0.8}
                    />
                  ) : null}
                  <PolarGrid />
                  <PolarAngleAxis dataKey="age" />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 110]}
                    tick={false}
                    axisLine={false}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </div>
          <div className="col-md-6">
            <Card
              title="大眾孩童生理狀況"
              style={{ width: "100%" }}
              className="dashboard-index-card"
            >
              <div className="row">
                {!isLoading ? (
                  <ResponsiveContainer aspect={1.5}>
                    <PieChart onMouseEnter={this.onPieEnter}>
                      <Pie
                        data={conditionOfMemory}
                        innerRadius={80}
                        outerRadius={120}
                        label={renderCustomizedLabel}
                        labelLine={false}
                      >
                        {conditionOfMemory.map((entry, index) => (
                          <Cell fill={COLORS[index % COLORS.length]} />
                        ))}
                        {/* <LabelList dataKey="name" position="outside" /> */}
                      </Pie>
                      <Legend
                        iconType="circle"
                        wrapperStyle={{ fontSize: 12, color: "#6D7084" }}
                      />
                      <Tooltip
                        cursor={{ fill: "#F0F0F0", opacity: 0.6 }}
                        wrapperStyle={{
                          background: "#9ACBD9",
                          borderWidth: 2,
                          borderRadius: 100,
                          borderColor: "#fff",
                          color: "#FFF",
                          shadowColor: "#000",
                          shadowOpacity: 0.2,
                          shadowOffset: { width: 1, height: 3 },
                          zIndex: 100
                        }}
                        itemStyle={{
                          color: "#fff",
                          fontSize: 16,
                          fontWeight: 400
                        }}
                        offset={30}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : null}
                {!isLoading ? (
                  <img
                    src={require("../assets/child.png")}
                    className="condition-chart-img"
                    alt=""
                    draggable={false}
                  />
                ) : null}
              </div>

              {/* <div className="condition-chart-background" /> */}
            </Card>
            <Card
              title="大眾學童平均睡眠時間的記憶力指數"
              style={{ width: "100%" }}
              className="dashboard-index-card"
            >
              <ResponsiveContainer aspect={1.5}>
                <BarChart data={avgSleepMemoryData}>
                  <Tooltip cursor={{ fill: "#F0F0F0", opacity: 0.6 }} />
                  {!isLoading ? (
                    <Bar
                      dataKey="score"
                      fill="#9ACBD9"
                      animationDuration={2000}
                      barSize={25}
                    />
                  ) : null}
                  <XAxis
                    dataKey="sleeptime"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis axisLine={false} tickLine={false} />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(109,112,132,0.2)"
                    vertical={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
