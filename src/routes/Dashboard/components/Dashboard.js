import React from "react";
import PropTypes from "prop-types";
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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 800);
  }
  preventAnonymousAccess = () => {
    if (this.props.user) {
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
    return (
      <div>
        {isLoading && <Loading />}
      </div>
    );
  }
}

export default Dashboard;
