import React from "react";
import PropTypes from "prop-types";
import "./HomeView.scss";
import Loading from "../../../components/Loading";
import { Link } from "react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Area
} from "recharts";
import { Button } from "antd";

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [
        { name: "一", 黃小明: 30 },
        { name: "二", 黃小明: 40 },
        { name: "三", 黃小明: 50 },
        { name: "四", 黃小明: 57 },
        { name: "五", 黃小明: 60 },
        { name: "六", 黃小明: 75 },
        { name: "日", 黃小明: 74 }
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
    return elemBottom <= docViewBottom && elemTop <= docViewTop;
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
            <img
              src={require("../../../components/assets/logo_no_background.png")}
              className="d-inline-block align-top meracle-index-logo"
              alt=""
            />
            <h1>憶想奇機</h1>
            <h3>為孩子的記憶力創造奇蹟</h3>
            <Button className="index-joinus-btn">加入我們</Button>
            <div className="row">
              <div className="demo-device-wrapper">
                <img
                  src={require("../assets/cellphone.png")}
                  className="d-inline-block align-top meracle-index-cellphone"
                  alt=""
                />
                <img
                  src={require("../assets/laptop.png")}
                  className="d-inline-block align-top meracle-index-laptop"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div id="features-section">
          <div className="container">
            <h1>
              憶想奇蹟打造完善的系統<br />讓孩童開心成長
            </h1>
            <div className="row">
              <img
                src={require("../assets/map.png")}
                className="d-inline-block align-top meracle-index-map float-left"
                alt=""
              />
              <div className="meracle-feature-wrapper-border" />
              <div className="meracle-feature-wrapper float-right">
                <h2>憶想城市</h2>
                <h3>
                  加入孩子最喜歡的多種遊戲 一邊開心玩樂 一邊增加記憶力
                  並且我們將更努力建造豐富的憶想城市
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="meracle-feature-wrapper-border" />
              <div className="meracle-feature-wrapper float-right">
                <h2>
                  測量腦波<br />量化為記憶力
                </h2>
                <h3>
                  加入孩子最喜歡的多種遊戲 一邊開心玩樂 一邊增加記憶力
                  並且我們將更努力建造豐富的憶想城市
                </h3>
              </div>
              <img
                src={require("../assets/girlAndPhone.png")}
                className="d-inline-block align-top meracle-index-map float-left"
                alt=""
              />
            </div>
            <div className="row">
              <img
                src={require("../assets/img_cards.png")}
                className="d-inline-block align-top meracle-index-map float-left"
                alt=""
              />
              <div className="meracle-feature-wrapper-border" />
              <div className="meracle-feature-wrapper float-right">
                <h2>多元統計數據</h2>
                <h3>
                  提供您每個孩童的個人紀錄、綜合圖表
                  並且持續更新大眾孩童的統計數據 還想知道什麼？告訴我們！
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="meracle-feature-wrapper-border" />
              <div className="meracle-feature-wrapper float-right">
                <h2>提升記憶力</h2>
                <h3>
                  我們根據理論、調查訪談、實際測試 確實幫助孩童提升工作記憶力了
                  超級棒吧！
                </h3>
              </div>
              <ComposedChart
                width={366}
                height={223}
                data={this.state.data}
                className="linechart"
              >
                <XAxis dataKey="name" axisLine={false} />
                <YAxis axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#B4DAE5" />
                {isScrollToChart ? (
                  <Line
                    type="monotone"
                    dataKey="黃小明"
                    stroke="#2F9A9E"
                    strokeWidth="4"
                    dot={{ stroke: "#2F9A9E", strokeWidth: 4, fill: "#2F9A9E" }}
                  />
                ) : null}
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2F9A9E" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#2F9A9E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                {isScrollToChart ? (
                  <Area
                    type="monotone"
                    dataKey="黃小明"
                    stroke="#2F9A9E"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                ) : null}
              </ComposedChart>
            </div>
          </div>
        </div>
        <div id="data-section">
          <div className="container">
            <h1>期待您的加入 跟我們一起成長</h1>
            <div className="row">
              <div className="col-md-4 ">
                <div className="data-item-wrapper-left">
                  <p>96</p>人<br />
                  加入憶想奇機
                </div>
              </div>
              <div className="col-md-4">
                <div className="data-item-wrapper-middle">
                  <p>196</p>位學童<br />
                  提升了記憶力
                </div>
              </div>
              <div className="col-md-4">
                <div className="data-item-wrapper-right">
                  <p>79</p>%<br />
                  的上升幅度
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="qa-section">
          <div className="container">
            <h1>如何簡單測驗腦波？</h1>
            <div className="row">
              <div className="col-md-5">
                <img
                  src={require("../assets/cellphone_connect_bluetooth.png")}
                  className="d-inline-block align-top meracle-index-map float-right"
                  alt=""
                />
              </div>
              <div className="col-md-7 qa-steps">
                <div className="row">
                  <div className="col-md-1">
                    <span className="active">1</span>
                  </div>
                  <div className="col-md-11">
                    <h3 className="active">按下開始 偵測藍芽</h3>
                    <h4 className="active">
                      下載App後 按下開始測量 系統會自動偵測附近的藍芽裝置
                    </h4>
                  </div>
                  <div className="col-md-1">
                    <span>2</span>
                  </div>
                  <div className="col-md-11">
                    <h3>調整至訊號歸零</h3>
                    <h4>成功連結腦波耳機後 調整手機位置 直到訊號歸零</h4>
                  </div>
                  <div className="col-md-1">
                    <span>3</span>
                  </div>
                  <div className="col-md-11">
                    <h3>開始測量腦波</h3>
                    <h4>
                      在您網站的遊戲按下開始並測量腦波後 系統會自動測量腦波
                    </h4>
                  </div>
                  <div className="col-md-1">
                    <span>4</span>
                  </div>
                  <div className="col-md-11">
                    <h3>選擇狀態</h3>
                    <h4>
                      測量完成！選擇您的孩童測量當時狀態 我們將為您做記錄和統計
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="user-experience-section">
          <div className="container">
            <h1>聽聽我們用戶的使用心得</h1>
          </div>
        </div>
        <div id="aboutus-section">
          <div className="container">
            <h1>團隊成員介紹</h1>
            <div className="x1">
              <div className="cloud">
                <img
                  src={require("../assets/cloud.png")}
                  className="d-inline-block align-top"
                  alt=""
                />
              </div>
            </div>
            <div className="x2">
              <div className="cloud">
                <img
                  src={require("../assets/cloud.png")}
                  className="d-inline-block align-top"
                  alt=""
                />
              </div>
            </div>
            
            <div className="row">
              <div className="team-member col-md-4">
                <Link
                  to={"https://www.facebook.com/xinhe998"}
                  className="index-member-link"
                >
                  <div className="team-member-avatar-wrapper">
                    <img
                      src={require("../assets/xinhe.jpg")}
                      className="d-inline-block align-top meracle-team-avatar"
                      alt=""
                    />
                  </div>
                  <p className="team-member-name">許歆荷</p>
                  <p className="team-member-position">Front-End Developer</p>
                </Link>
              </div>
              <div className="team-member col-md-4">
                <Link
                  to={
                    "https://www.facebook.com/profile.php?id=100001456991783&lst=100002124966844%3A100001456991783%3A1512152084"
                  }
                  className="index-member-link"
                >
                  <div className="team-member-avatar-wrapper">
                    <img
                      src={require("../assets/fufu.jpg")}
                      className="d-inline-block align-top meracle-team-avatar"
                      alt=""
                    />
                  </div>
                  <p className="team-member-name">王敬夫</p>
                  <p className="team-member-position">Back-End Developer</p>
                </Link>
              </div>
              <div className="team-member col-md-4">
                <Link
                  to={"https://www.facebook.com/joyceljy656"}
                  className="index-member-link"
                >
                  <div className="team-member-avatar-wrapper">
                    <img
                      src={require("../assets/joyce.jpg")}
                      className="d-inline-block align-top meracle-team-avatar"
                      alt=""
                    />
                  </div>
                  <p className="team-member-name">林家妤</p>
                  <p className="team-member-position">App Developer</p>
                </Link>
              </div>
              <div className="team-member col-md-4">
                <Link
                  to={
                    "https://www.facebook.com/profile.php?id=100002707651200&lst=100002124966844%3A100002707651200%3A1512152257"
                  }
                  className="index-member-link"
                >
                  <div className="team-member-avatar-wrapper">
                    <img
                      src={require("../assets/xuan.jpg")}
                      className="d-inline-block align-top meracle-team-avatar"
                      alt=""
                    />
                  </div>
                  <p className="team-member-name">兵珮瑄</p>
                  <p className="team-member-position">App Developer</p>
                </Link>
              </div>
              <div className="team-member col-md-4">
                <Link
                  to={
                    "https://www.facebook.com/profile.php?id=100009919545106&lst=100002124966844%3A100009919545106%3A1512152215"
                  }
                  className="index-member-link"
                >
                  <div className="team-member-avatar-wrapper">
                    <img
                      src={require("../assets/yalu.jpg")}
                      className="d-inline-block align-top meracle-team-avatar"
                      alt=""
                    />
                  </div>
                  <p className="team-member-name">林亞儒</p>
                  <p className="team-member-position">UIUX Designer</p>
                </Link>
              </div>
              <div className="team-member col-md-4">
                <Link
                  to={"https://www.facebook.com/A6ZZZZ"}
                  className="index-member-link"
                >
                  <div className="team-member-avatar-wrapper">
                    <img
                      src={require("../assets/a6.jpg")}
                      className="d-inline-block align-top meracle-team-avatar"
                      alt=""
                    />
                  </div>
                  <p className="team-member-name">劉競勻</p>
                  <p className="team-member-position">UIUX Designer</p>
                </Link>
              </div>
            </div>
            <div className="x3">
              <div className="cloud">
                <img
                  src={require("../assets/cloud.png")}
                  className="d-inline-block align-top"
                  alt=""
                />
              </div>
            </div>
            <div className="x2">
              <div className="cloud">
                <img
                  src={require("../assets/cloud.png")}
                  className="d-inline-block align-top"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div id="footer-section">
          <div className="container">
            <h1>憶想奇機 如何創造奇蹟？</h1>
            <p>
              市面上充斥著許多記憶力訓練的遊戲或教材，但是我們不想讓用戶覺得每次的記憶力訓練都可有可無，我們想讓您知道每次的進步或退步，甚至提供影響記憶力的因素給您參考，孩童的成長是很重要的，相信這是我們的共識！你知道為什麼我們叫做
              Meracle 嗎？快下載 App 你也可以創造奇蹟！
            </p>
            <Button className="index-download-btn">下載APP</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
