import React from 'react';
import {login} from './../actions/log-in';
import {browserHistory} from 'react-router';

/**
 * klasse die de login pagina maakt
 */
export class LoginPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {username: '', password: ''}
  }

  /**
   * gebruikt ./actions/log-in om de ingevulde login informatie te versturen
   * @param e button click event van de submit button
   */
  logIn(e){
    e.preventDefault();
    login(this.state.userName, this.state.password);
  }

  /**
   * set de state van username
   * @param e change event van het invoer veld voor de username
   */
  changeUserName(e){
    this.setState({userName: e.target.value});
  }

  /**
   * set de state van password
   * @param e change even van het invoerveld voor het wachtwoord
   */
  changePassword(e){
    this.setState({password: e.target.value});
  }

  /**
   * rendered de pagina
   * @returns {XML}
   */
  render(){
    return <div className="row login-row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <div className="well">
          <form method="post">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="userName">Gerbruikersnaam:</label>
              </div>
              <div className="col-md-4">
                <input className="c-input" onChange={(e) => {this.changeUserName(e)}} type="text" name="userName" id="userName" />
              </div>
            </div>
            <div className="row spacing-mt">
              <div className="col-md-4"><label htmlFor="password" >Wachtwoord:</label></div>
              <div className="col-md-4">
                <input className="c-input" onChange={(e) => {this.changePassword(e)}} type="password" name="password" id="password"/>
              </div>
            </div>
            <div className="row spacing-mt">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <input className="c-button" type="submit" value="Log in" onClick={(e)=>{this.logIn(e)}} />
                <a href="javascript:void(0)" onClick={() => {browserHistory.push("/signup")}}>Nieuw account maken</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
