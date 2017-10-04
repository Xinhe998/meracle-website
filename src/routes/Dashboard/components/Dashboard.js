import React from "react";
import PropTypes from "prop-types";
import Loading from "../../../components/Loading";
import { browserHistory } from "react-router";
import { Card } from "antd";
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
  Bar
} from "recharts";

export default class Dashboard extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentWillMount() {
    this.preventAnonymousAccess();
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 800);
  }
  preventAnonymousAccess = () => {
    if (!this.props.user) {
      alert("請先登入");
      browserHistory.push("/Login");
    }
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
    return (
      <div>
        {isLoading && <Loading />}
        <div>
          <Card
            title="一周內記憶力最佳"
            style={{ width: "45%" }}
            className="dashboard-index-card"
          >
            <p>星期日</p>
            <p>平均記憶力指數：74分</p>
          </Card>
          <Card
            title="一天內記憶力最佳"
            style={{ width: "45%" }}
            className="dashboard-index-card"
          >
            <p>14：00</p>
            <p>平均記憶力指數：85分</p>
          </Card>
        </div>
        <hr />
        <br />
        個人記憶力
        <BarChart width={300} height={150} data={personal_average_memory_data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          {/* <Legend /> 圖例 */}
          <Bar dataKey="val" fill="#f77c86" />
        </BarChart>
      </div>
    );
  }
}
