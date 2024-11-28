import React, { useEffect, useState } from "react";
import axios from "axios";
import AtualizarObra from "../Forms/Atualizar/AtualizarObra";
import ConfirmarExclusaoObra from "../Deletar/ConfirmarExclusaoObra";
import SearchInput from "../ComponentesGlobais/SearchInput"; // Supondo que você tenha um componente de busca reutilizável
import { Obra } from "../../types";


const ListaDeObras: React.FC = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [data, setData] = useState<Obra[]>([]);
    const [filteredData, setFilteredData] = useState<Obra[]>([]); // Adicionando estado para os dados filtrados
    const [selectedObra, setSelectedObra] = useState<Obra | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [obraToDelete, setObraToDelete] = useState<Obra | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch(`${backendUrl}/obras`)
            .then((response) => response.json())
            .then((json) => {
                const formattedData: Obra[] = json.map((obra: any) => ({
                    id: obra.id,
                    nome: obra.nome || "Nome não informado",
                }));
                setData(formattedData);
                setFilteredData(formattedData); // Inicializa filteredData com todos os dados
            })
            .catch((error) => console.error("Erro ao carregar dados:", error));
    }, [backendUrl]);

    // Função para abrir o modal de edição
    const handleEdit = (obra: Obra) => {
        setSelectedObra(obra);
        setIsEditModalOpen(true);
    };

    // Função para abrir o modal de confirmação de exclusão
    const handleDelete = (obra: Obra) => {
        setObraToDelete(obra);
        setIsDeleteModalOpen(true);
    };

    // Função para excluir o trabalho
    const deleteObra = async (id: number) => {
        try {
            await axios.delete(`${backendUrl}/obras/${id}`);
            setData(data.filter((obra) => obra.id !== id));
            setFilteredData(filteredData.filter((obra) => obra.id !== id)); // Atualiza filteredData após a exclusão
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
            const filtered = data.filter((obra) =>
                obra.nome.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra pelo nome
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
                        filteredData.map((obra) => (
                            <tr key={obra.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{obra.nome}</td>
                                <td className="py-3 px-6 text-left">
                                    <button
                                        onClick={() => handleEdit(obra)}
                                        className="text-blue-600 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(obra)}
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
            {isEditModalOpen && selectedObra && (
                <AtualizarObra
                    obra={selectedObra}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={(updatedObra: Obra) => {
                        setData(data.map((obra) =>
                            obra.id === updatedObra.id ? updatedObra : obra
                        ));
                        setFilteredData(filteredData.map((obra) =>
                            obra.id === updatedObra.id ? updatedObra : obra
                        )); // Atualiza filteredData após a edição
                        setIsEditModalOpen(false);
                    }}
                />
            )}

            {/* Modal de confirmação de exclusão */}
            {isDeleteModalOpen && obraToDelete && (
                <ConfirmarExclusaoObra
                    obra={obraToDelete}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => deleteObra(obraToDelete.id)}
                />
            )}
        </div>
    );
};

export default ListaDeObras;
