import React, { useState } from 'react';

interface SearchInputProps {
  onSearch?: (searchTerm: string) => void; // Define the type for the search term
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm); // Pass the search term when the search is triggered
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2 border-b border-gray-300 pb-1">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Digite o Filtro"
        className="px-4 py-2 w-64 border rounded-md "
      />
      <button
        type="submit"
        className="px-4 py-2 bg-black hover:bg-gray-600 transition-all text-white"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchInput;
