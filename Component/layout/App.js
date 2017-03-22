import React from 'react';
import { Link, browserHistory } from 'react-router';
import { getConfiguration } from './../../actions/configuration';

/**
 * class die de layout/master page maakt voor films en tv shows
 */
export class App extends React.Component{

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
   * veranaderd de navbar classes zodat de knop movies active is
   */
  changeViewToMovies(){
    $(".active").removeClass("active");
    $(".movies").addClass("active");
    browserHistory.push("/movies");
  }

  /**
   * veranaderd de navbar classes zodat de knop tv shows active is
   */
  changeViewToTv(){
    $(".active").removeClass("active");
    $(".tv").addClass("active");
    browserHistory.push("/tv");
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
              <a className="navbar-brand" href="#">{this.state.name}</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="active movies" onClick={(e) => this.changeViewToMovies(e)}><a href="javascript: void(0)">Movies</a></li>
                <li className="tv"  onClick={(e) => this.changeViewToTv(e)}><a href="javascript: void(0)">Tv series</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="javascript:void(0)" onClick={() => {browserHistory.push("signup")}}><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                <li><a onClick={()=>{browserHistory.push("/login")}} href="javascript:void(0)"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
