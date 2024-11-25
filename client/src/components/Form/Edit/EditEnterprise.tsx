import React, { useState } from "react";
import axios from "axios";
import { InputField, Modal } from "../../Global_Components";


interface Enterprise {
    id: number;
    name: string;
    cnpj: string;
    phoneNumber: string;
}

interface EditEnterpriseProps {
    enterprise: Enterprise;
    onClose: () => void;
    onUpdate: (updatedEnterprise: Enterprise) => void;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;


const EditEnterprise: React.FC<EditEnterpriseProps> = ({ enterprise, onClose, onUpdate }) => {
    const [updatedEnterprise, setUpdatedEnterprise] = useState<Enterprise>(enterprise);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedEnterprise((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.put(`${backendUrl}/enterprises/${enterprise.id}`, updatedEnterprise);
            console.log("Empresa atualizada com sucesso", response.data);
            onUpdate(response.data); // Atualiza a empresa na tabela
            onClose(); // Fecha o modal
            window.location.reload(); 
        } catch (error) {
            console.error("Erro ao atualizar empresa", error);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Editar Empresa">
            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    label="Nome da Empresa"
                    name="name"
                    placeholder=""
                    type="text"
                    value={updatedEnterprise.name}
                    onChange={handleChange}
                />
                <InputField
                    label="CNPJ"
                    name="cnpj"
                    placeholder=""
                    type="text"
                    value={updatedEnterprise.cnpj}
                    onChange={handleChange}
                />
                <InputField
                    label="Telefone"
                    name="phoneNumber"
                    placeholder=""
                    type="text"
                    value={updatedEnterprise.phoneNumber}
                    onChange={handleChange}
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Atualizar
                </button>
            </form>
        </Modal>
    );
};

export default EditEnterprise;
