import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../provider/AuthProvider';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import useMyTask from '../hooks/useMyTask';
import Swal from 'sweetalert2';

const UpdateTask = () => {
    const [myTasks] = useMyTask()
    const token = localStorage.getItem('access-token')
    const { id } = useParams()

    // Filter and Get the selected task  --- > 
    const updateTask = useLoaderData()
    const { title, description } = updateTask;
    // console.log("Update Task : ", updateTask);


    const { user } = useAuthContext()
    const navigate = useNavigate()

    // React Hook Form 
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data, 'updated data')

        fetch(`http://127.0.0.1:5000/updatetask/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center-center',
                        icon: 'success',
                        title: 'Successfully Updated Your Task',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                }
                navigate('/')

            })
    }


    return (
        <div className='bg-white md:h-[600px] p-8 shadow-md flex items-center justify-center'>

            <form onSubmit={handleSubmit(onSubmit)} className=" w-full md:w-1/2 rounded-lg flex flex-col relative z-10 ">
                <h2 className="text-gray-900 text-2xl mb-4 font-medium title-font text-center">Update Tasks</h2>


                <div className="relative mb-4">
                    <label htmlFor="title" className="leading-7  text-gray-600">Title</label>
                    <input type="text"  {...register("title", { required: true })} defaultValue={title} id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-slate-800 focus:ring-2 focus:ring-slate-800 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {errors.title && <span className='text-red-500 '>Title field is required</span>}
                </div>
                <div className="relative mb-4">
                    <label htmlFor="description" className="leading-7 text-gray-600">Description</label>
                    <textarea {...register("description", { required: true })} defaultValue={description} id="description" name="description" className="w-full bg-white rounded border border-gray-300 focus:border-slate-800 focus:ring-2 focus:ring-slate-800 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                    {errors.description && <span className='text-red-500 '>Description field is required</span>}
                </div>
                <button type='submit' className="text-white bg-slate-800 border-0 py-2 px-6 focus:outline-none hover:bg-slate-900 rounded text-lg">Update Task</button>
            </form>

        </div>
    );
};

export default UpdateTask;