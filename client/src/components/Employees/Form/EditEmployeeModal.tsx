import React, { useState, useEffect } from "react";
import axios from "axios";
import InputField from "./InputField"; // Componente de campo de input
import SelectInputField from "./SelectInputField"; // Componente de select
import Button from "./Button";
import Modal from "./Modal";

interface Employee {
    id: number;
    name: string;
    lastName: string;
    cpf: string;
    phoneNumber: string;
    birthDate: string;
    work_id: number;
    enterprise_id: number;
    role_id: number;
}

interface EditEmployeeModalProps {
    employee: Employee;
    onClose: () => void;
    onUpdate: (updatedEmployee: Employee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ employee, onClose, onUpdate }) => {
    const [works, setWorks] = useState<{ id: number; name: string }[]>([]);
    const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
    const [enterprises, setEnterprises] = useState<{ id: number; name: string }[]>([]);
    const [updatedEmployee, setUpdatedEmployee] = useState<Employee>(employee);

    useEffect(() => {
        // Função para buscar os dados necessários
        const fetchData = () => {
            try {
                axios.get("http://localhost:8080/api/works")
                    .then(function (response) {
                        setWorks(response.data);
                    }).catch((error) => console.log(error));

                axios.get("http://localhost:8080/api/enterprises")
                    .then(function (response) {
                        setEnterprises(response.data);
                    }).catch((error) => console.log(error));

                axios.get("http://localhost:8080/api/roles")
                    .then(function (response) {
                        setRoles(response.data);
                    }).catch((error) => console.log(error));

            } catch (error) {
                console.error("Erro ao buscar dados", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedEmployee((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: keyof Employee) => {
        const selectedValue = e.target.value ? Number(e.target.value) : undefined;
        setUpdatedEmployee((prevState) => ({
            ...prevState,
            [field]: selectedValue,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:8080/api/employees/${employee.id}`,
                {
                    name: updatedEmployee.name,
                    lastName: updatedEmployee.lastName,
                    birthDate: updatedEmployee.birthDate,
                    cpf: updatedEmployee.cpf,
                    phoneNumber: updatedEmployee.phoneNumber,
                    role: { id: updatedEmployee.role_id },
                    work: { id: updatedEmployee.work_id },
                    enterprise: { id: updatedEmployee.enterprise_id },
                }
            );
            console.log("Funcionário atualizado com sucesso", response.data);
            onUpdate(response.data); // Atualiza a tabela de funcionários
            onClose(); // Fecha o modal
        } catch (error) {
            console.error("Erro ao atualizar funcionário", error);
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Editar Funcionário">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        placeholder="Digite o Nome"
                        type="text"
                        label="Nome"
                        name="name"
                        value={updatedEmployee.name}
                        onChange={handleChange}
                    />
                    <InputField
                        placeholder="Digite o Sobrenome"
                        type="text"
                        label="Sobrenome"
                        name="lastName"
                        value={updatedEmployee.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        placeholder="Digite o CPF"
                        type="text"
                        label="CPF"
                        name="cpf"
                        value={updatedEmployee.cpf}
                        onChange={handleChange}
                    />
                    <InputField
                        placeholder="Digite o Número de Telefone"
                        type="text"
                        label="Telefone"
                        name="phoneNumber"
                        value={updatedEmployee.phoneNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        placeholder="Digite a Data de Nascimento"
                        type="date"
                        label="Data de Nascimento"
                        name="birthDate"
                        value={updatedEmployee.birthDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SelectInputField
                        label="Obra"
                        value={updatedEmployee.work_id}
                        onChange={(e) => handleSelectChange(e, "work_id")}
                        options={works}
                    />
                    <SelectInputField
                        label="Função"
                        value={updatedEmployee.role_id}
                        onChange={(e) => handleSelectChange(e, "role_id")}
                        options={roles}
                    />
                    <SelectInputField
                        label="Empresa"
                        value={updatedEmployee.enterprise_id}
                        onChange={(e) => handleSelectChange(e, "enterprise_id")}
                        options={enterprises}
                    />
                </div>

                <Button type="submit" text="Atualizar" />
            </form>
        </Modal>
    );
};

export default EditEmployeeModal;
