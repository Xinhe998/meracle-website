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
  ReferenceLine,
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
  PolarGrid
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
        { name: "一", val: 40 },
        { name: "二", val: 30 },
        { name: "三", val: 20 },
        { name: "四", val: 57 },
        { name: "五", val: 68 },
        { name: "六", val: 53 },
        { name: "日", val: 74 }
      ],
      public_parents_confusion_data = [
        { name: "過動", value: 20 },
        { name: "自閉", value: 60 },
        { name: "學習障礙", value: 10 },
        { name: "智能障礙", value: 5 },
        { name: "其他特殊疾病", value: 5 }
      ],
      food_data = [
        { class: "全榖根莖類", val: 120 },
        { class: "蛋豆魚肉類", val: 98 },
        { class: "乳製類", val: 86 },
        { class: "蔬菜類", val: 99 },
        { class: "水果類", val: 85 }
      ];
    return (
      <div>
        {isLoading && <Loading />}
        <div>
          <Card
            title="大眾一周內記憶力最佳"
            style={{ width: "45%" }}
            className="dashboard-index-card"
          >
            <p>星期日</p>
            <p>平均記憶力指數：74分</p>
          </Card>
          <Card
            title="大眾一天內記憶力最佳"
            style={{ width: "45%" }}
            className="dashboard-index-card"
          >
            <p>14：00</p>
            <p>平均記憶力指數：85分</p>
          </Card>
        </div>
        <hr />
        <br />
        大眾記憶力
        <BarChart width={300} height={150} data={personal_average_memory_data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          {/* <Legend /> 圖例 */}
          {!isLoading ? (
            <Bar dataKey="val" fill="#f77c86" animationDuration={2000} />
          ) : null}
        </BarChart>
        大眾家長的困擾
        <PieChart width={300} height={150}>
          <Pie
            data={public_parents_confusion_data}
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          />
          <Tooltip />
        </PieChart>
        大眾孩童五類食物飲食習慣
        <RadarChart outerRadius={90} width={300} height={150} data={food_data}>
          <Radar
            name="比例"
            dataKey="val"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <PolarGrid />
          <Legend />
          <PolarAngleAxis dataKey="class" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
        </RadarChart>
      </div>
    );
  }
}
