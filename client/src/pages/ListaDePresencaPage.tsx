import React from 'react';
import ListaDePresenca from '../components/Listas/ListaDePresenca';
import CriarPresenca from '../components/Forms/Criar/CriarPresenca';

const ListaDePresencaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Contêiner da tabela */}
      <div className="max-w-4xl mx-auto border bg-white p-6 rounded-md shadow-sm">



        <div className="flex justify-start absolute mb-4">
          <p className='px-4 py-2 p-4 text-2xl'><strong>Obras</strong> | Lista de Presença</p>
        </div>
        {/* Botão no canto superior direito */}
        <div className="flex justify-end ">
          <CriarPresenca />
        </div>
        <ListaDePresenca />
      </div>

      {/* Tabela de presenças */}

    </div>

  );
};

export default ListaDePresencaPage;
