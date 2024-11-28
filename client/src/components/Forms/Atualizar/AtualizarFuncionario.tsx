import React, { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../../ComponentesGlobais/InputField"; // Componente de campo de input
import SelectInputField from "../../ComponentesGlobais/SelectInputField"; // Componente de select
import Button from "../../ComponentesGlobais/Button";
import Modal from "../../ComponentesGlobais/Modal";
import { Obra, Empresa, Cargo, Funcionario } from "../../../types";

interface AtualizarFuncionarioProps {
    funcionario: Funcionario;
    onClose: () => void;
    onUpdate: (updatedFuncionario: Funcionario) => void;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AtualizarFuncionario: React.FC<AtualizarFuncionarioProps> = ({ funcionario, onClose, onUpdate }) => {
    const [obras, setObras] = useState<Obra[]>([]); // Alterando para Obra[]
    const [cargos, setCargos] = useState<Cargo[]>([]); // Alterando para Cargo[]
    const [empresas, setEmpresas] = useState<Empresa[]>([]); // Alterando para Empresa[]
    const [updatedFuncionario, setUpdatedFuncionario] = useState<Funcionario>(funcionario);

    useEffect(() => {
        // Função para buscar os dados necessários
        const fetchData = () => {
            try {
                axios.get("http://localhost:8080/api/obras")
                    .then((response) => {
                        setObras(response.data);
                    }).catch((error) => console.log(error));

                axios.get("http://localhost:8080/api/empresas")
                    .then((response) => {
                        setEmpresas(response.data);
                    }).catch((error) => console.log(error));

                axios.get("http://localhost:8080/api/cargos")
                    .then((response) => {
                        setCargos(response.data);
                    }).catch((error) => console.log(error));

            } catch (error) {
                console.error("Erro ao buscar dados", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setUpdatedFuncionario(funcionario); // Atualiza o estado sempre que a prop funcionario mudar
    }, [funcionario]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedFuncionario((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: keyof Funcionario) => {
        const selectedValue = e.target.value ? Number(e.target.value) : undefined;
        setUpdatedFuncionario((prevState) => ({
            ...prevState,
            [field]: selectedValue
                ? { id: selectedValue, name: "" } // Aqui estamos apenas ajustando o formato
                : prevState[field], // Se não houver valor, mantemos o estado atual
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `${backendUrl}/funcionarios/${funcionario.id}`,
                {
                    nome: updatedFuncionario.nome,
                    sobrenome: updatedFuncionario.sobrenome,
                    nascimento: updatedFuncionario.nascimento,
                    cpf: updatedFuncionario.cpf,
                    telefone: updatedFuncionario.telefone,
                    cargo: { id: updatedFuncionario.cargo.id }, // Correção para passar o ID do cargo
                    obra: { id: updatedFuncionario.obra.id }, // Correção para passar o ID da obra
                    empresa: { id: updatedFuncionario.empresa.id }, // Correção para passar o ID da empresa
                }
            );
            console.log("Funcionário atualizado com sucesso", response.data);
            onUpdate(response.data); // Atualiza a tabela de funcionários
            onClose(); // Fecha o modal
            window.location.reload();
        } catch (error) {
            console.error("Erro ao atualizar funcionário", error);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Editar Funcionário">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-1">
                    <InputField
                        placeholder="Digite o Nome"
                        type="text"
                        label="Nome"
                        name="nome"
                        value={updatedFuncionario.nome}
                        onChange={handleChange}
                    />
                    <InputField
                        placeholder="Digite o Sobrenome"
                        type="text"
                        label="Sobrenome"
                        name="sobrenome"
                        value={updatedFuncionario.sobrenome}
                        onChange={handleChange}
                    />



                    <InputField
                        placeholder="Digite o CPF"
                        type="text"
                        label="CPF"
                        name="cpf"
                        value={updatedFuncionario.cpf}
                        onChange={handleChange}
                    />
                    <InputField
                        placeholder="Digite o Número de Telefone"
                        type="text"
                        label="Telefone"
                        name="telefone"
                        value={updatedFuncionario.telefone}
                        onChange={handleChange}
                    />



                    <InputField
                        placeholder="Digite a Data de Nascimento"
                        type="date"
                        label="Data de Nascimento"
                        name="nascimento"
                        value={updatedFuncionario.nascimento}
                        onChange={handleChange}
                    />



                    <SelectInputField
                        label="Obra"
                        value={updatedFuncionario.obra.id}
                        onChange={(e) => handleSelectChange(e, "obra")}
                        options={obras}
                    />
                    <SelectInputField
                        label="Função"
                        value={updatedFuncionario.cargo.id}
                        onChange={(e) => handleSelectChange(e, "cargo")}
                        options={cargos}
                    />
                    <SelectInputField
                        label="Empresa"
                        value={updatedFuncionario.empresa.id}
                        onChange={(e) => handleSelectChange(e, "empresa")}
                        options={empresas}
                    />
                </div>

                <Button type="submit" text="Atualizar" />
            </form>
        </Modal>
    );
};

export default AtualizarFuncionario;
