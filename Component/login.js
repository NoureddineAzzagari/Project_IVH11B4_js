import React from 'react';
import {login} from './../actions/log-in';

export class LoginPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {username: '', password: ''}
  }

  logIn(e){
    e.preventDefault();
    login(this.state.userName, this.state.password);
  }

  changeUserName(e){
    this.setState({userName: e.target.value});
  }

  changePassword(e){
    this.setState({password: e.target.value});
  }

  render(){
    return <div className="row login-row">
      <div className="col-md-6">
        <div className="well">
          <form method="post">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="userName">Gerbruikersnaam:</label>
              </div>
              <div className="col-md-4">
                <input onChange={(e) => {this.changeUserName(e)}} type="text" name="userName" id="userName" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"><label htmlFor="password" >Wachtwoord:</label></div>
              <div className="col-md-4"><input onChange={(e) => {this.changePassword(e)}} type="password" name="password" id="password"/></div>
            </div>
            <div className="row">
              <input type="submit" value="Log in" onClick={(e)=>{this.logIn(e)}} />
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
