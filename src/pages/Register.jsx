import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { useAuthContext } from '../provider/AuthProvider';

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useAuthContext()
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    // React Hook Form 
    const from = location.state?.from?.pathname || "/"
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user

                updateUserProfile(loggedUser, data.name)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email }

                        fetch('http://127.0.0.1:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then((data) => {
                                if (data.insertedId) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User Register Successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    // navigate('/success')
                                }
                                navigate(from, { replace: true })
                            })
                    })
                    .catch(error => setError(error.message))
            })
            .catch(error => setError(error.message))
    };


    // Sign in with Google
    const handleLoginWithGoogle = () => {

        googleSignIn()
            .then(result => {
                const loggedUser = result.user
                const saveUser = { name: loggedUser.displayName, email: loggedUser.email }
                fetch('http://127.0.0.1:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User Login Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate(from, { replace: true })
                    })
            })

            .catch(error => {
                setError(error.message)
            })
    }

    return (
        <>
            <div className='w-full bg-slate-800 min-h-screen py-20 -z-10'>
                <div class="px-5 w-full h-full flex items-center justify-center ">
                    <form onSubmit={handleSubmit(onSubmit)} class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                        <Link to='/' className="w-10 h-10 flex items-center justify-center bg-base-200 cursor-pointer rounded-full border shadow">
                            <FaArrowLeft className='inline' />
                        </Link>
                        <h2 class="text-gray-900 text-2xl mb-1 font-bold uppercase title-font text-center">Register Now</h2>
                        {
                            error && <label className="label">
                                <p className="my-2 text-red-500"><strong>Error:</strong> {error}</p>
                            </label>
                        }

                        <div class="relative mb-4">
                            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                            <input type="text" id="name" {...register("name", { required: true })} class="w-full bg-white rounded border border-gray-300 focus:border-[#2D2D39] focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            {errors.name && <span className='text-red-500 '>Name field is required</span>}
                        </div>

                        <div class="relative mb-4">
                            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="email" {...register("email", { required: true })} class="w-full bg-white rounded border border-gray-300 focus:border-[#2D2D39] focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            {errors.email && <span className='text-red-500 '>Email field is required</span>}
                        </div>

                        <div class="relative mb-4">
                            <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
                            <input type="password" id="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/
                            })} class="w-full bg-white rounded border border-gray-300 focus:border-[#2D2D39] focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                            {errors.password?.type === 'required' && <p className='text-red-500 '>Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-500 '>Password must be 6 character</p>}
                            {errors.password?.type === 'maxLength' && <p className='text-red-500 '>Password must be less than 20 character</p>}
                            {errors.password?.type === 'pattern' && <p className='text-red-500 '>Password must be at least a symbol, upper and lower case letters and a number
                            </p>}
                        </div>

                        <button type='submit' class="text-white bg-slate-800 border-0 py-2 px-6 focus:outline-none hover:bg-slate-900 rounded text-lg">Register</button>
                        <p class="text-base text-gray-500 mt-3">Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></p>
                    </form>


                </div>
                <div className="flex items-center gap-6 w-full justify-center mt-6">
                    <div onClick={handleLoginWithGoogle} className="px-5 py-3 rounded bg-white  flex items-center justify-center cursor-pointer">
                        <FcGoogle className='text-2xl' />
                        <span className="text-gray-900 ml-4 ">Continue With Google</span>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Register;