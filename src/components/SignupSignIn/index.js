import React,{useState} from "react";
import "./styles.css";
import Input from "../Input/index";
const SignupSigninComponent = () => {

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");



  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>CoinSavvy</span>
      </h2>

      <form action="">
        <Input
          label={"Full Name"}
          placeholder={"John Wick"}
          state={name}
          setState={setName}
        />
        <Input
          label={"Email"}
          placeholder={"JohnWick@example.com"}
          state={email}
          setState={setEmail}
        />
        <Input
          label={"Password"}
          placeholder={"JohnWick@123"}
          state={password}
          setState={setPassword}
        />
        <Input
          label={"Confirm Password"}
          placeholder={"JohnWick@123"}
          state={confirmPassword}
          setState={setConfirmPassword}
        />
      </form>
    </div>
  );
};

export default SignupSigninComponent;
