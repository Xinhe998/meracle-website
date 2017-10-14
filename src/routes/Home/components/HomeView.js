import React from "react";
import PropTypes from "prop-types";
import "./HomeView.scss";
import Loading from "../../../components/Loading";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [
        { name: "", 黃小明: 50, 陳小花: 200 },
        { name: "9/2", 黃小明: 90, 陳小花: 150 },
        { name: "9/5", 黃小明: 65, 陳小花: 130 },
        { name: "9/7", 黃小明: 80, 陳小花: 70 },
        { name: "9/8", 黃小明: 95, 陳小花: 68 },
        { name: "9/11", 黃小明: 88, 陳小花: 100 },
        { name: "9/15", 黃小明: 120, 陳小花: 160 }
      ],
      isScrollToChart: false
    };
    this.handleChartScroll = this.handleChartScroll.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 800);
    window.addEventListener("scroll", this.handleChartScroll);
    
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleChartScroll);
  }
  isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return elemBottom <= docViewBottom && elemTop >= docViewTop;
  }
  handleChartScroll(event) {
    if (this.isScrolledIntoView(document.getElementById("welcome-section"))) {
      this.setState({
        isScrollToChart: true
      });
    }
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
    const isScrollToChart = this.state.isScrollToChart;
    return (
      <div>
        {isLoading && <Loading />}
        <div id="welcome-section">
          <div className="container">
            <h1>憶想奇機</h1>
          </div>
        </div>
        <div id="feature-section">
          <div className="container">
            <h1>特色</h1>
            <LineChart
              width={700}
              height={400}
              data={this.state.data}
              className="linechart"
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" stroke="#B4DAE5" />
              <Tooltip wrapperStyle="{{bor}}" />
              <Legend />
              {isScrollToChart ? (
                <Line
                  type="monotone"
                  dataKey="黃小明"
                  stroke="#2F9A9E"
                  strokeWidth="4"
                  dot={{ stroke: "#2F9A9E", strokeWidth: 4 }}
                />
              ) : null}
              {isScrollToChart ? (
                <Line
                  type="monotone"
                  dataKey="陳小花"
                  stroke="#F5808B"
                  strokeWidth="4"
                  dot={{ stroke: "#F5808B", strokeWidth: 4 }}
                />
              ) : null}
            </LineChart>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
