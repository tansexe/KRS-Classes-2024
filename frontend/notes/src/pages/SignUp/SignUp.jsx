import React, { useState } from 'react'
import Navbar from '../../components/Navabar/Navbar'
import Passwordinput from '../../components/input/Passwordinput';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';

const SignUp = () => {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleSignup = (e) => {
    e.preventDefault();

    if(!name){
      setError("please enter your name")
      return
    }

    if(!validateEmail(email)){
      setError("please enter a Valid email address");
      return
    }

    if(!password){
      setError("please enter the password")
    }

    //api call
  }

  return (
    <>
    <Navbar />
      <div className='flex items-center justify-center mt-20'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSignup}>
            <h4 className='text-2xl mb-7'>SignUp</h4>
            <input 
              type='text' 
              placeholder='Name' 
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              type='text' 
              placeholder='Email' 
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Passwordinput 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

             {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

            <button type='submit' className='btn-primary'>Sign Up</button>
            <p className='text-sm text-center mt-4'>
              Already Have an account..? <Link to="/signIn" className='font-medium text-primary underline'>Login</Link>
            </p>
            </form>
            </div>
            </div>
    </>
  )
}

export default SignUp