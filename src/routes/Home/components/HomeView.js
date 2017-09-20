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
    const isLoading = this.state.isLoading;
    return (
      <div>
        {isLoading && (
          <Loading />
        )}
      </div>
    )
  }
}

export default HomeView
