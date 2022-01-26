import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";

const baseURL = "http://localhost:9107";

async function stdLogin(email, password) {
    const res = await axios.post(`/login`, {}, {
        auth: {
          username: email,
          password: password
        }
    });
    if (res.status === 200){
      localStorage.setItem("auth-token", res.headers["x-tidepool-session-token"]);
      localStorage.setItem("refresh-token", res.headers["x-tidepool-refresh-token"]);
    }
    console.log(res);
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      await stdLogin(email, password);
      alert("Logged in");
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleLoginEcps(event) {
    event.preventDefault();

    fetch("/oauth/login", { 
      method: 'POST',
    })
    .then(response => {
        // HTTP 301 response
        // HOW CAN I FOLLOW THE HTTP REDIRECT RESPONSE?
        if (response.redirected) {
            window.location.href = response.url;
        }
    })
    .catch(function(err) {
        console.info(err + " while auth redirection");
    });

  }
  

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
      <Form onSubmit={handleLoginEcps}>
        <Button block size="lg" type="submit">
            Identify with e-CPS
        </Button>
      </Form>
    </div>
  );
}
