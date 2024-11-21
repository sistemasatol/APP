import React from 'react';
import EnterpriseTable from '../components/Enterprises/Table/EnterpriseTable';
import NewEnterpriseModal from '../components/Enterprises/Form/NewEnterpriseModal';
const Enterprises: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 min-h-screen p-4">
            <div className="md:col-span-3">
                <div className="border bg-white p-4 rounded-lg shadow-lg">
                    <EnterpriseTable />
                    <NewEnterpriseModal />
                </div>
            </div>

            


        </div >
    );
};

export default Enterprises;
