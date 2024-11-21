import React, { useEffect, useState } from "react";
import axios from "axios";
import EditEnterpriseModal from "../Form/EditRoleModal";
import DeleteConfirmationModal from "../Form/DeleteConfirmationModal";
interface Role {
    id: number;
    name: string;
}

const RoleTable: React.FC = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [data, setData] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

    useEffect(() => {
        fetch(`${backendUrl}/roles`)
            .then((response) => response.json())
            .then((json) => {
                const formattedData: Role[] = json.map((role: any) => ({
                    id: role.id,
                    name: role.name || "Nome não informado",
                   
                }));
                setData(formattedData);
            })
            .catch((error) => console.error("Erro ao carregar dados:", error));
    }, []);

    // Função para abrir o modal de edição
    const handleEdit = (role: Role) => {
        setSelectedRole(role);
        setIsEditModalOpen(true);
    };

    // Função para abrir o modal de confirmação de exclusão
    const handleDelete = (role: Role) => {
        setRoleToDelete(role);
        setIsDeleteModalOpen(true);
    };

    // Função para excluir a empresa
    const deleteEnterprise = async (id: number) => {
        try {
            await axios.delete(`${backendUrl}/roles/${id}`);
            setData(data.filter((role) => role.id !== id));
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
                        data.map((role) => (
                            <tr key={role.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{role.name}</td>
                                <td className="py-3 px-6 text-left">
                                    <button
                                        onClick={() => handleEdit(role)}
                                        className="text-blue-600 mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(role)}
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
            {isEditModalOpen && selectedRole && (
                <EditEnterpriseModal
                    role={selectedRole}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={(updatedRole: Role) => {
                        setData(data.map((role) =>
                            role.id === updatedRole.id ? updatedRole : role
                        ));
                        setIsEditModalOpen(false);
                    }}
                />
            )}

            {/* Modal de confirmação de exclusão */}
            {isDeleteModalOpen && roleToDelete && (
                <DeleteConfirmationModal
                    role={roleToDelete}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => deleteEnterprise(roleToDelete.id)}
                />
            )}
        </div>
    );
};

export default RoleTable;
