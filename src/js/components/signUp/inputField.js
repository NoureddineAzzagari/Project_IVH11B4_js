import React from 'react';

export class InputField extends React.Component{

  render(){
    return <div className="row spacing-mt">
      <div className="col-md-4">
        <label htmlFor={this.props.message}>{this.props.message}</label>
      </div>
      <div className="col-md-8">
        <input className="c-input form-control"  name={this.props.paramName}  onChange={(e) => {this.setState({value: e.target.value})}} type={this.props.message == "Wachtwoord:" || this.props.message == "Password:" ? "password" : "text"} id={this.props.message} />
      </div>
    </div>
  }
}
