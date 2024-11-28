import React, { useEffect, useState } from "react";
import axios from "axios";
import AtualizarEmpresa from "../Forms/Atualizar/AtualizarEmpresa";
import ConfirmarExclusaoEmpresa from "../Deletar/ConfirmarExclusaoEmpresa";
import SearchInput from "../ComponentesGlobais/SearchInput";
import { Empresa } from "../../types";


const ListaDeEmpresas: React.FC = () => {
    const [data, setData] = useState<Empresa[]>([]);
    const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<Empresa[]>([]); 
    const [empresaToDelete, setEmpresaToDelete] = useState<Empresa | null>(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Carregar dados das empresas
    useEffect(() => {
        fetch(`${backendUrl}/empresas`)
            .then((response) => response.json())
            .then((json) => {
                const formattedData: Empresa[] = json.map((empresa: any) => ({
                    id: empresa.id,
                    nome: empresa.nome || "Nome não informado",
                    cnpj: empresa.cnpj || "CNPJ não informado",
                    telefone: empresa.telefone || "Número de Telefone não informado",
                }));
                setData(formattedData);
                setFilteredData(formattedData); // Inicializa os dados filtrados
            })
            .catch((error) => console.error("Erro ao carregar dados:", error));
    }, []);

    // Função de busca
    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        if (searchTerm.trim() === "") {
            setFilteredData(data); // Se não houver pesquisa, mostra todos os dados
        } else {
            const filtered = data.filter((empresa) =>
                empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                empresa.cnpj.toLowerCase().includes(searchTerm.toLowerCase()) ||
                empresa.telefone.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered); // Atualiza os dados filtrados
        }
    };

    // Função para abrir o modal de edição
    const handleEdit = (empresa: Empresa) => {
        setSelectedEmpresa(empresa);
        setIsEditModalOpen(true);
    };

    // Função para abrir o modal de confirmação de exclusão
    const handleDelete = (empresa: Empresa) => {
        setEmpresaToDelete(empresa);
        setIsDeleteModalOpen(true);
    };

    // Função para excluir a empresa
    const deleteEmpresa = async (id: number) => {
        try {
            await axios.delete(`${backendUrl}/empresas/${id}`);
            const updatedData = data.filter((empresa) => empresa.id !== id);
            setData(updatedData);
            if (searchTerm.trim() !== "") {
                // Se há uma pesquisa ativa, também filtramos os dados
                setFilteredData(updatedData.filter((empresa) =>
                    empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    empresa.cnpj.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    empresa.telefone.toLowerCase().includes(searchTerm.toLowerCase())
                ));
            } else {
                setFilteredData(updatedData);
            }
            setIsDeleteModalOpen(false);
            console.log("Empresa excluída com sucesso");
        } catch (error) {
            console.error("Erro ao excluir empresa", error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <SearchInput onSearch={handleSearch} />
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Nome</th>
                        <th className="py-3 px-6 text-left">CNPJ</th>
                        <th className="py-3 px-6 text-left">Telefone</th>
                        <th className="py-3 px-6 text-left">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {filteredData.length > 0 ? (
                        filteredData.map((empresa) => (
                            <tr key={empresa.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{empresa.nome}</td>
                                <td className="py-3 px-6 text-left">{empresa.cnpj}</td>
                                <td className="py-3 px-6 text-left">{empresa.telefone}</td>
                                <td className="py-3 px-6 text-left">
                                    <button
                                        onClick={() => handleEdit(empresa)}
                                        className="text-blue-600 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(empresa)}
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
            {isEditModalOpen && selectedEmpresa && (
                <AtualizarEmpresa
                    empresa={selectedEmpresa}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={(updatedEmpresa: Empresa) => {
                        setData(data.map((empresa) =>
                            empresa.id === updatedEmpresa.id ? updatedEmpresa : empresa
                        ));
                        if (searchTerm.trim() !== "") {
                            setFilteredData(filteredData.map((empresa) =>
                                empresa.id === updatedEmpresa.id ? updatedEmpresa : empresa
                            ));
                        }
                        setIsEditModalOpen(false);
                    }}
                />
            )}

            {/* Modal de confirmação de exclusão */}
            {isDeleteModalOpen && empresaToDelete && (
                <ConfirmarExclusaoEmpresa
                    empresa={empresaToDelete}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => deleteEmpresa(empresaToDelete.id)}
                />
            )}
        </div>
    );
};

export default ListaDeEmpresas;
