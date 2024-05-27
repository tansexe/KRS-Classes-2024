import React, { useState } from 'react'
import Navbar from '../../components/Navabar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Passwordinput from '../../components/input/Passwordinput'
import { validateEmail } from '../../utils/helper'
import axios from 'axios'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!validateEmail(email)) {
            setError('Please enter a valid email address')
            return
        }

        if (!password) {
            setError('Please enter the Password')
            return
        }

        setError('')

        try {
            const response = await axios.post('http://localhost:5000/users/login', {
                email,
                pass:password
            })
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            navigate('/')
        } catch (error) {
            console.error(error)
            setError('Invalid email or password')
        }
    }

    return (
        <div className="bg-cover bg-center bg-no-repeat h-screen" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/light-darkness_181624-10465.jpg?w=1060&t=st=1716537627~exp=1716538227~hmac=a4919fcc78b5d3680b8fabd965c4eaf8bb80c0d64d8b2a0f82975180deb88de0)' }}>
            <div className="fixed inset-0 bg-black opacity-65"></div>

            <Navbar />
            <div className='flex items-center justify-center mt-20'>
                <div className='w-96 border rounded-xl bg-white/5 backdrop-blur-lg drop-shadow hover:shadow-xl transition-all ease-in-out px-7 z-10 py-10'>

                    <form onSubmit={handleLogin}>
                        <h4 className=' text-white text-2xl mb-7'>Login</h4>
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

                        <button type='submit' className='btn-primary'>Login</button>
                        <p className=' text-white text-sm text-center mt-4'>
                            Not registered yet? <Link to="/signup" className='font-medium text-white underline'>Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn