import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { APIBaseUrl } from "../config/API";

export const UserContext = createContext({});

export default function UserProvider({ children }) {
  const [user, setUser] = useState();
  const getUserFromDb = async () => {
    try {
      const token = localStorage.getItem("RUI_user_token");
      console.log(token);
      console.log(APIBaseUrl);
      if (token != null) {
        const res = await axios.patch(
          `${APIBaseUrl}/tokenManipulation/tokenDecryptor`,
          { token }
        );
        const userData = res.data;
        setUser(userData);
        console.log(userData);
      } else {
        console.log("no user history");
      }
    } catch (error) {
      console.log("no user history");
    }
  };

  useEffect(async () => {
    getUserFromDb();
  }, []);

  const logOutHandler = () => {
    localStorage.removeItem("RUI_user_token");
    setUser();
  };

  const forgotPasswordHandler = async (email) => {
    try {
      const res = await axios.post(`${APIBaseUrl}/users/forgotPassword`, {
        email,
      });
      console.log(res);
      return true;
    } catch (error) {
      console.log(`error`);
      return false;
    }
  };
  const shared = {
    user,
    setUser,
    logOutHandler,
    getUserFromDb,
    forgotPasswordHandler,
  };
  return <UserContext.Provider value={shared}>{children}</UserContext.Provider>;
}
