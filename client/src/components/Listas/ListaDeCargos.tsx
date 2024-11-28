import React, { useEffect, useState } from "react";
import axios from "axios";
import AtualizarCargo from "../Forms/Atualizar/AtualizarCargo";
import ConfirmarExclusaoCargo from "../Deletar/ConfirmarExclusaoCargo";
import SearchInput from "../ComponentesGlobais/SearchInput";
import { Cargo } from "../../types";


const ListaDeCargos: React.FC = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [data, setData] = useState<Cargo[]>([]);
    const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [cargoToDelete, setCargoToDelete] = useState<Cargo | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<Cargo[]>([]);

    useEffect(() => {
        fetch(`${backendUrl}/cargos`)
            .then((response) => response.json())
            .then((json) => {
                const formattedData: Cargo[] = json.map((cargo: any) => ({
                    id: cargo.id,
                    nome: cargo.nome || "Nome não informado",
                }));
                setData(formattedData);
                setFilteredData(formattedData); // Inicializa filteredData com todos os dados
            })
            .catch((error) => console.error("Erro ao carregar dados:", error));
    }, [backendUrl]);

    // Cargo para abrir o modal de edição
    const handleEdit = (cargo: Cargo) => {
        setSelectedCargo(cargo);
        setIsEditModalOpen(true);
    };

    // Cargo para abrir o modal de confirmação de exclusão
    const handleDelete = (cargo: Cargo) => {
        setCargoToDelete(cargo);
        setIsDeleteModalOpen(true);
    };

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        if (searchTerm.trim() === "") {
            setFilteredData(data); // Se não houver pesquisa, mostra todos os dados
        } else {
            const filtered = data.filter((cargo) =>
                cargo.nome.toLowerCase().includes(searchTerm.toLowerCase()) // Corrigido para 'cargo'
            );
            setFilteredData(filtered); // Atualiza os dados filtrados
        }
    };

    // Cargo para excluir a cargo
    const deleteCargo = async (id: number) => {
        try {
            await axios.delete(`${backendUrl}/cargos/${id}`);
            setData(data.filter((cargo) => cargo.id !== id));
            setFilteredData(filteredData.filter((cargo) => cargo.id !== id)); // Atualiza filteredData após a exclusão
            setIsDeleteModalOpen(false);
            console.log("Cargo excluída com sucesso");
        } catch (error) {
            console.error("Erro ao excluir Cargo", error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <SearchInput onSearch={handleSearch} />
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Nome</th>
                        <th className="py-3 px-6 text-left">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {filteredData.length > 0 ? ( // Alterado para filteredData
                        filteredData.map((cargo) => ( // Alterado para filteredData
                            <tr key={cargo.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{cargo.nome}</td>
                                <td className="py-3 px-6 text-left">
                                    <button
                                        onClick={() => handleEdit(cargo)}
                                        className="text-blue-600 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cargo)}
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
            {isEditModalOpen && selectedCargo && (
                <AtualizarCargo
                    cargo={selectedCargo}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={(updatedCargo: Cargo) => {
                        setData(data.map((cargo) =>
                            cargo.id === updatedCargo.id ? updatedCargo : cargo
                        ));
                        setFilteredData(filteredData.map((cargo) =>
                            cargo.id === updatedCargo.id ? updatedCargo : cargo
                        )); // Atualiza filteredData após a edição
                        setIsEditModalOpen(false);
                    }}
                />
            )}

            {/* Modal de confirmação de exclusão */}
            {isDeleteModalOpen && cargoToDelete && (
                <ConfirmarExclusaoCargo
                    cargo={cargoToDelete}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => deleteCargo(cargoToDelete.id)}
                />
            )}
        </div>
    );
};

export default ListaDeCargos;
