import React from 'react';

import NewWorkModal from '../components/Works/Form/NewWorkModal';
import WorkTable from '../components/Works/Table/WorkTable';
const Works: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Contêiner da tabela */}
            <div className="max-w-4xl mx-auto border bg-white p-6 rounded-md shadow-sm">

                <div className="flex justify-start absolute mb-4">
                    <h1 className='px-4 py-2 p-4 text-4xl'>Obras</h1>
                </div>
                {/* Botão no canto superior direito */}
                <div className="flex justify-end mb-4">
                    <NewWorkModal />
                </div>
                {/* Tabela */}
                <WorkTable />
            </div>
        </div>
    );
};

export default Works;
