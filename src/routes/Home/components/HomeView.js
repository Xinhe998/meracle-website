import React from 'react'
import PropTypes from "prop-types"
import './HomeView.scss'
import Loading from "../../../components/Loading"

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 300);
  }
  render() {
    const isMobile = 
    ( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    )
    const isLoading = this.state.isLoading;
    return (
      <div>
        {isLoading  && (
          <Loading />
        )}
      </div>
    )
  }
}

export default HomeView
