import React, { useEffect, useState } from "react";
import axios from "axios";
import EditWork from "../Form/Edit/EditWork";
import DeleteWorkModal from "../Delete/DeleteWorkModal";
interface Work {
    id: number;
    name: string;
}

const WorkTable: React.FC = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [data, setData] = useState<Work[]>([]);
    const [selectedWork, setSelectedWork] = useState<Work | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [workToDelete, setWorkToDelete] = useState<Work | null>(null);

    useEffect(() => {
        fetch(`${backendUrl}/works`)
            .then((response) => response.json())
            .then((json) => {
                const formattedData: Work[] = json.map((work: any) => ({
                    id: work.id,
                    name: work.name || "Nome não informado",
                   
                }));
                setData(formattedData);
            })
            .catch((error) => console.error("Erro ao carregar dados:", error));
    }, []);

    // Função para abrir o modal de edição
    const handleEdit = (work: Work) => {
        setSelectedWork(work);
        setIsEditModalOpen(true);
    };

    // Função para abrir o modal de confirmação de exclusão
    const handleDelete = (work: Work) => {
        setWorkToDelete(work);
        setIsDeleteModalOpen(true);
    };

    // Função para excluir a empresa
    const deleteEnterprise = async (id: number) => {
        try {
            await axios.delete(`${backendUrl}/works/${id}`);
            setData(data.filter((work) => work.id !== id));
            setIsDeleteModalOpen(false);
            console.log("Função excluída com sucesso");
        } catch (error) {
            console.error("Erro ao excluir função", error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Nome</th>
                        <th className="py-3 px-6 text-left">Ações</th>
                    </tr>
                    
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {data.length > 0 ? (
                        data.map((work) => (
                            <tr key={work.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{work.name}</td>
                                <td className="py-3 px-6 text-left">
                                    <button
                                        onClick={() => handleEdit(work)}
                                        className="text-blue-600 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(work)}
                                        className="text-red-600"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-3 px-6 text-gray-500">
                                Nenhum dado encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal de edição */}
            {isEditModalOpen && selectedWork && (
                <EditWork
                    work={selectedWork}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={(updatedWork: Work) => {
                        setData(data.map((role) =>
                            role.id === updatedWork.id ? updatedWork : role
                        ));
                        setIsEditModalOpen(false);
                    }}
                />
            )}

            {/* Modal de confirmação de exclusão */}
            {isDeleteModalOpen && workToDelete && (
                <DeleteWorkModal
                    work={workToDelete}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => deleteEnterprise(workToDelete.id)}
                />
            )}
        </div>
    );
};

export default WorkTable;
