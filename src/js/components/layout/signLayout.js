import  React from 'react';
import  {browserHistory} from 'react-router';
import { getConfiguration } from '../../actions/configuration';
import {injectIntl, formatMessage, defineMessages} from 'react-intl';
import {messages} from './../../messages/sign-layout-messages';
import {HotSwappingIntlProvider} from './../hotSwappingIntlProvider';

/**
 * klasse die de layout page of master page maakt voor de sing up en login pagina
 */
class SignLayout extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      name: ''
    }
  }

  /**
   * methode die automatisch aangeroepen wordt als deze component geladen is haalt de website naam op
   */
  componentDidMount(){
    getConfiguration()
      .then((json) => {
        this.setState({name: json.name});
      })
  }

  /**
   * methode om de taal te veranderen
   * @param e click event
   */
  updateLang(e){
    HotSwappingIntlProvider.updateLang(e.target.name);
  }

  /**
   * rendered de pagina
   * @returns {XML}
   */
  render(){
    return <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="javascript:void(0)" onClick={() => {browserHistory.push("/")}}>{this.state.name}</a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">{this.props.intl.formatMessage(messages.language)}<span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="javascript:void(0)" name="nl-NL" onClick={(e) => this.updateLang(e)}>{this.props.intl.formatMessage(messages.dutch)}</a></li>
                  <li><a href="javascript:void(0)" name="en"onClick={(e) => this.updateLang(e)}>{this.props.intl.formatMessage(messages.english)}</a></li>
                </ul>
              </li>
              <li><a href="#" onClick={() => {browserHistory.push("signup")}}><span className="glyphicon glyphicon-user"></span> {this.props.intl.formatMessage(messages.SingUp)}</a></li>
              <li><a onClick={()=>{browserHistory.push("/login")}} href="javascript:void(0)"><span className="glyphicon glyphicon-log-in"></span> {this.props.intl.formatMessage(messages.Login)}</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div>{this.props.children}</div>
    </div>
  }
}

export default injectIntl(SignLayout);
