import React from "react";
import PropTypes from "prop-types";
import Loading from "../../../components/Loading";
import { browserHistory } from "react-router";
import { Card, Progress, Icon } from "antd";
import "./Dashboard.scss";

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
      latest_percentage: 0
    };
  }
  componentWillMount() {}
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 800);
    this.animatePercentage();
  }
  animatePercentage = () => {
    var percent = 89;
    setTimeout(() => {
      this.setState({ latest_percentage: percent });
    }, 1000);
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
    const personal_average_memory_data = [
      { name: "一", val: 40 },
      { name: "二", val: 30 },
      { name: "三", val: 20 },
      { name: "四", val: 57 },
      { name: "五", val: 68 },
      { name: "六", val: 53 },
      { name: "日", val: 74 }
    ];
    const best_memory_data = [
      { name: "", 黃小明: 50, 陳小花: 200 },
      { name: "9/2", 黃小明: 90, 陳小花: 150 },
      { name: "9/5", 黃小明: 65, 陳小花: 130 },
      { name: "9/7", 黃小明: 80, 陳小花: 70 },
      { name: "9/8", 黃小明: 95, 陳小花: 68 },
      { name: "9/11", 黃小明: 88, 陳小花: 100 },
      { name: "9/15", 黃小明: 120, 陳小花: 160 }
    ];
    return (
      <div>
        {isLoading && <Loading />}
        <div>
          <div className="row">
            <div className="col-md-9">
              <Card
                title="個人平均狀態記憶力"
                style={{ width: "100%" }}
                className="dashboard-index-card avg-data-wrapper"
              >
                <ResponsiveContainer aspect={2.3}>
                  <BarChart data={personal_average_memory_data}>
                    <XAxis
                      dataKey="name"
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
                    {!isLoading ? (
                      <Bar
                        dataKey="val"
                        fill="#9ACBD9"
                        animationDuration={2000}
                      />
                    ) : null}
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
                    <p className="latest-data-name">黃小明</p>
                    <p className="latest-data-time">2017/09/12 18:22 睡覺前</p>
                    <Progress
                      type="circle"
                      percent={this.state.latest_percentage}
                      format={percent => `${percent}`}
                      strokeWidth={5}
                    />
                    <p className="progress-gain">
                      <Icon type="caret-up" /> 34
                    </p>
                  </Card>
                </div>
                <div className="col-md-12">
                  <Card
                    title="本週最佳表現"
                    style={{ width: "100%" }}
                    className="dashboard-index-card best-data-wrapper"
                  >
                    <span>
                      <Icon type="calendar" /> 週五
                    </span>　　<span>
                      <Icon type="user" /> 陳小花
                    </span>
                  </Card>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <Card
                title="各狀態平均記憶力"
                style={{ width: "100%" }}
                className="dashboard-index-card"
              >
                <ResponsiveContainer aspect={1.5}>
                  <BarChart
                    data={personal_average_memory_data}
                    layout="vertical"
                  >
                    <XAxis
                      dataKey="val"
                      type="number"
                      tickLine={false}
                      tick={{ fill: "#6D7084", fontSize: 12, opacity: 0.8 }}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tickLine={false}
                      tick={{ fill: "#6D7084", fontSize: 12, opacity: 0.8 }}
                    />
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <Tooltip cursor={{ fill: "#F0F0F0" }} />
                    {!isLoading ? (
                      <Bar
                        dataKey="val"
                        fill="#9ACBD9"
                        animationDuration={2000}
                        label={{
                          fontSize: 12,
                          position: "right",
                          fill: "#9ACBD9"
                        }}
                      />
                    ) : null}
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <div className="col-md-6">
              <Card
                title="一天內記憶力最佳"
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
