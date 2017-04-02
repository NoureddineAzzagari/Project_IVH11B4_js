import React from 'react';
import { Link, browserHistory } from 'react-router';
import { getConfiguration } from '../../actions/configuration';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import $ from 'jquery';
import {messages} from './../../messages/app-messages';
import {HotSwappingIntlProvider} from './../hotSwappingIntlProvider';
import {login, logout} from './../../actions/log-in';
import {getUserInfo} from './../../actions/user-info';
import {searchMovies, FilterSubject} from './../../actions/movies';

/**
 * class die de layout/master page maakt voor films en tv shows
 */
class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      name: '',
      userInfo: {},
      option: 1,
      search: '',
      moviesActive: false
    }
  }

  /**
   * methode die automatisch aangeroepen wordt als deze component geladen is haalt de website naam op
   */
  componentDidMount(){
    getConfiguration()
      .then((json) => {
        this.setState({name: json.name});
      });
    login("-","-")
      .then((response) => {
        if(!response) browserHistory.push("/login")
      });
    getUserInfo()
      .then((json) => {
        this.setState({userInfo: json});
      });
    $("#searchField").keyup((e) => {
      if(e.which == 13){
        searchMovies(this.state.search, this.state.option)
          .then((movies) => {
            FilterSubject.updateMovies(movies);
          });
        this.setState({search: '', option: 1});
      }
    });
  }

  /**
   * veranaderd de navbar classes zodat de knop movies active is
   */
  changeViewToMovies(){
    $('.active').removeClass("active");
    $('.movies').addClass("active");
    browserHistory.push("/movies");
  }

  /**
   * veranaderd de navbar classes zodat de knop tv shows active is
   */
  changeViewToTv(){
    $('.active').removeClass("active");
    $('.tv').addClass("active");
    browserHistory.push("/tv");
  }

  /**
   * methode om de taal te veranderen
   * @param e click event
   */
  updateLang(e){
    HotSwappingIntlProvider.updateLang(e.target.name);
  }

  /**
   * stopt de filter waardoor alle resultaten weer zullen worden weergegeven
   */
  cancelFilter(){
    FilterSubject.cancelFilter();
  }

  /**
   * logt de ingelogde gebruiker uit
   */
  logoutClick(){
    logout().then(()=>browserHistory.push("/login"));
  }

  /**
   * rendered de pagina
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="javascript:void(null)" onClick={() => {browserHistory.push("/")}}>{this.state.name}</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="active movies" onClick={(e) => this.changeViewToMovies(e)}><a href="javascript: void(0)"><span className="glyphicon glyphicon-film"></span> <FormattedMessage id={"App.Movie"} defaultMessage={"Movies"} /></a></li>
                <li className="tv"  onClick={(e) => this.changeViewToTv(e)}><a href="javascript: void(0)"><span className="glyphicon glyphicon-unchecked"></span> <FormattedMessage id="App.Tv" defaultMessage={"Tv shows"} /></a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">{this.props.intl.formatMessage(messages.search)}<span className="caret"></span></a>
                  <ul className="dropdown-menu" style={{padding: "1rem"}}>

                      <a href="javascript:void(0)" onClick={() => this.cancelFilter()}><span className="glyphicon glyphicon-remove"></span></a>

                    <li>
                      <input id="searchField" value={this.state.search} onChange={(e) => this.setState({search: e.target.value})} type="text" className="form-control" />
                    </li>
                    <li>
                      <input id="title" onClick={(e) => this.setState({option: e.target.value})} defaultChecked="defaultChecked" type="radio" className="" value="1" name="searchoption" />
                      <label htmlFor="title">&nbsp;&nbsp;{this.props.intl.formatMessage(messages.searchTitle)}</label>
                      <br />
                      <input id="actor" onClick={(e) => this.setState({option: e.target.value})} type="radio" className="" value="2" name="searchoption" />
                      <label htmlFor="actor">&nbsp;&nbsp;{this.props.intl.formatMessage(messages.searchReleaseYear)}</label>
                    </li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">{this.props.intl.formatMessage(messages.language)}<span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href="javascript:void(0)" name="nl-NL" onClick={(e) => this.updateLang(e)}>{this.props.intl.formatMessage(messages.dutch)}</a></li>
                    <li><a href="javascript:void(0)" name="en"onClick={(e) => this.updateLang(e)}>{this.props.intl.formatMessage(messages.english)}</a></li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="javascript:void(0)" className="dropdown-togle" data-toggle="dropdown">{this.state.userInfo.userName}<span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="javascript:void(0)" onClick={() => this.logoutClick()}><span className="glyphicon glyphicon-log-out"></span> {this.props.intl.formatMessage(messages.logout)}</a>
                      <a href="javascript:void(0)" onClick={() => browserHistory.push("/user")}><span className="glyphicon glyphicon-cog"></span> {this.props.intl.formatMessage(messages.userSettings)}</a>
                    </li>
                  </ul>

                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
export default injectIntl(App);
