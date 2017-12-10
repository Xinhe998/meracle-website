import React from "react";
import "./NotFound.scss";
import { browserHistory } from "react-router";
import { Button } from "antd";

export const NotFound = () => (
  <div className="notfound-wrapper">
    <img
      src={require("../../../components/assets/logo_no_background.png")}
      className="logo"
      alt=""
    />
    <p>
      Oops！ <br />抱歉，您要找的網頁找不到
    </p>
    <br />
    <div className="bottom-btn-wrapper">
      <Button
        size="large"
        className="meracle-btn"
        onClick={() => browserHistory.push("/my_meracle/")}
      >
        {" "}
        回首頁{" "}
      </Button>
    </div>
  </div>
);

export default NotFound;
