import { FaPen, FaTrash } from 'react-icons/fa';
import { useTasks } from '../../hooks/useTasks';


const Tasks = () => {

    const [tasks] = useTasks()

    return (
        <>
            <div className="bg-white shadow p-8 rounded lg:mt-6 last:">

                {
                    tasks ? <>
                        {
                            tasks.map(task => (
                                <div className="border-b py-3 last:border-b-0" key={task._id}>
                                    <div className="grid grid-cols-5 gap-5">
                                        <div className="col-span-4">
                                            <h2 className="text-xl font-medium uppercase text-slate-800">{task.title}</h2>
                                            <p className=" text-gray-600 mt-2">{task.description}</p>
                                        </div>

                                        <div className="flex gap-2 items-center justify-center">
                                            <div className="p-3 rounded-full w-fit cursor-pointer bg-gray-200 hover:bg-gray-300">
                                                <FaPen className='text-lg text-green-500' />
                                            </div>
                                            <div className="p-3 rounded-full w-fit cursor-pointer bg-gray-200 hover:bg-gray-300">
                                                <FaTrash className='text-lg text-red-500' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </> :
                        <h2 className='text-2xl font-medium uppercase text-red-500'>There is no tasks available !!!</h2>

                }


            </div>
        </>
    );
};

export default Tasks;