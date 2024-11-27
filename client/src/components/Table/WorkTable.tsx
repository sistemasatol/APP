import React, { useEffect, useState } from "react";
import axios from "axios";
import EditWork from "../Form/Edit/EditWork";
import DeleteWorkModal from "../Delete/DeleteWorkModal";
import SearchInput from "../Global_Components/SearchInput"; // Supondo que você tenha um componente de busca reutilizável

interface Work {
    id: number;
    name: string;
}

const WorkTable: React.FC = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [data, setData] = useState<Work[]>([]);
    const [filteredData, setFilteredData] = useState<Work[]>([]); // Adicionando estado para os dados filtrados
    const [selectedWork, setSelectedWork] = useState<Work | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [workToDelete, setWorkToDelete] = useState<Work | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch(`${backendUrl}/works`)
            .then((response) => response.json())
            .then((json) => {
                const formattedData: Work[] = json.map((work: any) => ({
                    id: work.id,
                    name: work.name || "Nome não informado",
                }));
                setData(formattedData);
                setFilteredData(formattedData); // Inicializa filteredData com todos os dados
            })
            .catch((error) => console.error("Erro ao carregar dados:", error));
    }, [backendUrl]);

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

    // Função para excluir o trabalho
    const deleteWork = async (id: number) => {
        try {
            await axios.delete(`${backendUrl}/works/${id}`);
            setData(data.filter((work) => work.id !== id));
            setFilteredData(filteredData.filter((work) => work.id !== id)); // Atualiza filteredData após a exclusão
            setIsDeleteModalOpen(false);
            console.log("Trabalho excluído com sucesso");
        } catch (error) {
            console.error("Erro ao excluir trabalho", error);
        }
    };

    // Função para filtrar os dados conforme a pesquisa
    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        if (searchTerm.trim() === "") {
            setFilteredData(data); // Se não houver pesquisa, mostra todos os dados
        } else {
            const filtered = data.filter((work) =>
                work.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra pelo nome
            );
            setFilteredData(filtered); // Atualiza os dados filtrados
        }
    };

    return (
        <div className="overflow-x-auto">
            {/* Componente de pesquisa */}
            <SearchInput onSearch={handleSearch} />

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Nome</th>
                        <th className="py-3 px-6 text-left">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {filteredData.length > 0 ? (
                        filteredData.map((work) => (
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
                        setData(data.map((work) =>
                            work.id === updatedWork.id ? updatedWork : work
                        ));
                        setFilteredData(filteredData.map((work) =>
                            work.id === updatedWork.id ? updatedWork : work
                        )); // Atualiza filteredData após a edição
                        setIsEditModalOpen(false);
                    }}
                />
            )}

            {/* Modal de confirmação de exclusão */}
            {isDeleteModalOpen && workToDelete && (
                <DeleteWorkModal
                    work={workToDelete}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => deleteWork(workToDelete.id)}
                />
            )}
        </div>
    );
};

export default WorkTable;
