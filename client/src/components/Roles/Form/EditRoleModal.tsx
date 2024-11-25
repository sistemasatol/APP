import React, { useState } from "react";
import axios from "axios";
import InputField from "./InputField"; // Componente de campo de input
import Modal from "./Modal"; // Modal genérico

interface Role {
    id: number;
    name: string;
}

interface EditRoleModalProps {
    role: Role;
    onClose: () => void;
    onUpdate: (updatedWork: Role) => void;
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({ role, onClose, onUpdate }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [updatedRole, setUpdatedRole] = useState<Role>(role);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedRole((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.put(`${backendUrl}/roles/${role.id}`, updatedRole);
            console.log("Função atualizada com sucesso", response.data);
            onUpdate(response.data); // Atualiza a empresa na tabela
            onClose(); // Fecha o modal
            window.location.reload(); 
        } catch (error) {
            console.error("Erro ao atualizar função", error);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Editar Função">
            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    label="Nome da Função"
                    name="name"
                    placeholder=""
                    type="text"
                    value={updatedRole.name}
                    onChange={handleChange}
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Atualizar
                </button>
            </form>
        </Modal>
    );
};

export default EditRoleModal;
