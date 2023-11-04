import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useAuthContext } from '../provider/AuthProvider';

const Login = () => {
    const { createUser, updateUserProfile, googleSignIn } = useAuthContext()

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const emailRef = useRef()

    const from = location.state?.from?.pathname || "/"

    const handleLogin = (event) => {
        event.preventDefault()
        // const form = event.target;
        // const email = form.email.value;
        // const password = form.password.value;
        // // console.log(email, password);
        // signIn(email, password)
        //     .then(result => {
        //         const user = result.user

        //         Swal.fire({
        //             position: 'top-end',
        //             icon: 'success',
        //             title: 'User Login Successfully',
        //             showConfirmButton: false,
        //             timer: 1500
        //         })
        //         navigate(from, { replace: true })
        //     })
        //     .catch(error => {
        //         setError(error.message)
        //     })
    }


    const handleLoginWithGoogle = () => {

    }

    const handleResetPassword = () => {

    }


    return (
        <div className='w-full bg-slate-800 h-screen -z-10'>
            <div class="px-5 w-full h-screen flex items-center justify-center flex-col">
                <form onSubmit={handleLogin} class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <Link to='/' className="w-10 h-10 flex items-center justify-center bg-base-200 cursor-pointer rounded-full border shadow">
                        <FaArrowLeft className='inline' />
                    </Link>
                    <h2 class="text-gray-900 text-2xl mb-1 font-bold uppercase title-font text-center">Login Now</h2>
                    {
                        success && <label className="label">
                            <p className="my-2 text-green-500"><strong>Success</strong>: {success}</p>
                        </label>
                    }
                    {
                        error && <label className="label">
                            <p className="my-2 text-red-500"><strong>Error</strong>: {error}</p>
                        </label>
                    }

                    <div class="relative mb-4">
                        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" ref={emailRef} name='email' class="w-full bg-white rounded border border-gray-300 focus:border-[#2D2D39] focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />

                    </div>
                    <div class="relative mb-4">
                        <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
                        <input id="password" name='password' class="w-full bg-white rounded border border-gray-300 focus:border-[#2D2D39] focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type={show ? 'text' : 'password'} required />
                        {
                            show ? <BsEyeSlash onClick={() => setShow(!show)} className=" absolute top-9 right-3 text-lg cursor-pointer" />
                                : <BsEye onClick={() => setShow(!show)} className=" absolute top-9 right-3 text-lg cursor-pointer" />
                        }

                    </div>

                    <button type='submit' class="text-white bg-slate-800 border-0 py-2 px-6 focus:outline-none hover:bg-slate-900 rounded text-lg">Login</button>
                    <p class="text-base text-gray-500 mt-3">New to TaskApp? <Link to='/register' className='text-blue-500'>Register</Link></p>
                    <p onClick={handleResetPassword} className='text-blue-500 text-base cursor-pointer'>Forget Password?</p>
                </form>
                <div className="flex items-center gap-6 w-full justify-center mt-6">
                    <div onClick={handleLoginWithGoogle} className="px-5 py-3 rounded bg-white  flex items-center justify-center cursor-pointer">
                        <FcGoogle className='text-2xl' />
                        <span className="text-gray-900 ml-4 ">Continue With Google</span>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;