import React, { useState, useEffect } from "react";
import { getAllData } from "./util/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const URL = "http://localhost:8000/api/v1/";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      setMessage(myData.data);
    })();

    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    // Routes and paths for pages (CL)
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>{message}</h1>} />
          <Route path="/home" element="homePage" />
          <Route path="/myplan" element="myPlan" />

          <Route path="/login" element="login" />
          <Route path="/register" element="register" />
          <Route path="/forgotpassword" element="forgot" />
          <Route path="/resetpassword" element="reset" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
