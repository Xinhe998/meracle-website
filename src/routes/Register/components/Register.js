import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router'
// import './HomeView.scss'
export default class Login extends React.Component{
    constructor() {
        super();
        this.state = {
            account: '',
            password: '', 
            checkPassword: '',
            name: '',
            gender: '',
            birth: '',
            address: '',
            job: '',
            fireRedirect: false,
        };
        this.logout = this.logout.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    logout() {
    }
    handleSubmit = async () => {
        var formData = {
            account: this.state.account,
            password: this.state.password,
            name: this.state.name,
            gender: this.state.gender,
            birth: this.state.birth,
            address: this.state.address,
            job: this.state.job,
        };
        console.log(formData);
        await fetch('http://163.17.135.185/7thWebApi/api/Member/Register', {
            method: 'POST',
            mode: 'cors',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
              Account: formData.account,
              Password:  formData.password,
              Name: formData.name,
              Address: formData.address,
              Birthday: formData.birth,
              Job: formData.job,
              Gender: formData.gender
            })
          })
          .then((res) => res.json())
          .then(function(responseJson) {
              console.log(responseJson);
              switch(responseJson.result) {
                  case '註冊成功，請去登入':
                    alert('註冊成功，請去登入');
                    // Clear form
                    ReactDOM.findDOMNode(this.refs.textInput).value = '';
                    this.setState({ fireRedirect: true })
                  break;
                  case '帳號重複':
                    alert('帳號重複');
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
    handleCheckPasswordChange = (event) => {
        this.setState({ checkPassword: event.target.value });
    }
    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }
    handleGenderChange = (event) => {
        this.setState({ gender: event.target.value });
    }
    handleAddressChange = (event) => {
        this.setState({ address: event.target.value });
    }
    handleBirthChange = (event) => {
        this.setState({ birth: event.target.value });
    }
    handleJobChange = (event) => {
        this.setState({ job: event.target.value });
    }
    render() {
        const { from } = this.props.location.state || '/'
        const { fireRedirect } = this.state
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
                    <label>
                        確認密碼：
                        <input type='password'
                            value={this.state.CheckPassword}
                            onChange={this.handleCheckPasswordChange} />
                    </label>
                    <br />
                    <label>
                        姓名：
                        <input type='text'
                            value={this.state.name}
                            onChange={this.handleNameChange} />
                    </label>
                    <br />
                    <label>
                        性別：
                        <input type='text'
                            value={this.state.gender}
                            onChange={this.handleGenderChange} />
                    </label>
                    <br />
                    <label>
                        地址：
                        <input type='text'
                            value={this.state.address}
                            onChange={this.handleAddressChange} />
                    </label>
                    <br />
                    <label>
                        生日：
                        <input type='date'
                            value={this.state.birth}
                            onChange={this.handleBirthChange} />
                    </label>
                    <br />
                    <label>
                        職業：
                        <input type='text'
                            value={this.state.job}
                            onChange={this.handleJobChange} />
                    </label>
                    <br />
                    <input type='button' value='註冊' onClick={this.handleSubmit} />
                </form>
                {fireRedirect && (
                    <Redirect to={from || '/login'}/>
                )}
            </div>
        )
    }
}
