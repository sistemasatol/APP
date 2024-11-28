import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../ComponentesGlobais/Modal";
import { Button, InputField, SelectInputField } from "../../ComponentesGlobais";
import { Funcionario, Cargo, Empresa, Obra } from "../../../types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function CriarFuncionario() {
    const [obras, setObras] = useState<Obra[]>([]);
    const [cargos, setCargos] = useState<Cargo[]>([]);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    const [funcionario, setFuncionario] = useState<Funcionario>({
        nome: "",
        sobrenome: "",
        cpf: "",
        telefone: "",
        nascimento: "",
        obra: { nome: "", id: 0 },
        empresa: { id: 0, nome: "", cnpj: "", telefone: "" },
        cargo: { id: 0, nome: "" },
    });

    const [isModalOpen, setModalOpen] = useState(false);

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFuncionario((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Função para lidar com mudanças nos selects
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: keyof Funcionario) => {
        const { value } = e.target;
        setFuncionario((prev) => ({
            ...prev,
            [field]: {
                id: Number(value),  // Passando apenas o ID
                nome: e.target.selectedOptions[0].text,  // Para capturar o nome da empresa ou cargo
            }
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [obrasResponse, empresasResponse, cargosResponse] = await Promise.all([
                    axios.get(`${backendUrl}/obras`),
                    axios.get(`${backendUrl}/empresas`),
                    axios.get(`${backendUrl}/cargos`),
                ]);

                console.log("Obras carregadas", obrasResponse.data);
                console.log("Empresas carregadas", empresasResponse.data);
                console.log("Cargos carregados", cargosResponse.data);

                setObras(obrasResponse.data);
                setEmpresas(empresasResponse.data);
                setCargos(cargosResponse.data);
            } catch (error: any) {
                console.error("Erro ao buscar dados", error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, []);

    // Função para submeter o formulário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verifique se todos os campos obrigatórios estão preenchidos
        if (!funcionario.cargo.id || !funcionario.obra.id || !funcionario.empresa.id) {
            alert("Todos os campos obrigatórios devem ser preenchidos.");
            return;
        }

        try {
            const response = await axios.post(`${backendUrl}/funcionarios`, {
                nome: funcionario.nome,
                sobrenome: funcionario.sobrenome,
                nascimento: funcionario.nascimento,
                cpf: funcionario.cpf,
                telefone: funcionario.telefone,
                cargo: funcionario.cargo, // Agora passa apenas o ID do cargo
                obra: funcionario.obra,   // Passando o ID da obra
                empresa: funcionario.empresa, // Passando o ID da empresa
            });

            console.log("Funcionário cadastrado com sucesso", response.data);
            window.location.reload(); // Atualiza a página após o cadastro
        } catch (error: any) {
            console.error("Erro ao cadastrar funcionário", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="p-4">
            <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 bg-black hover:bg-gray-600 transition-all text-white"
            >
                Cadastrar Novo Funcionário
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Cadastrar Novo Funcionário"
            >
                <form onSubmit={handleSubmit} className="space-y-2 max-w-4xl mx-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
                        <InputField
                            placeholder="Digite o Nome"
                            type="text"
                            label="Nome"
                            name="nome"
                            value={funcionario.nome}
                            onChange={handleChange}
                        />
                        <InputField
                            placeholder="Digite o Sobrenome"
                            type="text"
                            label="Sobrenome"
                            name="sobrenome"
                            value={funcionario.sobrenome}
                            onChange={handleChange}
                        />
                        <InputField
                            placeholder="Digite o CPF"
                            type="text"
                            label="CPF"
                            name="cpf"
                            value={funcionario.cpf}
                            onChange={handleChange}
                        />
                        <InputField
                            placeholder="Digite o Número de Telefone"
                            type="text"
                            label="Telefone"
                            name="telefone"
                            value={funcionario.telefone}
                            onChange={handleChange}
                        />
                        <InputField
                            placeholder="Digite a Data de Nascimento"
                            type="date"
                            label="Data de Nascimento"
                            name="nascimento"
                            value={funcionario.nascimento}
                            onChange={handleChange}
                        />

                        <SelectInputField
                            label="Obra"
                            value={funcionario.obra.id}
                            onChange={(e) => handleSelectChange(e, "obra")}
                            options={obras.map((obra) => ({
                                id: obra.id,
                                nome: obra.nome,
                            }))} // Corrigido
                        />

                        <SelectInputField
                            label="Função"
                            value={funcionario.cargo.id}
                            onChange={(e) => handleSelectChange(e, "cargo")}
                            options={cargos.map((cargo) => ({
                                id: cargo.id,
                                nome: cargo.nome,
                            }))} // Corrigido
                        />

                        <SelectInputField
                            label="Empresa"
                            value={funcionario.empresa.id}
                            onChange={(e) => handleSelectChange(e, "empresa")}
                            options={empresas.map((empresa) => ({
                                id: empresa.id,       // id da empresa
                                nome: empresa.nome    // nome da empresa
                            }))}
                        />

                    </div>

                    <Button type="submit" text="Cadastrar" />
                </form>
            </Modal>
        </div>
    );
}
