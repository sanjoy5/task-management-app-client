
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { useTasks } from '../../hooks/useTasks';
import { useAuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMyTask from "../../hooks/useMyTask";

const AddTask = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()

    // const token = localStorage.getItem('access-token')
    // console.log(token, 'toekn');

    // For Posting data securely i used custom hook
    const [axiosSecure] = useAxiosSecure()
    const [myTasks, isMyTaskLoading, refetch] = useMyTask()

    // React Hook Form 
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)

        if (user) {
            const { title, description } = data
            const newTasks = { title, description, email: user?.email }

            // normal way to post a data -------->

            // fetch(`http://127.0.0.1:5000/add-task/${user.email}`, {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'application/json',
            //         authorization: `Bearer ${token}`
            //     },
            //     body: JSON.stringify(newTasks)
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         // console.log('add data : ', data);
            //         if (data.insertedId) {
            //             refetch()
            //             Swal.fire({
            //                 position: 'top-end',
            //                 icon: 'success',
            //                 title: 'Task Added Successfully',
            //                 showConfirmButton: false,
            //                 timer: 1500,
            //             })
            //         }
            // reset()
            // })

            // Dynamic way to post a data ------- > 

            axiosSecure.post(`/add-task/${user.email}`, newTasks)
                .then(res => {
                    if (res.data.insertedId) {
                        refetch()
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Task added Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        reset()
                    }
                })

        } else {
            Swal.fire({
                title: 'Login Now',
                text: "You have to Login for Add a Task!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            })
        }


    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                <h2 className="text-gray-900 text-xl mb-4 font-medium title-font text-center">Add Tasks</h2>

                {
                    !user && <p className="pb-4 text-center text-amber-500">Warning: You have to <Link to="/login" className="text-blue-500 underline">Login</Link> first for Add a Task.</p>
                }

                <div className="relative mb-4">
                    <label htmlFor="title" className="leading-7  text-gray-600">Title</label>
                    <input type="text" {...register("title", { required: true })} id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-slate-800 focus:ring-2 focus:ring-slate-800 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    {errors.title && <span className='text-red-500 '>Title field is required</span>}
                </div>
                <div className="relative mb-4">
                    <label htmlFor="description" className="leading-7 text-gray-600">Description</label>
                    <textarea {...register("description", { required: true })} id="description" name="description" className="w-full bg-white rounded border border-gray-300 focus:border-slate-800 focus:ring-2 focus:ring-slate-800 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                    {errors.description && <span className='text-red-500 '>Description field is required</span>}
                </div>
                <button type='submit' className="text-white bg-slate-800 border-0 py-2 px-6 focus:outline-none hover:bg-slate-900 rounded text-lg">Add Task</button>
            </form>
        </>
    );
};

export default AddTask;