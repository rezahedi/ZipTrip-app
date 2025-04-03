import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import { Box } from "@mui/material";
import { getAllData } from "./util/index";

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
    <>
      <Box sx={{ paddingX: "60px" }}>
        <Header />
      </Box>
    </>
  );
}

export default App;
