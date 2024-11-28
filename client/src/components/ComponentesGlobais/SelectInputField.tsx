import React from 'react';
import { SelectInputFieldProps } from '../../types';


const SelectInputField: React.FC<SelectInputFieldProps> = ({ label, value, onChange, options }) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm mb-1 font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="mt-1 mb-4 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      >
        {/* Opção inicial com valor 0, que serve como placeholder */}
        <option value={0} disabled>
          Selecione uma opção
        </option>
        {/* Renderizando as opções do select */}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInputField;
