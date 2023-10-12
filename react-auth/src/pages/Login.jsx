import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth} from "../context/AuthContext"
import axios from '../api/axios'

function Login() {
  const { isLogin, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors] = useState([])
  const navigate = useNavigate();
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const handleLogin = async (event) => {
    event.preventDefault();
    await csrf();
    try{
      await axios.post('/login', {email, password})
      login()
      setEmail("")
      setPassword('')
    }catch(e){
      if(e.response.status === 422){
        setErrors(e.response.data.errors);
      }
    }
  }
  useEffect(() =>{
    if(isLogin){
      navigate('/')
    }
  },[isLogin])

  console.log(isLogin)
  console.log(email)
  console.log(password)

  const handleClick = async (event) => {
    event.preventDefault();
    await csrf();
    try{
      await axios.post('/logout');
      logout()
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-auto h-auto px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login
          </h1>
          {isLogin && <p className="text-red-600">{isLogin}</p>}
          <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              {errors.email && <p className="text-red-500 text-sm text-opacity-75 mb-1">{errors.email[0]}</p>}
              <input
                onChange={(e) => setEmail(e.currentTarget.value)}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              {errors.password && <p className="text-red-500 text-sm text-opacity-75 mb-1">{errors.password[0]}</p>}
              <input
                onChange={(e)=>setPassword(e.currentTarget.value)}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <button
              type="submit"
              className="border-[1px] border-white w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Login
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have the account?{"  "}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Register
              </Link>
            </p>
          </form>
          <button
          type="submit"
              onClick={handleClick}
              className="border-[1px] border-white w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Logout
            </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
