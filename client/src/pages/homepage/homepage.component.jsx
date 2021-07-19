import {useState} from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import {signin,authenticate,isAuthenticated} from "./homepage.api-calls"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Scoreboard from "../scoreboard/scoreboard.component";
const axios = require("axios");
const  HomePage= () => {
  const [values, setValues] = useState({
    name: "",
    password: "",
    error: "",
    didRedirect: false,
  });
  const [user, setUser] = useState({
    user: undefined
  });
  const {name,password,error} = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ name, "plainPassword" : password })
      .then((data) => {
        if (data.error) {
          errorMessage()
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch( (err) => {
        errorMessage()
        console.log(err);
        console.log("signin request failed")
      });
  };

  const errorMessage = () => {
    if(error){
      toast.error(error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  };
  const getDataFromServer = async (token) =>  {
    try {
        const response = await axios
        .get("http://localhost:7000/api/getuser",{ headers: {"Authorization" : `${token}`} });
        setUser({...user, user: response.data})
    } catch (e) {
        console.log(e)
    }
}

	if(isAuthenticated()) {
    if(user.user){
      if(user.user.role === 1){
        return (<Scoreboard/>);
      } else {
        return(<h1>You are not Admin!!!</h1>)
      }
    }
  }
  const {token} = isAuthenticated();
  getDataFromServer(token);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <ToastContainer />
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to ScoreBoard</h2>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  onChange={handleChange("name")}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange("password")}
                />
              </div>
            </div>
  
  
            <div>
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onSubmit}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default HomePage