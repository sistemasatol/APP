import InputField from "./InputField";
import SelectInputField from "./SelectInputField";
import Button from "./Button";
import { useState, useEffect } from "react";
import axios from "axios";

interface Employee {
    name: string;
    lastName: string;
    cpf: string;
    phoneNumber: string;
    birthDate: string;
    work_id: number;  // Alterado para permitir undefined
    enterprise_id: number;  // Alterado para permitir undefined
    role_id: number;  // Alterado para permitir undefined
}

export default function NewEmployeeModal() {
    const [works, setWorks] = useState<{ id: number; name: string }[]>([]);
    const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
    const [enterprises, setEnterprises] = useState<{ id: number; name: string }[]>([]);

    const [employee, setEmployee] = useState<Employee>({
        name: "",
        lastName: "",
        cpf: "",
        phoneNumber: "",
        birthDate: "",
        work_id: 0,
        enterprise_id: 0,
        role_id: 0,
    });

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployee((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Função para lidar com mudanças nos selects
    const handleSelectChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        field: keyof Employee
    ) => {
        const selectedValue = e.target.value ? Number(e.target.value) : undefined;
        setEmployee((prevState) => ({
            ...prevState,
            [field]: selectedValue,
        }));
    };

    useEffect(() => {
        // Função para buscar os dados
        const fetchData = async () => {
            try {
                const worksResponse = await axios.get("http://localhost:8080/api/works");
                setWorks(worksResponse.data);

                const enterprisesResponse = await axios.get("http://localhost:8080/api/enterprises");
                setEnterprises(enterprisesResponse.data);

                const rolesResponse = await axios.get("http://localhost:8080/api/roles");
                setRoles(rolesResponse.data);
            } catch (error: any) {
                console.error(
                    "Erro ao buscar dados",
                    error.response ? error.response.data : error.message
                );
            }
        };

        fetchData();
    }, []);

    // Função para submeter o formulário
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();



        axios
            .post("http://localhost:8080/api/employees", {
                name: employee.name,
                lastName: employee.lastName,
                birthDate: employee.birthDate,
                cpf: employee.cpf,
                phoneNumber: employee.phoneNumber,
                enterprise: { id: employee.enterprise_id },
                work: { id: employee.work_id },
                role: { id: employee.role_id }

            })
            .then((response) => {
                alert("Colaborador cadastrado com sucesso!");
                console.log(response);
            })
            .catch((error) => {
                console.error("Erro ao cadastrar colaborador:", error.response || error);
                alert("Erro ao cadastrar colaborador.");
            });


        console.log("Employee data to post:", employee);

    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    placeholder="Digite o Nome"
                    type="text"
                    label="Nome"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                />
                <InputField
                    placeholder="Digite o Sobrenome"
                    type="text"
                    label="Sobrenome"
                    name="lastName"
                    value={employee.lastName}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    placeholder="Digite o CPF"
                    type="text"
                    label="CPF"
                    name="cpf"
                    value={employee.cpf}
                    onChange={handleChange}
                />
                <InputField
                    placeholder="Digite o Número de Telefone"
                    type="text"
                    label="Telefone"
                    name="phoneNumber"
                    value={employee.phoneNumber}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    placeholder="Digite a Data de Nascimento"
                    type="date"
                    label="Data de Nascimento"
                    name="birthDate"
                    value={employee.birthDate}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectInputField
                    label="Obra"
                    value={employee.work_id}
                    onChange={(e) => handleSelectChange(e, "work_id")}
                    options={works}
                />
                <SelectInputField
                    label="Função"
                    value={employee.role_id}
                    onChange={(e) => handleSelectChange(e, "role_id")}
                    options={roles}
                />
                <SelectInputField
                    label="Empresa"
                    value={employee.enterprise_id || 0}
                    onChange={(e) => handleSelectChange(e, "enterprise_id")}
                    options={enterprises || []} // Garante que options seja um array
                />

            </div>

            <Button type="submit" text="Cadastrar" />
        </form>
    );
}
