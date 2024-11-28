import React, { useState } from "react";
import axios from "axios";
import { InputField, Modal } from "../../ComponentesGlobais";
import { Obra, AtualizarObraProps } from "../../../types";




const AtualizarObra: React.FC<AtualizarObraProps> = ({ obra, onClose, onUpdate }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [updatedObra, setUpdatedObra] = useState<Obra>(obra);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedObra((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.put(`${backendUrl}/obras/${obra.id}`, updatedObra);
            console.log("Obra atualizada com sucesso", response.data);
            onUpdate(response.data); // Atualiza a empresa na tabela
            onClose(); // Fecha o modal
            window.location.reload();
        } catch (error) {
            console.error("Erro ao atualizar obra", error);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Editar Obra">
            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    label="Nome da Obra"
                    name="name"
                    placeholder=""
                    type="text"
                    value={updatedObra.nome}
                    onChange={handleChange}
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Atualizar
                </button>
            </form>
        </Modal>
    );
};

export default AtualizarObra;
