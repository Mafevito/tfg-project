import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// Importar estilos de bootstrap
// import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import { ListContextProvider } from "./context/ListContext";
import { BookmarkContextProvider } from "./context/BookmarkContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      {/* <App /> */}

      <AuthProvider>
        <ListContextProvider>
          <BookmarkContextProvider>
            <App />
          </BookmarkContextProvider>
        </ListContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>
);
