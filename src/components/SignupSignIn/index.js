import React, { useState } from "react";
import "./styles.css";
import Input from "../Input/index";
import Button from "../Button";
const SignupSigninComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const signUpwithEmail =()=>{
if(!name || !email || !password || !confirmPassword){
  alert("Please fill all the fields");
}
if(password!==confirmPassword){
  alert("Password does not match");
}


// console.log(`Name:${name} \n Email:${email}\n Password:${password}\n ConfirmPassword :${confirmPassword}`);
//AUTHENTICATE THE USER OR CREATE THE ACCOUNT OF THE USER 






setName("");
setEmail("");
setConfirmPassword("");
setPassword("")


}






  

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>CoinSavvy</span>
      </h2>

      <form action="">
        <Input
          label={"Full Name"}
          placeholder={"John Wick"}
          type={"text"}
          state={name}
          setState={setName}
        />
        <Input
          label={"Email"}
          placeholder={"JohnWick@example.com"}
          type={"email"}
          state={email}
          setState={setEmail}
          
        />
        <Input
          label={"Password"}
          placeholder={"JohnWick@123"}
          type={"password"}
          state={password}
          setState={setPassword}
        />
        <Input
          label={"Confirm Password"}
          placeholder={"JohnWick@123"}
          type={"password"}
          state={confirmPassword}
          setState={setConfirmPassword}
        />
        <Button
          text={"Signup Using Email and Password"}
          onClick={signUpwithEmail}
        />
        <p style={{ textAlign: "center" }}>OR</p>
        <Button text={"Signup Using Google "} blue={true} />
      </form>
    </div>
  );
};

export default SignupSigninComponent;
