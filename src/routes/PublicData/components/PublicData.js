import React from "react";
import PropTypes from "prop-types";
import Loading from "../../../components/Loading";
import { browserHistory } from "react-router";
import { Card } from "antd";

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
  ResponsiveContainer
} from "recharts";

export default class PublicData extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentWillMount() {}
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 800);
  }
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
        { name: "8歲以下", val: 40 },
        { name: "9-10歲", val: 70 },
        { name: "11-12歲", val: 80 },
        { name: "12-13歲", val: 57 },
        { name: "14歲以上", val: 68 }
      ],
      public_parents_confusion_data = [
        { name: "過動", value: 0 },
        { name: "自閉", value: 0 },
        { name: "正常", value: 99.5 },
        { name: "學習障礙", value: 0 },
        { name: "智能障礙", value: 0 },
        { name: "其他特殊疾病", value: 0.5 }
      ],
      food_data = [
        { class: "全榖根莖類", val: 120 },
        { class: "蛋豆魚肉類", val: 98 },
        { class: "乳製類", val: 86 },
        { class: "蔬菜類", val: 99 },
        { class: "水果類", val: 85 }
      ];
    const best_memory_data = [
      { day: "週一", name: 90 },
      { day: "週二", name: 65 },
      { day: "週三", name: 80 },
      { day: "週四", name: 95 },
      { day: "週五", name: 50 },
      { day: "週六", name: 100 },
      { day: "週日", name: 70 }
    ];
    return (
      <div>
        {isLoading && <Loading />}
        <div className="row">
          <div className="col-md-6">
            <Card
              title="大眾一周內記憶力最佳"
              style={{ width: "100%" }}
              className="dashboard-index-card"
            >
              <p>週六</p>
              <p>平均記憶力指數：100分</p>
            </Card>
          </div>
          <div className="col-md-6">
            <Card
              title="大眾一天內記憶力最佳"
              style={{ width: "100%" }}
              className="dashboard-index-card"
            >
              <p>14：00</p>
              <p>平均記憶力指數：85分</p>
            </Card>
          </div>
        </div>
        <hr />
        <br />
        <div className="row">
          <div className="col-md-6">
            <Card
              title="大眾孩童飲食攝取"
              style={{ width: "100%" }}
              className="dashboard-index-card"
            >
              <ResponsiveContainer aspect={1.5}>
                <RadarChart data={food_data}>
                  <Radar
                    name="比例"
                    dataKey="val"
                    stroke="#F5808B"
                    fill="#F5808B"
                    fillOpacity={0.6}
                  />
                  <PolarGrid />
                  <Legend iconType="circle" />
                  <PolarAngleAxis dataKey="class" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} />
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
              <ResponsiveContainer aspect={1.5}>
                <PieChart>
                  <Pie data={public_parents_confusion_data} fill="#9ACBD9" />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Card
              title="大眾孩童睡眠時間"
              style={{ width: "100%" }}
              className="dashboard-index-card"
            >
              <ResponsiveContainer aspect={1.5}>
                <BarChart data={personal_average_memory_data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip cursor={{ fill: "#F0F0F0", opacity: 0.6 }} />
                  {!isLoading ? (
                    <Bar
                      dataKey="val"
                      fill="#2F9A9E"
                      animationDuration={2000}
                      barSize={25}
                    />
                  ) : null}
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
          <div className="col-md-6">
            <Card
              title="大眾孩童每週記憶力"
              style={{ width: "100%" }}
              className="dashboard-index-card"
            >
              <ResponsiveContainer aspect={1.5}>
                <LineChart data={best_memory_data} className="linechart">
                  <XAxis
                    dataKey="day"
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
                  {!isLoading ? (
                    <Line
                      type="monotone"
                      dataKey="name"
                      stroke="#F2992E"
                      strokeWidth="4"
                      dot={{ stroke: "#F2992E", strokeWidth: 4 }}
                      animationDuration={2000}
                    />
                  ) : null}
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
