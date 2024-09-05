// components/Spinner.js
import React from 'react';

const Spinner = () => (
    <div className="flex justify-center items-center h-32">
        <div className="border-t-transparent border-solid animate-spin border-blue-500 border-8 rounded-full h-16 w-16"></div>
    </div>
);

export default Spinner;
