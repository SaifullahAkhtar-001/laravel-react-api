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
    setLoading(true);
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


// Function to check if the user is logged in
const checkLoginStatus = async () => {
  const token = localStorage.getItem('authToken'); // Retrieve the token from local storage

  if (!token) {
    // If there's no token, the user is not logged in
    return false;
  }

  try {
    const response = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // If the request succeeds, the user is logged in
    return true;
  } catch (error) {
    // If the request fails, the token is likely invalid, and the user is not logged in
    return false;
  }
};

// Example usage
checkLoginStatus().then((isLoggedIn) => {
  if (isLoggedIn) {
    console.log('User is logged in');
  } else {
    console.log('User is not logged in');
  }
});


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
