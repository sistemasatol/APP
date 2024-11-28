import React from 'react';

import {InputFieldProps} from "../../types/"


const InputField: React.FC<InputFieldProps> = ({ label, type, value, name, placeholder, onChange }) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm  mb-1 font-medium text-black">{label}</label>
      <input
        type={type}
        value={value}
        name={name} // Necessário para identificar o campo no handleChange
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 mb-4 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        
      />
    </div>
  );
};

export default InputField;
