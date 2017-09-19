import React from "react"
import { IndexLink, Link } from "react-router"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import "./PageLayout.scss"
import Halogen from "halogen"

// const isLogin = this.props.user;
class PageLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };
  constructor(props) {
    super(props);
    this.state= {
      isLoading: true
    }
  }
  componentDidMount () {
    this.setState({
      isLoading: false
    })
  }
  render() {
    // console.log("!!!", this.props)
    const isLogin = (this.props.user) ? this.props.user.account : this.props.user ;
    const isLoading = (this.state.isLoading);
    return (
      <div className="container text-center">
        <div><Halogen.BeatLoader /></div>
        {isLoading && <div><Halogen.BeatLoader /></div>}
        <IndexLink to="/" activeClassName="page-layout__nav-item--active">
          Home
        </IndexLink>
        {" · "}
        <Link to="/login" activeClassName="page-layout__nav-item--active">
          登入
        </Link>
        {" · "}
        <Link to="/Register" activeClassName="page-layout__nav-item--active">
          註冊
        </Link>
        {isLogin && " · "}
        {isLogin &&
        <Link
          to="/forget_password"
          activeClassName="page-layout__nav-item--active"
        >
          忘記密碼
        </Link>
        }
        {isLogin && " · "}
        {isLogin &&
        <Link
          to="/change_password"
          activeClassName="page-layout__nav-item--active"
        >
          修改密碼
        </Link>
        }
        {isLogin && " · "}
        {isLogin &&
        <Link to="/profile" activeClassName="page-layout__nav-item--active">
          個人資料
        </Link>
        }
        {isLogin && " · "}
        {isLogin &&
        <Link to="/addChild" activeClassName="page-layout__nav-item--active">
          新增孩子
        </Link>
        }
        {isLogin && " · "}
        {isLogin &&
        <Link to="/logout" activeClassName="page-layout__nav-item--active">
          登出
        </Link>
        }
        <div className="page-layout__viewport">{this.props.children}</div>
      </div>
    )
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);
