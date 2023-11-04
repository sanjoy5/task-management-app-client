import React from 'react';
import { Oval } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className='absolute top-0 left-0 h-screen w-full flex items-center justify-center z-10 bg-white'>
            <Oval
                height={80}
                width={80}
                color="#2D2D39"
                wrapperStyle={{}}
                wrapperclassName=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4C4E66"
                strokeWidth={2}
                strokeWidthSecondary={2}

            />
        </div>

    );
};

export default Loading;