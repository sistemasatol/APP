import React from 'react';
import AttendancesTable from '../components/Table/AttendancesTable';
import CreatePresence from '../components/Form/Create/CreatePresence';

const Attendances: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Contêiner da tabela */}
      <div className="max-w-4xl mx-auto border bg-white p-6 rounded-md shadow-sm">

        <div className="flex justify-between items-center mb-4">
        

          {/* Botão no canto superior direito */}
          <div className="flex justify-end">
            <CreatePresence /> 
          </div>
        </div>

        {/* Tabela de presenças */}
        <AttendancesTable />
      </div>
    </div>
  );
};

export default Attendances;
