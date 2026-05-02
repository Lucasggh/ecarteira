import React from 'react';

const InputForm = ({ label, error, name, info, children }) => {
  return (
    <div className="flex flex-col w-full text-[#3e3e3e] mb-2">
      <label htmlFor={name} className="font-semibold mb-1">
        {label}
      </label>
      {children}
      {info && <div className="mt-1">{info}</div>}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default InputForm;
