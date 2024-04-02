import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserProvider from "./context/User.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <GoogleOAuthProvider clientId="576900486233-90d7lc7agfbv5d6769gk14p0k6nv5lel.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </UserProvider>
);
