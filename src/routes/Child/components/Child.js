import React from "react";
import PropTypes from "prop-types";
import { browserHistory, Link, History } from "react-router";
import { Card, Icon, Button, Table, Modal } from "antd";
import Loading from "../../../components/Loading";
import "./Child.scss";
const confirm = Modal.confirm;
// import './HomeView.scss'
export default class Child extends React.Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isHaveChild: false
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
                avatar: ""
              };
              cdArray.push(cdData);
            }
            this.props.getChildData(cdArray);
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
                avatar: responseJson[0].Imageurl
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

  render() {
    const editChild = async (cdName, cdBirth) => {
      sessionStorage.child_editing_name = cdName;
      sessionStorage.child_editing_birth = cdBirth;
      await browserHistory.push("/React/dashboard/edit_child/");
    };
    const deleteChild = async cdName => {
      const user = this.props.user;
      confirm({
        title: "您確定刪除此位學童資料嗎？",
        content: "刪除後學童的所有記憶力測量資料將無法復原",
        okText: "確定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          fetch("https://www.meracle.me/home/api/Member/RmCdMember", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: user.authorization
            },
            body: JSON.stringify({
              Account: user.account,
              CdName: cdName
            })
          })
            .then(res => res.json())
            .then(
              responseJson => {
                if (responseJson.result === "success") {
                  browserHistory.refresh();
                }
              },
              function(e) {
                console.log(e);
              }
            );
        },
        onCancel() {}
      });
    };
    const columns = [
      {
        title: "頭像",
        dataIndex: "avatar"
      },
      {
        title: "姓名",
        className: "column-name",
        dataIndex: "name"
      },
      {
        title: "性別",
        dataIndex: "gender"
      },
      {
        title: "出生年月日",
        className: "column-birth",
        dataIndex: "birth"
      },
      {
        title: "編輯/刪除",
        className: "column-edit",
        dataIndex: "edit"
      }
    ];

    var tableData = [];
    const child = this.props.child;
    Object.keys(child).map(function(key, index) {
      tableData.push({
        key: index,
        avatar: (
          <div className="avatar-wrapper">
            {child[index].avatar !== "" ? (
              <img
                className="dashboard-avatar"
                src={
                  "https://www.meracle.me/home/Filefolder/" +
                  child[index].avatar +
                  "?time=" +
                  new Date().getTime()
                }
                alt=""
              />
            ) : (
              <img
                className="dashboard-avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                alt=""
              />
            )}
          </div>
        ),
        name: child[index].name,
        gender: child[index].gender,
        birth: child[index].birth,
        edit: (
          <div className="link-wrapper">
            <Link
              className="child-edit-link"
              onClick={() => {
                editChild(child[index].name, child[index].birth);
              }}
            >
              編輯
            </Link>
            <Link
              className="delete-link"
              onClick={() => {
                deleteChild(child[index].name);
              }}
            >
              刪除
            </Link>
          </div>
        )
      });
    });
    const startFarmerGame = cdName => {
      var newWindow = window.open("../../Game/FarmerGame/farmer.html");
      newWindow.account = this.props.user.account;
      newWindow.authorization = this.props.user.authorization;
      newWindow.child_name = cdName;
      //取用：window.account
    };
    const startBackerGame = cdName => {
      var newWindow = window.open("../../Game/BakeryGame/game_first_page.html");
      newWindow.account = this.props.user.account;
      newWindow.authorization = this.props.user.authorization;
      newWindow.child_name = cdName;
    };
    const isLoading = this.state.isLoading;
    return (
      <div>
        {isLoading && <Loading />}
        <Card
          style={{ width: "90%", marginBottom: 20 }}
          title="學童資料"
          className="child-wrapper"
        >
          <Table
            columns={columns}
            dataSource={tableData}
            bordered
            pagination={false}
            className="child-table"
          />
        </Card>
        <div className="child-footer">
          憶想奇蹟提供您可以管理五個孩童喔！<br />
          還想讓更多孩童加入我們嗎？ 快來{"  "}
          <Link to="/React/dashboard/addChild" className="child-edit-link">
            新增學童
          </Link>
        </div>
      </div>
    );
  }
}
