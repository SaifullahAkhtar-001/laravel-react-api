import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import axios  from "../api/axios";

function Register() { 
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [password_confirmation,setPasswordConfirmation] = useState("")
  const [errors,setErrors] = useState([])
  const navigate = useNavigate()

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const handleRegister = async (event) => {
    event.preventDefault();
    await csrf();
    try{
      await axios.post("/register", {name,email,password,password_confirmation})
      setEmail('')
      setName('')
      setPassword('')
      setPasswordConfirmation('')
      navigate('/')
    }catch(e){
      if( e.response.status === 422){
        setErrors(e.response.data.errors);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-auto h-auto px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create and account
          </h1>
          {/* <p className="text-red-600">Somthing went wrong</p> */}
          <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              {errors.name && <p className="text-red-500 text-sm text-opacity-75 mb-1">{errors.name[0]}</p>}
              <input
                onChange={(e)=> setName(e.currentTarget.value)}
                value={name}
                type="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              {errors.email && <p className="text-red-500 text-sm text-opacity-75 mb-1">{errors.email[0]}</p>}
              <input
                onChange={(e)=>setEmail(e.currentTarget.value)}
                value={email}
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
                value={password}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              {errors.password && <p className="text-red-500 text-sm text-opacity-75 mb-1">{errors.password[0]}</p>}
              <input
                onChange={(e)=>setPasswordConfirmation(e.currentTarget.value)}
                value={password_confirmation}
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <button
              type="submit"
              className="border-[1px] border-white w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="#"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
