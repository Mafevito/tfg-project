import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// Importar estilos de bootstrap
// import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      {/* <App /> */}

      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>
);
