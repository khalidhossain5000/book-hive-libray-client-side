import React from 'react';

const PrimaryButton = ({children,className}) => {
    return (
        <button className={`${className} bg-primary hover:bg-teal-600 text-white font-semibold transition-colors duration-200 font-montserrat tracking-wide cursor-pointer dark:text-background`}>
            {children}
        </button>
    );
};

export default PrimaryButton;