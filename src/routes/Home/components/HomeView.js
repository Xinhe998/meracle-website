import React from "react";
import PropTypes from "prop-types";
import "./HomeView.scss";
import Loading from "../../../components/Loading";
import Login from "../../Login/containers/LoginContainer";
import ForgetPassword from "../../ForgetPassword/containers/ForgetPasswordContainer";
import Register from "../../Register/containers/RegisterContainer";
import { Link } from "react-router";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  Area,
  ResponsiveContainer
} from "recharts";
import { Button, Icon, Tooltip, BackTop } from "antd";
import Slider from "react-slick";
const project = require("../../../../project.config");

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
      isScrollToChart: false,
      isScrollToFooter: false,
      isScrollToQA: false,
      isHandlingLogin: false,
      isHandlingRegister: false,
      scrollY: 0
    };
    this.handleChartScroll = this.handleChartScroll.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentWillmount() {
    document.body.classList.add("overlay-open");
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 800);
    document.body.classList.remove("overlay-open");
    window.addEventListener("scroll", this.handleChartScroll);
    window.addEventListener("scroll", this.handleScroll);
    this.getTotalMember();
    this.getMemoryUpTotalMember();
    this.getMemoryUpPercent();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleChartScroll);
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll(event) {
    var y =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.setState({
      scrollY: y
    });
    if (y === 0) {
      document.getElementById("navbar").classList.remove("not-in-top");
    } else {
      document.getElementById("navbar").classList.add("not-in-top");
    }
  }
  isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return elemBottom <= docViewBottom && elemTop <= docViewTop;
  }
  handleChartScroll(event) {
    if (this.isScrolledIntoView(document.getElementById("features-section"))) {
      this.setState({
        isScrollToChart: true
      });
    }
    if (this.isScrolledIntoView(document.getElementById("data-section"))) {
      this.setState({
        isScrollToQA: true
      });
    }
    if (this.isScrolledIntoView(document.getElementById("aboutus-section"))) {
      this.setState({
        isScrollToFooter: true
      });
    } else {
      this.setState({
        isScrollToFooter: false
      });
    }
  }

  getTotalMember = async () => {
    await fetch("https://www.meracle.me/home/api/Survey/CountMember", {
      method: "GET"
    })
      .then(res => res.json())
      .then(
        responseJson => {
          this.setState({
            totalMember: responseJson
          });
        },
        function(e) {
          console.log(e);
        }
      );
  };

  getMemoryUpTotalMember = async () => {
    await fetch("https://www.meracle.me/home/api/Survey/CountMemberMemoryUp", {
      method: "GET"
    })
      .then(res => res.json())
      .then(
        responseJson => {
          this.setState({
            memoryUpTotalMember: responseJson[0].Updata
          });
        },
        function(e) {
          console.log(e);
        }
      );
  };

  getMemoryUpPercent = async () => {
    await fetch("https://www.meracle.me/home/api/Survey/CountMemberMemoryUp", {
      method: "GET"
    })
      .then(res => res.json())
      .then(
        responseJson => {
          this.setState({
            memoryUpPercent: responseJson[0].Updata
          });
        },
        function(e) {
          console.log(e);
        }
      );
  };

  handleLogin = () => {
    this.setState({
      isHandlingLogin: true,
      isHandlingRegister: false,
      isHandlingForgetPassword: false
    });
    document.body.classList.add("overlay-open");
  };
  stopLogin = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingForgetPassword: false,
      isHandlingRegister: false
    });
    document.body.classList.remove("overlay-open");
  };

  handleRegister = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingForgetPassword: false,
      isHandlingRegister: true
    });
    document.body.classList.add("overlay-open");
  };
  stopRegister = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingRegister: false,
      isHandlingForgetPassword: false
    });
    document.body.classList.remove("overlay-open");
  };

  handleForgetPassword = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingRegister: false,
      isHandlingForgetPassword: true
    });
    document.body.classList.add("overlay-open");
  };
  stopForgetPassword = () => {
    this.setState({
      isHandlingLogin: false,
      isHandlingRegister: false,
      isHandlingForgetPassword: false
    });
    document.body.classList.remove("overlay-open");
  };
  downloadApp = () => {
    window.location.href =
      "https://drive.google.com/uc?export=download&id=1Io-UE6QPMn8czCLoKRfbkbzvc8s-2xZW";
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
    const isScrollToChart = this.state.isScrollToChart;
    const isScrollToFooter = this.state.isScrollToFooter;
    const isScrollToQA = this.state.isScrollToQA;
    const isHandlingLogin = this.state.isHandlingLogin;
    const isHandlingRegister = this.state.isHandlingRegister;
    const isHandlingForgetPassword = this.state.isHandlingForgetPassword;
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    var formOverlayStyle = {
      display: "-webkit-flex",
      display: "flex",
      WebkitFlex: "0 1 auto",
      flex: "0 1 auto",
      WebkitFlexDirection: "column",
      flexDirection: "column",
      WebkitFlexGrow: 1,
      flexGrow: 1,
      WebkitFlexShrink: 0,
      flexShrink: 0,
      width: "100%",
      height: "105vh",
      WebkitAlignItems: "center",
      alignItems: "center",
      WebkitJustifyContent: "center",
      justifyContent: "center",
      position: "absolute",
      zIndex: 5000,
      top: this.state.scrollY,
      left: 0,
      overflowY: "hidden"
    };
    const isLogin = localStorage.getItem("state_user");
    return (
      <div>
        {isLoading && <Loading />}
        {isHandlingLogin && (
          <div style={formOverlayStyle} className="formOverlay">
            <img
              src={require("../../../components/assets/logo_no_background.png")}
              className="d-inline-block align-top meracle-index-logo"
              alt=""
            />
            <h1>登入</h1>
            <p>
              還沒有憶想奇蹟帳號？ <a onClick={this.handleRegister}>註冊</a>
            </p>
            <Tooltip placement="bottom" title={"關閉"}>
              <Icon type="close" onClick={this.stopLogin} />
            </Tooltip>
            <div className="form-card">
              <Login />
              <div className="bottom-btn-wrapper">
                <Link onClick={this.handleForgetPassword}>忘記密碼？</Link>
              </div>
            </div>
          </div>
        )}
        {isHandlingRegister && (
          <div style={formOverlayStyle} className="formOverlay">
            <img
              src={require("../../../components/assets/logo_no_background.png")}
              className="d-inline-block align-top meracle-index-logo"
              alt=""
            />
            <h1>註冊帳號</h1>
            <p>
              已經有憶想奇蹟帳號了？ <a onClick={this.handleLogin}>登入</a>
            </p>
            <Tooltip placement="bottom" title={"關閉"}>
              <Icon type="close" onClick={this.stopRegister} />
            </Tooltip>
            <div className="form-card">
              <Register />
            </div>
          </div>
        )}
        {isHandlingForgetPassword && (
          <div style={formOverlayStyle} className="formOverlay">
            <img
              src={require("../../../components/assets/logo_no_background.png")}
              className="d-inline-block align-top meracle-index-logo"
              alt=""
            />
            <h1>忘記密碼</h1>
            <p>
              <Link onClick={this.handleLogin}>登入</Link>{" "}
              <Link onClick={this.handleRegister}>重新註冊</Link>
            </p>
            <Tooltip placement="bottom" title={"關閉"}>
              <Icon type="close" onClick={this.stopForgetPassword} />
            </Tooltip>
            <div className="form-card">
              <ForgetPassword />
            </div>
          </div>
        )}
        {!isScrollToFooter && (
          <div id="sider-download-btn">
            <img
              src={require("../assets/kid.png")}
              className="img-fluid"
              alt=""
              draggable="false"
            />
            <Button
              className="index-download-btn"
              onClick={() => this.downloadApp}
            >
              下載APP
            </Button>
          </div>
        )}
        <div id="welcome-section">
          <div className="header">
            <ul>
              {!isLogin && (
                <li className="float-right" onClick={this.handleLogin}>
                  登入
                </li>
              )}

              {isLogin && (
                <li className="float-right">
                  <Link to={project.directory + "logout"}>登出</Link>
                </li>
              )}
              {isLogin && (
                <li className="float-right">
                  <Link to={project.directory + "dashboard/"}>管理</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="container">
            <img
              src={require("../../../components/assets/logo_no_background.png")}
              className="d-inline-block align-top meracle-index-logo"
              alt=""
            />
            <h1>憶想奇機</h1>
            <h3>為孩子的記憶力創造奇蹟</h3>
            <Button className="index-joinus-btn" onClick={this.handleRegister}>
              加入我們
            </Button>
            <div className="row">
              <div className="demo-device-wrapper">
                <img
                  src={require("../assets/laptop.png")}
                  className="d-inline-block align-top meracle-index-laptop img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div id="features-section">
          <div className="container">
            <h1>
              憶想奇機 學童腦波記憶力評估訓練系統<br />讓家長放心 孩子開心成長
            </h1>
            <div className="row">
              <div className="col-md-4 col-lg-6">
                <img
                  src={require("../assets/map.png")}
                  className="d-inline-block align-top float-left img-fluid"
                  alt=""
                />
              </div>
              <div className="col-md-8 col-lg-6">
                <div
                  className="meracle-feature-wrapper-border justify-feature-wrapper-border"
                  style={{ background: "#9acbd9" }}
                />
                <div
                  className="meracle-feature-wrapper float-right"
                  style={{ marginTop: -75 }}
                >
                  <h2>憶想城市</h2>
                  <h3>
                    加入孩子最喜歡的多種遊戲 一邊開心玩樂 一邊增加記憶力
                    並且我們將更努力建造豐富的憶想城市
                  </h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="meracle-feature-wrapper-border float-right"
                style={{
                  marginRight: 115,
                  background: "#F5808B",
                  position: "absolute",
                  marginTop: -5,
                  marginLeft: 355
                }}
              />
              <div className="col-md-8 col-lg-6">
                <div
                  className="meracle-feature-wrapper"
                  style={{ textAlign: "right" }}
                >
                  <h2>
                    測量腦波<br />記憶力指數量化
                  </h2>
                  <h3>
                    使用Neurosky腦波耳機收集記憶力的腦波訊號 一鍵按下 輕鬆量測<br
                    />得到目前記憶力指數
                  </h3>
                </div>
              </div>
              <div className="col-md-4 col-lg-6">
                <img
                  src={require("../assets/girlAndPhone.png")}
                  className="d-inline-block align-top float-right img-fluid"
                  alt=""
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-lg-6">
                <img
                  src={require("../assets/img_cards.png")}
                  className="d-inline-block align-top meracle-index-map float-left img-fluid"
                  alt=""
                />
              </div>
              <div className="col-md-8 col-lg-6">
                <div
                  className="meracle-feature-wrapper-border justify-feature-wrapper-border"
                  style={{ background: "#F2992E" }}
                />
                <div
                  className="meracle-feature-wrapper float-right"
                  style={{ marginTop: -75 }}
                >
                  <h2>多元統計數據</h2>
                  <h3>
                    提供您每個學童的最佳記憶時段與生理狀態，
                    個人紀錄、綜合圖表一次掌握 並且持續更新大眾學童的記憶力狀況
                    <br />還想知道什麼？告訴我們！
                  </h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="meracle-feature-wrapper-border float-right"
                style={{
                  marginLeft: 355,
                  background: "#2F9A9E",
                  position: "absolute",
                  marginTop: -5
                }}
              />
              <div className="col-md-8 col-lg-6">
                <div
                  className="meracle-feature-wrapper"
                  style={{ textAlign: "right" }}
                >
                  <h2>提升記憶力</h2>
                  <h3>
                    我們根據理論、調查訪談、實際測試<br />
                    確實能幫助學童提升工作記憶力了<br />超級棒吧！
                  </h3>
                </div>
              </div>
              <div className="col-md-4 col-lg-6">
                <ResponsiveContainer aspect={2.2}>
                  <ComposedChart data={this.state.data} className="linechart">
                    <XAxis dataKey="name" axisLine={false} />
                    <YAxis axisLine={false} />
                    <CartesianGrid strokeDasharray="3 3" stroke="#B4DAE5" />
                    {isScrollToChart ? (
                      <Line
                        type="monotone"
                        dataKey="黃小明"
                        stroke="#2F9A9E"
                        strokeWidth="4"
                        dot={{
                          stroke: "#2F9A9E",
                          strokeWidth: 4,
                          fill: "#2F9A9E"
                        }}
                      />
                    ) : null}
                    <defs>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#2F9A9E"
                          stopOpacity={0.6}
                        />
                        <stop
                          offset="100%"
                          stopColor="#2F9A9E"
                          stopOpacity={0}
                        />
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
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div id="data-section">
          <div className="container">
            <h1>期待您的加入 跟著我們一起提升記憶力</h1>
            <div className="row">
              <div className="col-md-4 ">
                <div className="data-item-wrapper-left" />
                <div className="data-content">
                  <p>{this.state.totalMember}</p>人<br />
                  加入憶想奇機
                </div>
              </div>
              <div className="col-md-4">
                <div className="data-item-wrapper-middle" />
                <div className="data-content">
                  <p>{this.state.memoryUpTotalMember}</p>位學童<br />
                  提升了記憶力
                </div>
              </div>
              <div className="col-md-4">
                <div className="data-item-wrapper-right" />
                <div className="data-content" style={{ marginLeft: 70 }}>
                  <p>{this.state.memoryUpPercent}</p>%<br />
                  的上升幅度
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="qa-section">
          <div className="container">
            <h1>如何簡單測量腦波記憶力指數？</h1>
            <div className="row">
              <div className="col-md-5">
                <div className="demo-wrapper">
                  {isScrollToQA && (
                    <img
                      src={require("../assets/mindwave_demo.gif")}
                      className="d-inline-block align-top img-fluid demo_gif"
                      alt=""
                      draggable="false"
                    />
                  )}
                  <img
                    src={require("../assets/cellphone_frame.png")}
                    className="d-inline-block align-top img-fluid"
                    alt=""
                    draggable="false"
                  />
                </div>
              </div>
              <div className="col-md-7 qa-steps">
                <div className="row">
                  <div className="col-md-2">
                    <span className="active">1</span>
                  </div>
                  <div className="col-md-10">
                    <h3 className="active">按下開始 偵測藍芽</h3>
                    <h4 className="active">
                      下載App後 按下開始測量 系統會自動偵測附近的藍芽裝置
                    </h4>
                  </div>
                  <div className="col-md-2">
                    <span>2</span>
                  </div>
                  <div className="col-md-10">
                    <h3>調整至訊號歸零</h3>
                    <h4>成功連結腦波耳機後 調整手機位置 直到訊號歸零</h4>
                  </div>
                  <div className="col-md-2">
                    <span>3</span>
                  </div>
                  <div className="col-md-10">
                    <h3>開始測量腦波</h3>
                    <h4>
                      在您網站的遊戲按下開始並測量腦波後 系統會自動測量腦波
                    </h4>
                  </div>
                  <div className="col-md-2">
                    <span>4</span>
                  </div>
                  <div className="col-md-10">
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
            <Slider {...settings}>
              <div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="user-photo-wrapper">
                      <img
                        src={require("../assets/user.png")}
                        className="d-inline-block align-top"
                        alt=""
                        draggable="false"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    我是國中三年級的許小昕，因為姐姐製作了這個系統，讓我可以第一個使用憶想奇機來提升記憶力，我最喜歡憶想城市裡的農夫收耕遊戲，一定會推薦更多同學來使用的！
                    <br />
                    <br />
                    <p className="user-experience-name float-right align-bottom">
                      許小昕
                    </p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
        <div id="aboutus-section">
          <div className="container">
            <h1>團隊成員</h1>
            <div className="x1">
              <div className="cloud">
                <img
                  src={require("../assets/cloud.png")}
                  className="d-inline-block align-top"
                  alt=""
                  draggable="false"
                />
              </div>
            </div>
            <div className="x2">
              <div className="cloud">
                <img
                  src={require("../assets/cloud.png")}
                  className="d-inline-block align-top"
                  alt=""
                  draggable="false"
                />
              </div>
            </div>

            <div className="row">
              <div className="team-member col-md-4">
                <a
                  href="https://www.facebook.com/xinhe998"
                  className="index-member-link"
                  target="_blank"
                >
                  <div className="team-member-avatar-wrapper">
                    <img
                      src={require("../assets/xinhe.jpg")}
                      className="d-inline-block align-top meracle-team-avatar"
                      alt=""
                      draggable="false"
                    />
                  </div>
                  <p className="team-member-name">許歆荷</p>
                  <p className="team-member-position">Front-End Developer</p>
                </a>
              </div>
              <div className="team-member col-md-4">
                <a
                  href="https://www.facebook.com/profile.php?id=100001456991783&lst=100002124966844%3A100001456991783%3A1512152084"
                  className="index-member-link"
                  target="_blank"
                >
                  <div className="team-member-avatar-wrapper">
                    <img
                      src={require("../assets/fufu.jpg")}
                      className="d-inline-block align-top meracle-team-avatar"
                      alt=""
                      draggable="false"
                    />
                  </div>
                  <p className="team-member-name">王敬夫</p>
                  <p className="team-member-position">Back-End Developer</p>
                </a>
              </div>
              <div className="team-member col-md-4">
                <a
                  href="https://www.facebook.com/joyceljy656"
                  className="index-member-link"
                  target="_blank"
                >
                  <div className="team-member-avatar-wrapper">
                    <img
                      src={require("../assets/joyce.jpg")}
                      className="d-inline-block align-top meracle-team-avatar"
                      alt=""
                      draggable="false"
                    />
                  </div>
                  <p className="team-member-name">林家妤</p>
                  <p className="team-member-position">App Developer</p>
                </a>
              </div>
            </div>
            <div className="x4">
              <div className="cloud">
                <img
                  src={require("../assets/cloud.png")}
                  className="d-inline-block align-top"
                  alt=""
                  draggable="false"
                />
              </div>
            </div>
            <div className="row">
              <div className="team-member col-md-4">
                <a
                  href="https://www.facebook.com/profile.php?id=100002707651200&lst=100002124966844%3A100002707651200%3A1512152257"
                  className="index-member-link"
                  target="_blank"
                >
                  <div className="team-member-avatar-wrapper">
                    <img
                      src={require("../assets/xuan.jpg")}
                      className="d-inline-block align-top meracle-team-avatar"
                      alt=""
                      draggable="false"
                    />
                  </div>
                  <p className="team-member-name">兵珮瑄</p>
                  <p className="team-member-position">App Developer</p>
                </a>
              </div>
              <div className="team-member col-md-4">
                <a
                  href="https://www.facebook.com/profile.php?id=100009919545106&lst=100002124966844%3A100009919545106%3A1512152215"
                  className="index-member-link"
                  target="_blank"
                >
                  <div className="team-member-avatar-wrapper">
                    <img
                      src={require("../assets/yalu.jpg")}
                      className="d-inline-block align-top meracle-team-avatar"
                      alt=""
                      draggable="false"
                    />
                  </div>
                  <p className="team-member-name">林亞儒</p>
                  <p className="team-member-position">UIUX Designer</p>
                </a>
              </div>
              <div className="team-member col-md-4">
                <a
                  href="https://www.facebook.com/A6ZZZZ"
                  className="index-member-link"
                  target="_blank"
                >
                  <div className="team-member-avatar-wrapper">
                    <img
                      src={require("../assets/a6.jpg")}
                      className="d-inline-block align-top meracle-team-avatar"
                      alt=""
                      draggable="false"
                    />
                  </div>
                  <p className="team-member-name">劉競勻</p>
                  <p className="team-member-position">UIUX Designer</p>
                </a>
              </div>
            </div>
            <div className="x3">
              <div className="cloud">
                <img
                  src={require("../assets/cloud.png")}
                  className="d-inline-block align-top"
                  alt=""
                  draggable="false"
                />
              </div>
            </div>
            <div className="x2">
              <div className="cloud">
                <img
                  src={require("../assets/cloud.png")}
                  className="d-inline-block align-top"
                  alt=""
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
        <div id="footer-section">
          <div className="container">
            <h1>憶想奇機 如何創造奇蹟？</h1>
            <p>
              經研究證實，在年紀越小時訓練記憶力，日後在每個學習階段均能迅速理解並活用，孩童的成長是很重要的，相信這是我們的共識！<br
              />
              你知道為何是 Meracle 嗎？<br />快下載 憶想奇機 App
              你也可以創造奇蹟！
            </p>
            <Button
              className="index-download-btn"
              onClick={() => this.downloadApp}
            >
              下載APP
            </Button>
          </div>
        </div>
        {isScrollToFooter && <BackTop />}
      </div>
    );
  }
}

export default HomeView;
