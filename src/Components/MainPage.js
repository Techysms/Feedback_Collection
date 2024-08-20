import { Link, useNavigate } from "react-router-dom";
import "./Mainpage.css";
import React, { useState } from "react";
import ac from "./images/admin4.webp";
import bc from "./images/stu6.webp";
import feedback1 from "./images/feedback1.png"
import Login from "./Login";
import { auth, googleProvider } from "./config/firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Student from "./Student";
function Main_page(props) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    navigate("./academics");
  };
  return (
    <div id="main" className="container1">
      <div className="container1-1">
        <img src={feedback1} alt="img" />
      </div>
      <div className="container1-2">
        <div className="main-body1">
          <h1 id="mhead" >FEEDBACK MANAGEMENT SYSTEM</h1>
          <div className="main-body2">
            <Link id="k" to="/adlogin">
              <button
                id="mbut"
                value="ADMIN"
                onChange={(e) => setUser(e.target.value)}
                onClick={<Login name={user} />}
              >
                <img id="adimg" src={ac} alt="noimage"></img>
                <h3>FACULTY</h3>
              </button>
            </Link>

            <button id="mbut" value="STUDENT" onClick={signInWithGoogle}>
              <img id="stdimg" src={bc} alt="noimage"></img>
              <h3>STUDENT</h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Main_page;
