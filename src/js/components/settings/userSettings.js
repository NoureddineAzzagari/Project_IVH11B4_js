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

  wijzig(e){

  }

  render(){
    const noMovies = <div>
      <h2>{this.props.intl.formatMessage(messages.noMovies)}</h2>
    </div>;

    const info = <div style={{"textColor": "white"}}>
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <label htmlFor="voornaam">{this.props.intl.formatMessage(messages.firstName)}</label>
      </div>
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <p id="voornaam">{this.state.userInfo.firstName}</p>
      </div>
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
        <a href="javascript:void(0)" onClick={(e) => this.wijzig(e)}>wijzig</a>
      </div>


    </div>;

    return <div className="overview-row">
      <div className="jumbotron" style={{"margin": 0}}>
          <h1 className="text-center">{this.state.userInfo.userName}</h1>
      </div>
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" style={{"backgroundColor": "grey"}}>
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
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        {info}
      </div>

    </div>
  }
}

export default injectIntl(UserSettings);
