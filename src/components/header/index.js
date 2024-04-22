import React, { useEffect } from "react";
import "./styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);
 
  function LogoutFun() {
    try {
      signOut(auth)
        .then(() => {
          //SignOut Successful
          navigate("/");
          toast.success("User Signed Out Successfully");
        })
        .catch((error) => {
          // an Error has occured
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="navbar">
      <h3 className="logo">CoinSavvy</h3>
      {user && (
        <p className="logo link" onClick={LogoutFun}>
          Logout
        </p>
      )}
    </div>
  );
};

export default Header;
