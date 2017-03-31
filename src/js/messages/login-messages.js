import {defineMessages} from 'react-intl';

export const messages = defineMessages({
  button: {
    id: "Login.Button",
    defaultMessage: "Log In"
  },
  userName:{
    id: "Login.UserName",
    defaultMessage: "Username:"
  },
  password:{
    id: "Login.Password",
    defaultMessage: "Password:"
  },
  newAccount:{
    id: "Login.Register",
    defaultMessage: "Create a new account"
  },
  error:{
    id: "Login.Error",
    defaultMessage: "The username or password was incorrect"
  },
  serverError:{
    id: "Login.Server.Error",
    defaultMessage: "Something went wrong"
  }
});
