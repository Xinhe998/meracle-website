import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

// const isLogin = this.props.user;
export const PageLayout = ({ children }) => (
  
  <div className='container text-center'>
    <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
    {' · '}
    <Link to='/login' activeClassName='page-layout__nav-item--active'>登入</Link>
    {' · '}
    <Link to='/Register' activeClassName='page-layout__nav-item--active'>註冊</Link>
    {' · '}
    <Link to='/forget_password' activeClassName='page-layout__nav-item--active'>忘記密碼</Link>
    {' · '}
    <Link to='/change_password' activeClassName='page-layout__nav-item--active'>修改密碼</Link>
    {' · '}
    <Link to='/profile' activeClassName='page-layout__nav-item--active'>個人資料</Link>
    {' · '}
    <Link to='/logout' activeClassName='page-layout__nav-item--active'>登出</Link>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
