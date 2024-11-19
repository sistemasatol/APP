import React from 'react';
import NewEmployee from '../components/Employees/Form/NewEmployeeModal';
import EmployeeTable from '../components/Employees/Table/EmployeeTable';

const Employees: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 min-h-screen p-4">
            {/* Tabela ocupando 60% em telas médias ou maiores */}
            <div className="md:col-span-3">
                <div className="border bg-white p-4 rounded-lg shadow-lg">
                    <EmployeeTable />
                </div>
            </div>
            {/* Formulário ocupando 40% em telas médias ou maiores */}
            <div className="md:col-span-2">
                <div className="border bg-white p-8 rounded-lg shadow-lg">
                    <NewEmployee />
                </div>
            </div>
        </div>
    );
};

export default Employees;
