import React from 'react';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';
import {getUserInfo} from './../../actions/user-info';
import {messages} from './../../messages/settings-messages';
import {getRecentMovies} from './../../actions/movies';

class UserSettings extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userInfo: {
        address: '',
        admin: false,
        email: '',
        fistName: '',
        lastName: '',
        phone: 0,
        userName: ''
      },
      recentMovies: []
    }
  }

  /**
   * methode om de userinfo en recente films te updaten
   */
  componentDidMount(){
    getUserInfo().then((json) => {
        this.setState({userInfo: json}, () => this.forceUpdate());
      }
    );
    getRecentMovies().then((json)=>{
      this.setState({recentMovies: json})
    })
  }

  wijzig(){

  }

  render(){
    const noMovies = <div>
      <h2>{this.props.intl.formatMessage(messages.noMovies)}</h2>

    </div>;

    const info = <div>
      <div className="row" style={{"paddingLeft": "15px"}}>
        <h2>Persoonlijke informatie</h2>
        <div className="text-right" style={{"paddingRight": "3rem"}}>
          <a href="javascript:void(0)" onClick={() => this.wijzig()}>{this.props.intl.formatMessage(messages.edit)}</a>
        </div>

      </div>
      <div className="row">
        <div className="col-xs-6 col-sm-3 col-md-3 col-lg-3">
          <label htmlFor="voornaam">{this.props.intl.formatMessage(messages.firstName)}</label>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <p id="voornaam">{this.state.userInfo.firstName}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-6 col-sm-3 col-md-3 col-lg-3">
          <label htmlFor="lastName">{this.props.intl.formatMessage(messages.lastName)}</label>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <p id="lastName">{this.state.userInfo.lastName}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-6 col-sm-3 col-md-3 col-lg-3">
          <label htmlFor="userName">{this.props.intl.formatMessage(messages.userName)}</label>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <p id="userName">{this.state.userInfo.userName}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-6 col-sm-3 col-md-3 col-lg-3">
          <label htmlFor="email">{this.props.intl.formatMessage(messages.email)}</label>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <p id="email">{this.state.userInfo.email}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-6 col-sm-3 col-md-3 col-lg-3">
          <label htmlFor="address">{this.props.intl.formatMessage(messages.address)}</label>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <p id="address">{this.state.userInfo.address}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-6 col-sm-3 col-md-3 col-lg-3">
          <label htmlFor="phone">{this.props.intl.formatMessage(messages.phone)}</label>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <p id="phone">{this.state.userInfo.phone}</p>
        </div>
      </div>
    </div>;

    return <div className="overview-row">
      <div className="jumbotron" style={{"margin": 0}}>
          <h1 className="text-center">{this.state.userInfo.userName}</h1>
      </div>
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" style={{"backgroundColor": "lightGrey", "border": ".5px solid black", "minHeight": "100%"}}>
        <h3 className="text-center">
          {this.props.intl.formatMessage(messages.recentMovies)}
        </h3>
        <br/>
        {this.state.recentMovies.length > 0 ? this.state.recentMovies.map((movie, index) =>{
        return <div key={index}>
            <div className="col-md-3 col-sm-3 col-xs-3 col-lg-3" style={{padding: "0px"}}>
              <img style={{cursor: "pointer"}} src={movie.imgUrl} className="overview-img" onClick={() => {browserHistory.push(`movie/detail/${movie.id}`)}} />
            </div>{((index) % 6 == 0) ? <div className=""></div> : "" }</div>}): noMovies}
      </div>
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" style={{"backgroundColor": "lightGrey", "border": ".5px solid black", "minHeight": "100%"}}>
        {info}
      </div>

    </div>
  }
}

export default injectIntl(UserSettings);
