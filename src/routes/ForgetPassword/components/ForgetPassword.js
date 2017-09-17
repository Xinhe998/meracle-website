import React from 'react'
// import './HomeView.scss'
export default class ForgetPassword extends React.Component{
    constructor() {
        super();
        this.state = {
            account: '',  
        };
        this.logout = this.logout.bind(this);
    }
    logout() {
    }
    handleSubmit = async () => {
        var formData = {
            Account: this.state.account,
        };
        console.log(formData);
        await fetch('http://localhost:64323/api/Member/ForgetPassword', {
            method: 'POST',
            headers:{
            'Content-Type':'application/json',
            },
            body: JSON.stringify({
              Account: formData.account,
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
                    <input type='button' value='送出' onClick={this.handleSubmit} />
                </form>
            </div>
        )
    }
}
