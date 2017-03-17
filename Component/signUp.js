import React from 'react';
import {signUp} from './../actions/sign-up';
import {browserHistory} from 'react-router';

/**
 * class die het sign up formulier rendered
 */
export class SignUp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      signError:  false
    }
  }

  /**
   * handeld het versturen van het formulier af
   * @param e het button click event van de submit button
   */
  submit(e){
    e.preventDefault();
    let form =  new FormData();
    form.append("firstName", this.state.firstName);
    form.append("lastName", this.state.lastName);
    form.append("address", this.state.address);
    form.append("emailAddress", this.state.emailAddress);
    form.append("userName", this.state.userName);
    form.append("password", this.state.password);
    form.append("age", this.state.age);
    this.state.telephoneNumber ? form.append("telephoneNumber", this.state.telephoneNumber) : form.append("telephoneNumber", 0);
    signUp(form)
      .then((response) => {
        if(response.ok){
          this.setState({signError: false});
          browserHistory.push('login');
        }
        else{
          this.setState({signError:  true});
        }
      });
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
                <label htmlFor="voornaam">Voornaam:</label>
              </div>
              <div className="col-md-4">
                <input className="c-input"  onChange={(e) => {this.setState({firstName: e.target.value})}} type="text" id="voornaam" />
              </div>
            </div>
            <div className="row spacing-mt">
              <div className="col-md-4">
                <label htmlFor="achternaam" >Achternaam:</label>
              </div>
              <div className="col-md-4">
                <input className="c-input" onChange={(e) => {this.setState({lastName: e.target.value})}} type="text" id="achternaam"/>
              </div>
            </div>
            <div className="row spacing-mt">
              <div className="col-md-4">
                <label htmlFor="adres" >Adres:</label>
              </div>
              <div className="col-md-4">
                <input className="c-input" onChange={(e) => {this.setState({address: e.target.value})}} type="text" id="adres"/>
              </div>
            </div>
            <div className="row spacing-mt">
              <div className="col-md-4">
                <label htmlFor="email" >Email:</label>
              </div>
              <div className="col-md-4">
                <input className="c-input" onChange={(e) => {this.setState({emailAddress: e.target.value})}} type="text" id="email"/>
              </div>
            </div>
            <div className="row spacing-mt">
              <div className="col-md-4">
                <label htmlFor="gebruikersnaam" >Gebruikersnaam:</label>
              </div>
              <div className="col-md-4">
                <input className="c-input" onChange={(e) => {this.setState({userName: e.target.value})}} type="text" id="gebruikersnaam"/>
              </div>
            </div>
            <div className="row spacing-mt">
              <div className="col-md-4">
                <label htmlFor="wachtwoord" >Wachtwoord:</label>
              </div>
              <div className="col-md-4">
                <input className="c-input" onChange={(e) => {this.setState({password: e.target.value})}} type="text" id="wachtwoord"/>
              </div>
            </div>
            <div className="row spacing-mt">
              <div className="col-md-4">
                <label htmlFor="leeftijd" >Leeftijd:</label>
              </div>
              <div className="col-md-4">
                <input className="c-input"  onChange={(e) => {this.setState({age: e.target.value})}} type="text" id="leeftijd"/>
              </div>
            </div>
            <div className="row spacing-mt">
              <div className="col-md-4">
                <label htmlFor="telefoon" >Telefoon:</label>
              </div>
              <div className="col-md-4">
                <input className="c-input" onChange={(e) => {this.setState({telephoneNumber: e.target.value})}} type="text" id="telefoon"/>
              </div>
            </div>

            <div className="row spacing-mt">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <input className="c-button" onClick={(e) => {this.submit(e)}} type="submit" value="Registreer" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
