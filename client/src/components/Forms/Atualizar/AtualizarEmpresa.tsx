import React, { useState } from "react";
import axios from "axios";
import { InputField, Modal } from "../../ComponentesGlobais";
import { Empresa, AtualizarEmpresaProps } from "../../../types";
import InputCNPJ from "../../ComponentesGlobais/Inputs/InputCNPJ";



const backendUrl = import.meta.env.VITE_BACKEND_URL;


const AtualizarEmpresa: React.FC<AtualizarEmpresaProps> = ({ empresa, onClose, onUpdate }) => {
    const [updatedEmpresa, setUpdatedEmpresa] = useState<Empresa>(empresa);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedEmpresa((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(empresa.cnpj)
        try {
            const response = await axios.put(`${backendUrl}/empresas/${empresa.id}`, updatedEmpresa);
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
                    value={updatedEmpresa.nome}
                    onChange={handleChange}
                />
                <InputCNPJ
                    type="text"
                    name="cpf"
                    value={updatedEmpresa.cnpj}
                    onChange={handleChange}
                />
                <InputField
                    label="Telefone"
                    name="phoneNumber"
                    placeholder=""
                    type="text"
                    value={updatedEmpresa.telefone}
                    onChange={handleChange}
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Atualizar
                </button>
            </form>
        </Modal>
    );
};

export default AtualizarEmpresa;
