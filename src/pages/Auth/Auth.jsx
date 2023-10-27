import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/Authaction";

const Auth = () => {

  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading)
  const [confirmPass, setConfirmPass] = useState(true);
  
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
    username: ""
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (data.password === data.confirmpass) {

        dispatch(signUp(data))
      }
      else {
        setConfirmPass(false)
      }
    } else {
      dispatch(logIn(data));
    }
  }

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      password: "",
      confirmpass: "",
      username: ""
    })
  }

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/*RightSide */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up " : "Log In"}</h3>

          {isSignUp && <div>
            <input
              type="text"
              placeholder="First Name"
              className="infoInput"
              name="firstname"
              onChange={handleChange}
              value={data.firstname}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="infoInput"
              name="lastname"
              onChange={handleChange}
              value={data.lastname}
            />
          </div>}


          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Usernames"
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && <input
              type="password"
              className="infoInput"
              name="confirmpass"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={data.confirmpass}
            />}

          </div>
          <span style={{ display: confirmPass ? "none" : "block", fontSize: "12px", color: "red", alignSelf: "flex-end", marginRight: "5px" }}>* Password does not matches</span>

          <div>
            <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={(e) => {
              setIsSignUp(!isSignUp)
              resetForm()
            }
            }>
              {isSignUp ? "Already have an account. Login!" : "Don't Have an Account? Sign up"}


            </span>
          </div>
          <button className="button infoButton" type="submit" disabled={loading}>
            {loading ? "...Loading" :isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};


export default Auth;
