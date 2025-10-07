import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /*const onSubmitHandler = async (e) => {

    try {

      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin', {email, password});
      console.log(response);

    } catch (error) {

      console.error("Error:", error.message);
      if (error.response) {
        console.log("Error Response Data:", error.response.data);
      }

    }

  }*/

    const onSubmitHandler = async (e) => {
      try {
          e.preventDefault();
          console.log("Submitting login form");
          console.log("Email:", email, "Password:", password);
  
          //const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
          const response = await axios.post('http://localhost:4000/api/user/admin', { email, password });
          console.log("Backend Response:", response.data);
          if (response.data.success) {
              setToken(response.data.token)
          } else {
            toast.error(response.data.message)
          }
  
      } catch (error) {
          console.error("Error occurred:", error);
          if (error.response) {
              console.log("Error Response Data:", error.response.data);
          } else if (error.request) {
              console.log("No Response Received:", error.request);
          } else {
              console.log("Error Setting Up Request:", error.message);
          }
      }
  };
  

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p>Email Address</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Enter your email...' required />
          </div>
          <div className="mb-3 min-w-72">
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password...' required />
          </div>
          <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login

