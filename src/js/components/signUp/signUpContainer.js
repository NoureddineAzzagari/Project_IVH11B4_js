import React from 'react';
import {browserHistory} from 'react-router';
import {InputField} from './inputField';
import {injectIntl, formatMessage} from 'react-intl';
import {messages} from './../../messages/signup-messages';

/**
 * class die het sign up formulier rendered
 */
class SignUpContainer extends React.Component{

  /**
   * handeld het versturen van het formulier af
   * @param e het button click event van de submit button
   */
  submit(e){
    e.preventDefault();
    let form = document.getElementById("js-signup-form");
    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080/signup", true);
    req.send(new FormData(form));
    browserHistory.push("/login");
  }

  /**
   * rendered de pagina
   * @returns {XML}
   */
  render(){
    return <div className="row login-row">
      <div className="col-md-1"></div>
      <div className="col-md-10">
        <div className="well">
          <form id="js-signup-form" method="post" onSubmit={(e) => {this.submit(e)}}>
            {messages.map((message, index) => {
              return <InputField key={index} paramName={message.paramName} message={this.props.intl.formatMessage(message)} index={index} />
            })}
            <div className="row spacing-mt">
              <div className="col-md-4"></div>
              <div className="col-md-8">
                <input className="btn btn-primary form-control" type="submit" value="Registreer" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
export default injectIntl(SignUpContainer)
