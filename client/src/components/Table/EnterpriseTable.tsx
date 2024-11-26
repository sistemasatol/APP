import React, { useEffect, useState } from "react";
import axios from "axios";
import EditEnterprise from "../Form/Edit/EditEnterprise";
import DeleteEnterpriseConfirm from "../Delete/DeleteEnterpriseConfirm";
interface Enterprise {
    id: number;
    name: string;
    cnpj: string;
    phoneNumber: string;
}

const EnterpriseTable: React.FC = () => {
    const [data, setData] = useState<Enterprise[]>([]);
    const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [enterpriseToDelete, setEnterpriseToDelete] = useState<Enterprise | null>(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetch(`${backendUrl}/enterprises`)
            .then((response) => response.json())
            .then((json) => {
                const formattedData: Enterprise[] = json.map((enterprise: any) => ({
                    id: enterprise.id,
                    name: enterprise.name || "Nome não informado",
                    cnpj: enterprise.cnpj || "CNPJ não informado",
                    phoneNumber: enterprise.phoneNumber || "Número de Telefone não informado",
                }));
                setData(formattedData);
            })
            .catch((error) => console.error("Erro ao carregar dados:", error));
    }, []);

    // Função para abrir o modal de edição
    const handleEdit = (enterprise: Enterprise) => {
        setSelectedEnterprise(enterprise);
        setIsEditModalOpen(true);
    };

    // Função para abrir o modal de confirmação de exclusão
    const handleDelete = (enterprise: Enterprise) => {
        setEnterpriseToDelete(enterprise);
        setIsDeleteModalOpen(true);
    };

    // Função para excluir a empresa
    const deleteEnterprise = async (id: number) => {
        try {
            await axios.delete(`${backendUrl}/api/enterprises/${id}`);
            setData(data.filter((enterprise) => enterprise.id !== id));
            setIsDeleteModalOpen(false);
            console.log("Empresa excluída com sucesso");
        } catch (error) {
            console.error("Erro ao excluir empresa", error);
        }
    };

    return (
        <div className="overflow-x-auto">
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
                    {data.length > 0 ? (
                        data.map((enterprise) => (
                            <tr key={enterprise.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{enterprise.name}</td>
                                <td className="py-3 px-6 text-left">{enterprise.cnpj}</td>
                                <td className="py-3 px-6 text-left">{enterprise.phoneNumber}</td>
                                <td className="py-3 px-6 text-left">
                                    <button
                                        onClick={() => handleEdit(enterprise)}
                                        className="text-blue-600 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(enterprise)}
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
            {isEditModalOpen && selectedEnterprise && (
                <EditEnterprise
                    enterprise={selectedEnterprise}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={(updatedEnterprise: Enterprise) => {
                        setData(data.map((enterprise) =>
                            enterprise.id === updatedEnterprise.id ? updatedEnterprise : enterprise
                        ));
                        setIsEditModalOpen(false);
                    }}
                />
            )}

            {/* Modal de confirmação de exclusão */}
            {isDeleteModalOpen && enterpriseToDelete && (
                <DeleteEnterpriseConfirm
                    enterprise={enterpriseToDelete}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => deleteEnterprise(enterpriseToDelete.id)}
                />
            )}
        </div>
    );
};

export default EnterpriseTable;
