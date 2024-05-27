import React, { useState } from 'react'
import Navbar from '../../components/Navabar/Navbar'
import Passwordinput from '../../components/input/Passwordinput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axios from 'axios'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!name) {
      setError('Please enter your name')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!password) {
      setError('Please enter the password')
      return
    }

    if (password !== confirmPassword) {
      setError('Password and confirm password do not match')
      return
    }

    try {
      await axios.post('http://localhost:5000/users/register', {
        name,
        email,
        pass: password,
        cPass: confirmPassword,
      })
      navigate('/signin')
    } catch (error) {
      console.error(error)
      setError('Failed to register')
    }
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen"
      style={{
        backgroundImage:
          'url(https://img.freepik.com/free-photo/light-darkness_181624-10465.jpg?w=1060&t=st=1716537627~exp=1716538227~hmac=a4919fcc78b5d3680b8fabd965c4eaf8bb80c0d64d8b2a0f82975180deb88de0)',
      }}
    >
      <div className="fixed inset-0 bg-black opacity-65"></div>
      <Navbar />
      <div className="flex items-center justify-center mt-20">
        <div className="w-96 border rounded bg-white/5 backdrop-blur-lg drop-shadow hover:shadow-xl transition-all ease-in-out z-10 px-7 py-10">
          <form onSubmit={handleSignup}>
            <h4 className="text-white text-2xl mb-7">Sign Up</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Passwordinput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Passwordinput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button type="submit" className="btn-primary">
              Sign Up
            </button>
            <p className="text-white text-sm text-center mt-4">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-white underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp