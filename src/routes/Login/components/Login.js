import React from 'react'
// import './HomeView.scss'
export default class Login extends React.Component{
    constructor() {
        super();
        this.state = {
            account: '',
            password: '', 
        };
        this.logout = this.logout.bind(this);
    }
    logout() {
    }
    handleSubmit = async () => {
        var formData = {
            account: this.state.account,
            password: this.state.password,
        };
        console.log(formData);
        await fetch('http://163.17.135.185/7thWebApi/api/Member/Login', {
            method: 'POST',
            headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify({
              Account: formData.account,
              Password:  formData.password,
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
    handleAccountChange = (event) => {
        this.setState({ account: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
    render() {
        return (
            <div>
                <form>
                    <label>
                        帳號：
                        <input type='text' 
                            value={this.state.account}
                            onChange={this.handleAccountChange} />
                    </label>
                    <br />
                    <label>
                        密碼：
                        <input type='password' 
                            value={this.state.password}
                            onChange={this.handlePasswordChange} />
                    </label>
                    <br />
                    <input type='button' value='登入' onClick={this.handleSubmit} />
                </form>
            </div>
        )
    }
}
