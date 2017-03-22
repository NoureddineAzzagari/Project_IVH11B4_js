import  React from 'react';
import  {browserHistory} from 'react-router';
import { getConfiguration } from './../../actions/configuration';

/**
 * klasse die de layout page of master page maakt voor de sing up en login pagina
 */
export class SignLayout extends React.Component{

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
            <a className="navbar-brand" href="#">WebSiteName</a>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#" onClick={() => {browserHistory.push("signup")}}><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
              <li><a onClick={()=>{browserHistory.push("/login")}} href="javascript:void(0)"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div>{this.props.children}</div>
    </div>
  }
}
