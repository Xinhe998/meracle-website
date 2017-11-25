import React from "react";
import "./NotFound.scss";

export const NotFound = () => (
  <div className="notfound-wrapper">
    <img
      src={require("../../../components/assets/logo_no_background.png")}
      className="logo"
      alt=""
    />
    <p>團隊正在水深火熱 開發中...</p>
    <p>敬請期待 ^_^</p>
  </div>
);

export default NotFound;
