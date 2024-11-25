import { Button, InputField, SelectInputField } from "../../Global_Components";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";


interface Employee {
    name: string;
    lastName: string | undefined;
    cpf: string | undefined;
    phoneNumber: string | undefined;
    birthDate: string | undefined;
    work_id: number;
    enterprise_id: number;
    role_id: number;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

    const [isModalOpen, setModalOpen] = useState(false)

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
        const fetchData = () => {
            try {
                axios.get(`${backendUrl}/works`)
                    .then(function (response) {
                        console.log("Works carregadas")
                        console.log(response.data)
                        setWorks(response.data);
                    })
                    .catch(function (error) {

                        console.log(error);
                    })

                axios.get(`${backendUrl}/enterprises`)
                    .then(function (response) {
                        console.log("Enterprises carregadas")
                        console.log(response.data)
                        setEnterprises(response.data);
                    })
                    .catch(function (error) {

                        console.log(error);
                    })

                axios.get(`${backendUrl}/roles`)
                    .then(function (response) {
                        console.log("Roles carregadas")
                        console.log(response.data)
                        setRoles(response.data);
                    })
                    .catch(function (error) {

                        console.log(error);
                    })
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${backendUrl}/employees`, {
                name: employee.name,
                lastName: employee.lastName,
                birthDate: employee.birthDate,
                cpf: employee.cpf,
                phoneNumber: employee.phoneNumber,
                role: { id: employee.role_id },
                work: { id: employee.work_id },
                enterprise: { id: employee.enterprise_id }
            });
            console.log("Funcionário cadastrado com sucesso", response.data);
            window.location.reload();
        } catch (error: any) {
            console.error("Erro ao Cadastrar Funcionário", error.response ? error.response.data : error.message);
        }
    }

    return (

        <div className="p-4">
            <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Cadastrar Novo Funcionário
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Cadastrar Novo Funcionário"
            >
                

            </Modal>


        </div >
    );
}
