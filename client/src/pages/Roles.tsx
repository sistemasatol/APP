import React from 'react';
import NewRoleModal from '../components/Roles/Form/NewEnterpriseModal';
import RoleTable from '../components/Roles/Table/RoleTable';

const Roles: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Contêiner da tabela */}
            <div className="max-w-4xl mx-auto border bg-white p-6 rounded-md shadow-sm">

                <div className="flex justify-start absolute mb-4">
                    <h1 className='px-4 py-2 p-4 text-4xl'>Funções</h1>
                </div>
                {/* Botão no canto superior direito */}
                <div className="flex justify-end mb-4">
                    <NewRoleModal />
                </div>
                {/* Tabela */}
                <RoleTable />
            </div>
        </div>
    );
};

export default Roles;
