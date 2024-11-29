import React from 'react';

import {InputFieldProps} from "../../types/"


const InputField: React.FC<InputFieldProps> = ({ label, type, value, name, placeholder, onChange }) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm  mb-1 font-medium text-black">{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 mb-4 block w-full px-4 py-2 border border-gray-300 shadow-sm "
        
      />
    </div>
  );
};

export default InputField;
