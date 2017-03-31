import React from 'react';
import {login} from '../actions/log-in';
import {browserHistory} from 'react-router';
import {FormattedMessage, injectIntl, defineMessages} from 'react-intl';
import {messages} from './../messages/login-messages';


/**
 * klasse die de login pagina maakt
 */
class LoginPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {username: '', password: '', invalid: false, error: false}
  }

  /**
   * gebruikt ./actions/log-in om de ingevulde login informatie te versturen
   * @param e button click event van de submit button
   */
  logIn(e){
    this.setState({invalid: false, error: false});
    e.preventDefault();
    login(this.state.userName, this.state.password)
      .then((result) => {
        this.setState({error: false});
        if(result === 500) this.setState({error: true});
        if(result) browserHistory.push("/movies");
        else(this.setState({invalid: true}));
      })
      .catch((e) => {
        this.setState({error: true});
      });
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
    const invalid = <div><h4 className="error-login">{this.props.intl.formatMessage(messages.error)}</h4></div>;
    const error = <div><h4 className="error-login">{this.props.intl.formatMessage(messages.serverError)}</h4></div>;

    return <div className="row login-row">
      <div className="col-md-1"></div>
      <div className="col-md-10">
        <div className="well">
          {this.state.invalid ? invalid : ""}
          {this.state.error ? error : ""}
          <form method="post">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="userName">{this.props.intl.formatMessage(messages.userName)}</label>
              </div>
              <div className="col-md-8">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                  <input className="c-input form-control" onChange={(e) => {this.changeUserName(e)}} type="text" name="userName" id="userName" />
                </div>
              </div>
            </div>
            <div className="row spacing-mt">
              <div className="col-md-4"><label htmlFor="password" >{this.props.intl.formatMessage(messages.password)}</label></div>
              <div className="col-md-8">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                  <input className="c-input form-control" onChange={(e) => {this.changePassword(e)}} type="password" name="password" id="password"/>
                </div>
              </div>
            </div>
            <div className="row spacing-mt">
              <div className="col-md-4"></div>
              <div className="col-md-8">
                <input className="c-button" type="submit" value={this.props.intl.formatMessage(messages.button)} onClick={(e)=>{this.logIn(e)}} />
                <a href="javascript:void(0)" onClick={() => {browserHistory.push("/signup")}}>{this.props.intl.formatMessage(messages.newAccount)}</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
export default injectIntl(LoginPage);
