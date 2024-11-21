import React from 'react';
import NewEmployee from '../components/Employees/Form/NewEmployeeModal';
import EmployeeTable from '../components/Employees/Table/EmployeeTable';

const Employees: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Contêiner da tabela */}
            <div className="max-w-4xl mx-auto border bg-white p-6 rounded-md shadow-sm">
                {/* Botão no canto superior direito */}
                <div className="flex justify-end mb-4">
                    <NewEmployee />
                </div>
                {/* Tabela */}
                <EmployeeTable />
            </div>
        </div>
    );
};

export default Employees;
