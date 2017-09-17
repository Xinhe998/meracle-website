import React from 'react'
// import './HomeView.scss'
export default class Profile extends React.Component{
    constructor() {
        super();
        this.state = {
            userName: '',  
            password: '',
        };
        this.logout = this.logout.bind(this);
    }
    logout() {
    }
    getProfileData = async () => {
        console.log(formData);
        await fetch('http://localhost:64323/api/Member/PersonalPage', {
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
