import React from 'react';
import { Link, browserHistory } from 'react-router';

export class App extends React.Component{

  changeViewToMovies(){
    $(".active").removeClass("active");
    $(".movies").addClass("active");
    browserHistory.push("/movies");
  }

  changeViewToTv(){
    $(".active").removeClass("active");
    $(".tv").addClass("active");
    browserHistory.push("/tv");
  }

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
              <a className="navbar-brand" href="#">WebSiteName</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="active movies" onClick={(e) => this.changeViewToMovies(e)}><a href="javascript: void(0)">Movies</a></li>
                <li className="tv"  onClick={(e) => this.changeViewToTv(e)}><a href="javascript: void(0)">Tv series</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
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
