import React from 'react';
import { useState } from 'react';
import NewRequest from '../utils/NewRequest';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error , setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await NewRequest.post("/login",{username,password})
      localStorage.setItem("currentUser", JSON.stringify(res.data))
      Cookies.set('accessToken', 'unique_user_identifier', { path: '/' });
      navigate('/')
    } 
    catch(err){
      setError(err.response.data)
    }
     
  }
  return (
    <div className='my-[100px] min-h-[49vh] px-[10px] min-w-[200px] max-w-[500px] w-[90%] mx-auto'>
      <form autoComplete='off' onSubmit={handleSubmit} action="POST" className=' flex flex-col gap-3 justify-center items-center'>
        <h1 className='font-bold text-[#666] text-[25px] mb-[20px]'>Sign in</h1>
        <label className='w-full text-[#888] text-[15px]' htmlFor="username">Username</label>
        <input onChange={(e) => {
           setUsername(e.target.value)
        }} className='w-full rounded-sm p-3 border border-[#777] outline-none' type="text" name="username" id="username" />
        <label className='w-full text-[#888] text-[15px]' htmlFor="password">Password</label>
        <input onChange={(e) => {
          setPassword(e.target.value)
        }} className='w-full rounded-sm p-3 border border-[#777] outline-none' type="password" name="password" id="password" />
        <button className='clickable bg-[--primaryColor] text-white p-3 w-full' type="submit">Sign in</button>
        {error && <p className='text-red-500 text-center'>{error}</p>}
      </form>
    </div>
  );
}

export default Signin;
