import React from "react";
import PropTypes from "prop-types";
// import { browserHistory, History } from "react-router";
import { Card, Icon, Button, Table, Modal, Menu, Dropdown } from "antd";
import Loading from "../../../components/Loading";
import "./MemoryResult.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
const project = require("../../../../project.config");

export default class MemoryResult extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isHaveChild: false,
      selectedCdName: "",
      selectedStatus: ""
    };
  }
  async componentWillMount() {
    await this.checkHavaChild();
    if (this.state.isHaveChild) {
      await this.getChildData();
    }
    await setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 300);
  }
  checkHavaChild = async () => {
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
    const child_color = ["#9ACBD9", "#F5808B", "#F2992E", "#2F9A9E", "#A77DC2"];
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
                avatar: "",
                color: child_color[index]
              };
              cdArray.push(cdData);
            }
            this.props.getChildData(cdArray);
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
        },
        function(e) {
          console.log(e);
        }
      );
    //依取得的學童姓名拿詳細資料
    var cdDetailArray = [];
    for (var index in this.props.child) {
      await fetch("https://www.meracle.me/home/api/Member/CdPersonalPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.props.user.authorization
        },
        body: JSON.stringify({
          Account: this.props.user.account,
          CdName: this.props.child[index].name
        })
      })
        .then(res => res.json())
        .then(
          responseJson => {
            if (responseJson.length) {
              var cdDetailData = {
                name: responseJson[0].CdName,
                gender: responseJson[0].Gender.trim(),
                birth: responseJson[0].Birthday,
                avatar: responseJson[0].Imageurl,
                color: child_color[index]
              };
              cdDetailArray.push(cdDetailData);
            }
          },
          function(e) {
            console.log(e);
          }
        );
      this.props.getChildData(cdDetailArray);
    }
  };
  handleCdNameDropdownClick = event => {
    this.setState({
      selectedCdName: event.item.props.children.props.children[1],
      selectedSymbol: event.item.props.children.props.children[0]
    });
  };
  handleStatusDropdownClick = event => {
    this.setState({
      selectedStatus: event.item.props.children
    });
  };

  render() {
    const isLoading = this.state.isLoading;
    const statusArr = ["運動前", "運動後", "吃飯前", "吃飯後", "睡覺前", "剛睡醒"];
    const child = this.props.child;
    var dropdownIndex = 0;
    const dropdownCdName = (
      <Menu
        selectable
        defaultActiveFirst
        onSelect={this.handleCdNameDropdownClick}
      >
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
    const dropdownStatus = (
      <Menu
        selectable
        defaultActiveFirst
        onSelect={this.handleStatusDropdownClick}
      >
        {Object.keys(statusArr).map(function(index) {
          dropdownIndex = dropdownIndex + 1;
          return <Menu.Item key={dropdownIndex}>{statusArr[index]}</Menu.Item>;
        })}
      </Menu>
    );

    const memory_data = [
      { name: "週一", 黃小明: 90 },
      { name: "週二", 黃小明: 65 },
      { name: "週三", 黃小明: 80 },
      { name: "週四", 黃小明: 95 },
      { name: "週五", 黃小明: 88 },
      { name: "週六", 黃小明: 95 },
      { name: "週日", 黃小明: 50 }
    ];

    const memoryDataSource = [
      {
        key: "1",
        time: "2017/10/30（一）  18:00",
        status: "睡覺前",
        score: 80
      }
    ];

    const memoryDataColumns = [
      {
        title: "時間",
        dataIndex: "time",
        key: "time",
        width: 300
      },
      {
        title: "狀態",
        dataIndex: "status",
        key: "status",
        width: 150
      },
      {
        title: "分數",
        dataIndex: "score",
        key: "score",
        width: 150
      }
    ];
    return (
      <div>
        {isLoading && <Loading />}
        <div className="row">
          <Card
            style={{ width: "100%", marginBottom: 20 }}
            title="學童記憶力圖表"
            className="memory_result_wrapper"
          >
            <div className="row dropdown-wrapper">
              <div className="col-md-12 col-lg-3 cdname-dropdown-wrapper">
                <p>顯示學童</p>
                <Dropdown.Button
                  overlay={dropdownCdName}
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
              <div className="col-md-12 col-lg-3 status-dropdown-wrapper">
                <p>顯示狀態</p>
                <Dropdown.Button
                  overlay={dropdownStatus}
                  trigger={["click"]}
                  placement="bottomRight"
                  className="meracle-dropdown-btn"
                >
                  {this.state.selectedStatus ? this.state.selectedStatus : "全部"}
                </Dropdown.Button>
              </div>
            </div>
            <div className="row memory_result_chart_wrapper">
              <ResponsiveContainer aspect={3.5} className="memory_result_chart">
                <LineChart data={memory_data} className="linechart">
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tick={{ fill: "#6D7084", fontSize: 12, opacity: 0.8 }}
                    axisLine={false}
                  />
                  <YAxis
                    tickLine={false}
                    tick={{ fill: "#6D7084", fontSize: 12, opacity: 0.8 }}
                    axisLine={false}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke="#B4DAE5" />
                  <Tooltip />
                  {!isLoading ? (
                    <Line
                      type="monotone"
                      dataKey="黃小明"
                      stroke="#9ACBD9"
                      strokeWidth="4"
                      dot={{ stroke: "#9ACBD9", strokeWidth: 4 }}
                      animationDuration={2000}
                    />
                  ) : null}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="row memory_table_wrapper">
              <div className="col-md-3">
                <Table
                  dataSource={memoryDataSource}
                  columns={memoryDataColumns}
                  pagination={false}
                  bordered
                  showHeader={false}
                />
                <Table
                  dataSource={memoryDataSource}
                  columns={memoryDataColumns}
                  pagination={false}
                  bordered
                  showHeader={false}
                />
                <Table
                  dataSource={memoryDataSource}
                  columns={memoryDataColumns}
                  pagination={false}
                  bordered
                  showHeader={false}
                />
              </div>
              <div className="col-md-9">
                <Table
                  dataSource={memoryDataSource}
                  columns={memoryDataColumns}
                  pagination={false}
                  bordered
                  scroll={{ y: 200 }}
                  className="memory_table"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
