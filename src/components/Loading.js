import React from 'react'
import PropTypes from "prop-types";
import Halogen from "halogen";

export default class Loading extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoading: true
  //   };
  // }
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       isLoading: false
  //     });
  //   }, 300);
  // }
  render() {
    var color = "#064065";
    var overlayStyle = {
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
      height: "100%",
      WebkitAlignItems: "center",
      alignItems: "center",
      WebkitJustifyContent: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.9)",
      position: "absolute",
      zIndex: 100,
      top: 0,
      left: 0
    };
    // const isLoading = this.state.isLoading;
    return (
      <div style={overlayStyle}>
        <Halogen.BeatLoader color={color} size="20px" margin="6px" />
      </div>
    )
  }
}

// export default Loading
