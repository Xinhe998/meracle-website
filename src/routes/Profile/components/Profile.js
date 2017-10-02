import React from 'react'
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router'
// import './HomeView.scss'
export default class Profile extends React.Component {
    static propTypes = {};
    constructor(props) {
        super(props);
        this.state = {
            userName: '',  
            password: '',
        };
        this.logout = this.logout.bind(this);
    }
    componentWillMount() {
        // this.preventAnonymousAccess()
    }
    logout() {
    }
    preventAnonymousAccess = () => {
        if (this.props.user) {
          alert('請先登入')
          browserHistory.push('/Login')
        }
      }
    getProfileData = async () => {
        console.log(formData);
        await fetch('http://meracal.azurewebsites.net/api/Member/PersonalPage', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
              Account: formData.account,
              Password: formData.password,
            })
          })
          .then((res) => res.json())
          .then(function(responseJson) {
              console.log(responseJson);
              switch(responseJson.result) {
                  case '帳號錯誤':
                  break;
                  case '密碼錯誤':
                  break;
                  case '帳號錯誤':
                  break;
              }
          }, function(e) {
            console.log(e);
          });
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
