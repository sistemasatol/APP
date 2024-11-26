import React from 'react';
import EmployeeTable from '../components/Table/EmployeeTable';
import CreateEmployee from '../components/Form/Create/CreateEmployee';

const Employees: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
           
            <div className="max-w-full  mx-auto border bg-white p-6 rounded-md shadow-sm">
                <div className="flex justify-start absolute mb-4">
                    <p className='px-4 py-2 p-4 text-2xl'><strong>RH</strong> | Funcionários</p>
                </div>

                {/* Botão no canto superior direito */}
                <div className="flex justify-end mb-4">
                    <CreateEmployee />
                </div>
            
                <EmployeeTable />
            </div>
        </div>
    );
};

export default Employees;
