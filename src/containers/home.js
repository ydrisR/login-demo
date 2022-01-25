import React from "react";
import "./home.css";

export default function Home() {

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  
  return (
    <div className="Home">
      <div className="lander">
        <h1>YOURLOOPS</h1>
        <p className="text-muted">Test e-cps authent for yourloops</p>
      </div>
    </div>
  );
}
