import { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../API/userService";
import { toast } from "react-toastify";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    //validate

    //api
    const response = await postLogin(email, password);
    console.log(response);

    if (response && response.EC === 0) {
      toast.success(response.EM);
      navigate("/");
    }
    if (response && +response.EC !== 0) {
      toast.error(response.EM);
      setPassword("");
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Not have account??</span>
        <button>Sign Up</button>
      </div>
      <div className="title col-4 mx-auto">Quizz</div>
      <div className="welcome col-4 mx-auto">Hello</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            value={email}
            placeholder="abc@gmail.com"
            onChange={(event) => setEmail(event.target.value)}
            type={"email"}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            placeholder="123456"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type={"password"}
            className="form-control"
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button onClick={() => handleLogin()} className="btn btn-dark">
            Login to Quizz
          </button>
        </div>
        <div className="text-center">
          <span
            className="back"
            onClick={() => {
              navigate("/");
            }}
          >
            &#60;&#60; Go to Home Page
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
