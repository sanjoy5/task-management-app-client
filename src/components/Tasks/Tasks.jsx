import { FaPen, FaTrash } from 'react-icons/fa';
import { useTasks } from '../../hooks/useTasks';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../provider/AuthProvider';
import Loading from '../Loading';
import Swal from 'sweetalert2';
import useMyTask from '../../hooks/useMyTask';
import { Link } from 'react-router-dom';


const Tasks = () => {

    const { user } = useAuthContext()
    const [sortOrder, setSortOrder] = useState('asc')
    const token = localStorage.getItem('access-token')


    // For Geting data securely i used custom hook

    const [myTasks, isMyTaskLoading, refetch] = useMyTask()
    console.log(myTasks, "%%%%");

    // this is the normal way to get data 

    // useEffect(() => {
    //     fetch(`http://127.0.0.1:5000/tasks/${user?.email}?sortOrder=${sortOrder}`, {
    //         headers: {
    //             authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setMyTasks(data);
    //             setLoading(false)
    //         })
    // }, [user, tasks])


    // Delete Task 

    const handleDelete = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://127.0.0.1:5000/delete-task/${_id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            refetch()
                        }
                    })


            }
        })
    }


    return (
        <>

            {isMyTaskLoading && <Loading />}

            {
                !myTasks ?
                    <div className="bg-white shadow p-8 rounded lg:mt-6">
                        <h2 className='text-2xl font-medium uppercase text-red-500'>There is no tasks available !!!</h2>
                    </div>

                    : <>
                        <div className="bg-white shadow p-8 rounded lg:mt-6">
                            {
                                myTasks?.length === 0 ?
                                    <h2 className='text-2xl font-medium uppercase text-red-500'>There is no tasks available !!!</h2>
                                    :
                                    <>
                                        {
                                            myTasks?.map(task => (
                                                <div className="border-b py-3 last:border-b-0" key={task._id}>
                                                    <div className="grid grid-cols-5 gap-5">
                                                        <div className="col-span-4">
                                                            <h2 className="text-xl font-medium  text-slate-800">{task?.title}</h2>
                                                            <p className=" text-gray-600 mt-2">{task?.description}</p>
                                                        </div>

                                                        <div className="flex gap-2 items-center justify-center">
                                                            <Link to={`/updatetask/${task?._id}`} className="p-3 rounded-full w-fit cursor-pointer bg-gray-200 hover:bg-gray-300">
                                                                <FaPen className='text-lg text-green-500' />
                                                            </Link>
                                                            <div onClick={() => handleDelete(task?._id)} className="p-3 rounded-full w-fit cursor-pointer bg-gray-200 hover:bg-gray-300">
                                                                <FaTrash className='text-lg text-red-500' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                            }
                        </div>
                    </>

            }
        </>
    );
};

export default Tasks;