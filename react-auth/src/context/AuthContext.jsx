import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});
// const LOGIN_STORAGE_KEY = "login";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [errors, setErrors] = useState([]);
  // const [isLogin, setIsLogin] = useState(false);

  // const localLogin =
  //   (typeof window !== "undefined" &&
  //     JSON.parse(localStorage.getItem(LOGIN_STORAGE_KEY))) ||
  //   [];
  // const [islocalLogin, setIsLocalLogin] = useState(localLogin);

  // useEffect(() => {
  //   localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(islocalLogin));
  // }, [islocalLogin]);
  // useEffect(() => {
  //   setIsLogin(islocalLogin);
  // }, []);

  const navigate = useNavigate();

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    const { data } = await axios.get("/api/user");
    console.log(data);
    setUser(data);
  };

  const login = async ({ ...data }) => {
    await csrf();
    try {
      await axios.post("/login", data);
      await getUser();
      // setIsLocalLogin(true);
      // setIsLogin(true);
      navigate("/");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };
  const register = async ({ ...data }) => {
    await csrf();
    try {
      await axios.post("/register", data);
      await getUser();
      // setIsLogin(true)
      navigate("/");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const logout = () => {
    axios.post("/logout").then(() => {
      setUser(null);
      // setIsLocalLogin(false);
      // setIsLogin(false);
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, errors, getUser, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
