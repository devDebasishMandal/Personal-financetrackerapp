import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./styles.css";
import Input from "../Input/index";
import Button from "../Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupSigninComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();

  const signUpwithEmail = () => {
    //AUTHENTICATE THE USER OR CREATE new account using using email and pass

    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      // alert("Please fill all the fields");
      toast.error("All fields are mendatory");
      setLoading(false);
    } else if (password !== confirmPassword) {
      // alert("Password does not match");
      toast.error("Password and confirm Password does not match");
      setLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          toast.success("User Created");
          // console.log(user);

          setLoading(false);
          setName("");
          setEmail("");
          setConfirmPassword("");
          setPassword("");
          //create a doc after login after user creation
          createDoc(user);
          //navigate the user to dashboard after successfull login
          navigate("/dashboard");
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          // console.log(error);
          setLoading(false);
          // ..
        });
    }

    // console.log(`Name:${name} \n Email:${email}\n Password:${password}\n ConfirmPassword :${confirmPassword}`);
  };

  function loginUsingEmail() {
    setLoading(true);
    if (!email || !password) {
      toast.error("All Fields are mendaotry");
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged in");
          setLoading(false);
          // successful sigin in
          setEmail("");
          setPassword("");
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    }
  }

  function googleAuth() {
    setLoading(true);
    // both login and signup are same for this function
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          createDoc(user);
          navigate("/dashboard");
          setLoading(false);
          console.log("USER>>>>", user);
          toast.success("User Authenticated");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          setLoading(false);
          toast.error(errorMessage);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }
  async function createDoc(user) {
    // make sure that the doc with current UID doesnot exist
    // create a DOC
    //if user doesnot exist return
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      // Add a new document in collection "users"
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc Created");
        setLoading(false);
      } catch (error) {
        toast.error = error.message;
        setLoading(false);
      }
    } else {
      // toast.error("doc already exists");
    }
  }

  return (
    <>
      {login ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login to <span style={{ color: "var(--theme)" }}>CoinSavvy</span>
          </h2>

          <form action="">
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
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login Using Email and Password"}
              onClick={loginUsingEmail}
            />
            <p className="p-login">OR</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Login Using Google "}
              blue={true}
            />
            <p className="p-login">
              Or Don't Have An Account ?
              <span
                className="p-login-span"
                onClick={() => {
                  setLogin(!login);
                }}
              >
                Click Here
              </span>
            </p>
          </form>
        </div>
      ) : (
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
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              onClick={signUpwithEmail}
            />
            <p className="p-login">OR</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Signup Using Google "}
              blue={true}
            />
            <p className="p-login">
              Or Have An Account Already ?
              <span
                className="p-login-span"
                onClick={() => {
                  setLogin(!login);
                }}
              >
                Click Here
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSigninComponent;
