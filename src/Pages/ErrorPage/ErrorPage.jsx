import React from 'react';
import errorImage from '../../assets/Error-404.png';

const ErrorPage = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <img src={errorImage} alt="" />
        </div>
    );
};

export default ErrorPage;