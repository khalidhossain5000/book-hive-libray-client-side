import React from 'react';

const SecondaryButton = ({children,className}) => {
  return (
    <button className={`${className}  bg-transparent border border-slate-300 dark:border-slate-600 hover:border-gray-300 text-slate-600 dark:text-slate-100 dark:hover:text-slate-900 font-semibold rounded-md text-sm tracking-wide cursor-pointer font-inter hover:bg-slate-200 hover:text-slate-950 dark:hover:bg-slate-800 transition duration-300` }>
                {children}
              </button>
  );
};

export default SecondaryButton;