import React, { useState } from "react";
import { login } from "../../actions/index";
import { connect } from "react-redux";
import { signUpGoogle } from "../../actions/index";

//Oauth//
// import ReactDOM from 'react-dom';
import GoogleLogin, { GoogleLogout } from "react-google-login";

export const Login = props => {
  const [loginInfo, setLogininfo] = useState({ email: "", password: "" });

  const handleSubmit = event => {
    event.preventDefault();
    props.login(loginInfo);
    props.history.push("/");
    setLogininfo({ email: "", password: "" });
  };

  const handleChange = event => {
    setLogininfo({ ...loginInfo, [event.target.name]: event.target.value });
  };

  //Oauth
  const responseGoogle = response => {
    const { tokenId } = response;
    localStorage.setItem("token", tokenId);
    localStorage.setItem("image", response.profileObj.imageUrl);
    props.signUpGoogle();
    props.history.push("/");
  };

  //Oauth

  return (
    <div className="login-com">
      <h4>Log in to your Movie Knight account</h4>
      <div style={{ display: localStorage.token ? "none" : "block" }}>
        <GoogleLogin
          className="google-btn"
          clientId="1058848707297-n2rl4b301ivq0gipo2pbenr80sa5mtp2.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
      <div>
        <p>or</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            required
            data-testid="emailform"
            id="email"
            type="email"
            name="email"
            placeholder="email"
            value={loginInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="password">Password</label>
          <input
            data-testid="passwordform"
            id="password"
            required
            type="password"
            name="password"
            placeholder="********"
            value={loginInfo.password}
            onChange={handleChange}
          />
          <p className="forgot-psw">
            Forgot password? <span>Click here</span>
          </p>
        </div>
        <button
          type="submit"
          className="next-button login-btn"
          data-testid="login-btn"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

export default connect(mapStateToProps, { login, signUpGoogle })(Login);
