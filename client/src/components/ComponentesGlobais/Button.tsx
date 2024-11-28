
import React from 'react';
import {ButtonProps} from '../../types';

const Button: React.FC<ButtonProps> = ({ type, text }) => {
  return (
    <button
      type={type}
      className="w-full md:w-auto px-4 py-2 bg-black hover:bg-gray-600 transition-all text-white"
    >
      {text}
    </button>
  );
};

export default Button;
