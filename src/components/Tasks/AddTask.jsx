import React from 'react';


const AddTask = () => {
    return (
        <div>
            <div class="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                <h2 class="text-gray-900 text-xl mb-4 font-medium title-font text-center">Add Tasks</h2>

                <div class="relative mb-4">
                    <label for="email" class="leading-7  text-gray-600">Title</label>
                    <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-slate-800 focus:ring-2 focus:ring-slate-800 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div class="relative mb-4">
                    <label for="message" class="leading-7 text-gray-600">Description</label>
                    <textarea id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-slate-800 focus:ring-2 focus:ring-slate-800 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
                <button class="text-white bg-slate-800 border-0 py-2 px-6 focus:outline-none hover:bg-slate-900 rounded text-lg">Add Task</button>
                <p class="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
            </div>
        </div>
    );
};

export default AddTask;