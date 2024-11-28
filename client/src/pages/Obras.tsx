import React from 'react';

import CriarObra from '../components/Forms/Criar/CriarObra';
import ListaDeObras from '../components/Listas/ListaDeObras';
const Works: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Contêiner da tabela */}
            <div className="max-w-4xl mx-auto border bg-white p-6 rounded-md shadow-sm">

                <div className="flex justify-start absolute mb-4">
                <p className='px-4 py-2 p-4 text-2xl'><strong>Obras</strong> | Cadastrar Obras</p>
                </div>
                {/* Botão no canto superior direito */}
                <div className="flex justify-end mb-4">
                    <CriarObra />
                </div>
                {/* Tabela */}
                <ListaDeObras />
            </div>
        </div>
    );
};

export default Works;
