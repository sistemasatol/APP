import React from 'react';
import EmployeeTable from '../components/Employees/Table/EmployeeTable';
import NewEmployeeModal from '../components/Employees/Form/NewEmployeeModal';

const Employees: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
           
            <div className="max-w-full  mx-auto border bg-white p-6 rounded-md shadow-sm">
                <div className="flex justify-start absolute mb-4">
                    <h1 className='px-4 py-2 p-4 text-4xl'>Funcionários</h1>
                </div>

                {/* Botão no canto superior direito */}
                <div className="flex justify-end mb-4">
                    <NewEmployeeModal />
                </div>
            
                <EmployeeTable />
            </div>
        </div>
    );
};

export default Employees;
