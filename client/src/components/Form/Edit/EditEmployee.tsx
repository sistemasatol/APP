import React, { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../../Global_Components/InputField"; // Componente de campo de input
import SelectInputField from "../../Global_Components/SelectInputField"; // Componente de select
import Button from "../../Global_Components/Button";
import Modal from "../../Global_Components/Modal";

interface Work {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
}

interface Enterprise {
    id: number;
    name: string;
}

interface Employee {
    id: number;
    name: string;
    lastName: string;
    cpf: string;
    phoneNumber: string;
    birthDate: string;
    work: Work; // Alterando para objeto do tipo Work
    enterprise: Enterprise; // Alterando para objeto do tipo Enterprise
    role: Role; // Alterando para objeto do tipo Role
}

interface EditEmployeeProps {
    employee: Employee;
    onClose: () => void;
    onUpdate: (updatedEmployee: Employee) => void;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditEmployee: React.FC<EditEmployeeProps> = ({ employee, onClose, onUpdate }) => {
    const [works, setWorks] = useState<Work[]>([]); // Alterando para Work[]
    const [roles, setRoles] = useState<Role[]>([]); // Alterando para Role[]
    const [enterprises, setEnterprises] = useState<Enterprise[]>([]); // Alterando para Enterprise[]
    const [updatedEmployee, setUpdatedEmployee] = useState<Employee>(employee);

    useEffect(() => {
        // Função para buscar os dados necessários
        const fetchData = () => {
            try {
                axios.get("http://localhost:8080/api/works")
                    .then((response) => {
                        setWorks(response.data);
                    }).catch((error) => console.log(error));

                axios.get("http://localhost:8080/api/enterprises")
                    .then((response) => {
                        setEnterprises(response.data);
                    }).catch((error) => console.log(error));

                axios.get("http://localhost:8080/api/roles")
                    .then((response) => {
                        setRoles(response.data);
                    }).catch((error) => console.log(error));

            } catch (error) {
                console.error("Erro ao buscar dados", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setUpdatedEmployee(employee); // Atualiza o estado sempre que a prop employee mudar
    }, [employee]);

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
            [field]: selectedValue
                ? { id: selectedValue, name: "" } // Aqui estamos apenas ajustando o formato
                : prevState[field], // Se não houver valor, mantemos o estado atual
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `${backendUrl}/employees/${employee.id}`,
                {
                    name: updatedEmployee.name,
                    lastName: updatedEmployee.lastName,
                    birthDate: updatedEmployee.birthDate,
                    cpf: updatedEmployee.cpf,
                    phoneNumber: updatedEmployee.phoneNumber,
                    role: { id: updatedEmployee.role.id }, // Correção para passar o ID do cargo
                    work: { id: updatedEmployee.work.id }, // Correção para passar o ID da obra
                    enterprise: { id: updatedEmployee.enterprise.id }, // Correção para passar o ID da empresa
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



                    <InputField
                        placeholder="Digite a Data de Nascimento"
                        type="date"
                        label="Data de Nascimento"
                        name="birthDate"
                        value={updatedEmployee.birthDate}
                        onChange={handleChange}
                    />



                    <SelectInputField
                        label="Obra"
                        value={updatedEmployee.work.id}
                        onChange={(e) => handleSelectChange(e, "work")}
                        options={works}
                    />
                    <SelectInputField
                        label="Função"
                        value={updatedEmployee.role.id}
                        onChange={(e) => handleSelectChange(e, "role")}
                        options={roles}
                    />
                    <SelectInputField
                        label="Empresa"
                        value={updatedEmployee.enterprise.id}
                        onChange={(e) => handleSelectChange(e, "enterprise")}
                        options={enterprises}
                    />
                </div>

                <Button type="submit" text="Atualizar" />
            </form>
        </Modal>
    );
};

export default EditEmployee;
