import React from 'react';
import PresencesList from '../components/Presence/Table/AttendanceList';
import NewPresenceListModal from '../components/Presence/Form/NewAttendanceListModal';
// import NewPresenceListModal from '../components/Presence/Form/NewPresenceListModal'; // Aqui você vai adicionar seu componente modal de nova presença

const Attendances: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Contêiner da tabela */}
      <div className="max-w-4xl mx-auto border bg-white p-6 rounded-md shadow-sm">

        <div className="flex justify-between items-center mb-4">
        

          {/* Botão no canto superior direito */}
          <div className="flex justify-end">
            <NewPresenceListModal /> 
          </div>
        </div>

        {/* Tabela de presenças */}
        <PresencesList />
      </div>
    </div>
  );
};

export default Attendances;
