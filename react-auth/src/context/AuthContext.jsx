import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user");
      setUser(data);
      setLoading(false);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred while fetching user data:");
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const login = async ({ ...data }) => {
    setLoading(false);
    await csrf();
    try {
      await axios.post("/login", data);
      await getUser();
      navigate("/");
      setLoading(false);
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
    });
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, errors, getUser, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
