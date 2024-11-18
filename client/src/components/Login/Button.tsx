// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  type: 'submit' | 'button';
  text: string;
}

const Button: React.FC<ButtonProps> = ({ type, text }) => {
  return (
    <button
      type={type}
      className="w-full bg-blue-900 text-white py-2 px-4 hover:bg-blue-600  focus:ring-blue-500"
    >
      {text}
    </button>
  );
};

export default Button;
