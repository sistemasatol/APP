import React from "react";

interface DropdownProps {
    label: string;
    options: { id: number; name: string }[];
    value: number | null;
    onChange: (value: number | null) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, value, onChange }) => {
    return (
        <div>
            <label className="block text-sm font-medium mb-2">{label}</label>
            <select
                value={value || ""}
                onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Escolha uma opção</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
