import React from 'react';
import ListaDeFuncionarios from '../components/Listas/ListaDeFuncionarios';
import CriarFuncionario from '../components/Forms/Criar/CriarFuncionario';

const Employees: React.FC = () => {
    const backEndUrl = import.meta.env.VITE_BACKEND_URL;

    const handleFileProcessed = (data: any[]) => {
        console.log("Dados processados:", data);
        // Você pode salvar os dados ou fazer outras operações aqui
    };

    // Função para enviar os dados para a API
    const handleSubmit = async (data: any[]) => {
        try {
            // Enviar os dados via POST para a sua API
            const response = await fetch(`${backEndUrl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("Upload bem-sucedido:", result);
        } catch (error) {
            console.error("Erro ao enviar dados para a API:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="max-w-full  mx-auto border bg-white p-6 rounded-md shadow-sm">
                <div className="flex justify-start absolute mb-4">
                    <p className='px-4 py-2 p-4 text-2xl'><strong>RH</strong> | Funcionários</p>
                </div>

                {/* Botão no canto superior direito */}
                <div className="flex justify-end mb-4">
                    <CriarFuncionario />

                </div>

                <div className="flex justify-end mb-4 mr-4">
                   
                </div>
                <ListaDeFuncionarios />
            </div>
        </div>
    );
};

export default Employees;
