import { useEffect, useState } from 'react';
import { useAuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
// import useMyTask from '../../hooks/useMyTask';
import MyTasks from './MyTasks';
import { useTasks } from '../../hooks/useTasks';
import Loading from '../Loading';


const Tasks = () => {


    const { user } = useAuthContext()
    const [tasks] = useTasks()
    const token = localStorage.getItem('access-token')
    const [sortOrder, setSortOrder] = useState('asc')
    const [myTasks, setMyTasks] = useState([])
    const [searchText, setSearchText] = useState('')
    const [showBtn, setShowBtn] = useState(false)
    const [loading, setLoading] = useState(true)



    // For Geting data securely i used custom hook

    // const [myTasks, isMyTaskLoading, refetch] = useMyTask()
    // console.log(myTasks, "%%%%");

    // this is the normal way to get data 

    useEffect(() => {
        if (user) {
            fetch(`http://127.0.0.1:5000/mytasks/${user?.email}?sortdata=${sortOrder}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setMyTasks(data);
                    setLoading(false)
                })
        } else {
            setMyTasks(null)
        }
    }, [sortOrder, user, tasks])


    // For Search Result 

    const handleSearch = () => {
        if (searchText === '') {
            Swal.fire({
                position: 'center-center',
                icon: 'warning',
                title: 'Empty Search Form',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }
        fetch(`http://127.0.0.1:5000/my-task-search/${searchText}?email=${user?.email}&sortOrder=${sortOrder}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data, '###');
                setMyTasks(data)
                setShowBtn(true)
            })

    }


    // For show all data 

    const showAll = () => {
        fetch(`http://127.0.0.1:5000/mytasks/${user?.email}?sortdata=${sortOrder}`)
            .then(res => res.json())
            .then(data => {
                setMyTasks(data);
                setShowBtn(false)
            })
    }




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
                            const remaining = myTasks?.filter(task => task._id !== _id)
                            setMyTasks(remaining)
                        }
                    })


            }
        })
    }



    return (
        <>

            {/* {isMyTaskLoading && <Loading />} */}

            {
                !myTasks ?
                    <div className="bg-white shadow p-8 rounded">
                        <h2 className='text-2xl font-medium uppercase text-red-500'>There is no tasks available !!!</h2>
                    </div>

                    : <>
                        <div className="bg-white shadow p-8 rounded ">

                            {loading ? <Loading /> :
                                <>
                                    {
                                        myTasks?.length === 0 ?
                                            <h2 className='text-2xl font-medium uppercase text-red-500'>There is no tasks available !!!</h2>
                                            :
                                            <>
                                                {/* --------- Query Form ----------- */}

                                                <div className="flex gap-4 flex-wrap items-center justify-between w-full mb-5">

                                                    <div className='w-ful md:w-3/4 flex items-center gap-2'>
                                                        <div className="w-full max-w-md flex items-center gap-2">
                                                            <input onChange={(e) => setSearchText(e.target.value)} type="search" name="search" className="w-full bg-white rounded border-2 border-gray-300 focus:slate-blue-800 focus:ring-2 focus:ring-slate-800 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                            <button onClick={handleSearch} className="text-white bg-slate-800 border-0 py-1.5 px-3 md:px-6 focus:outline-none hover:bg-slate-900 rounded">Search</button>
                                                        </div>
                                                        {showBtn &&
                                                            <button onClick={showAll} className="text-white bg-slate-800 border-0 py-1.5 px-4 focus:outline-none hover:bg-slate-900 rounded">All</button>
                                                        }

                                                    </div>


                                                    <select onChange={(e) => setSortOrder(e.target.value)} name="filter" className='border py-1.5 px-3 rounded outline-none text-gray-800 font-medium'>
                                                        <option value="asc">Asc</option>
                                                        <option value="dsc">Dsc</option>
                                                    </select>

                                                </div>


                                                {/* ---------- All Tasks ------------ */}

                                                {
                                                    myTasks?.map(task => (
                                                        <MyTasks task={task} key={task._id} handleDelete={handleDelete} />
                                                    ))
                                                }
                                            </>
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