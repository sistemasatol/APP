import React, { useState } from "react";
import { InputField, Button, Modal } from "../../ComponentesGlobais";
import axios from "axios";
import { Empresa } from "../../../types";
import InputCNPJ from "../../ComponentesGlobais/Inputs/InputCNPJ";


const backendUrl = import.meta.env.VITE_BACKEND_URL;


export default function CriarEmpresa() {
  const [empresa, setEmpresa] = useState<Empresa>({
    id: 0,
    nome: "",
    cnpj: "",
    telefone: "",
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpresa((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/empresas`, {
        nome: empresa.nome,
        telefone: empresa.telefone,
        cnpj: empresa.cnpj,
      });
      console.log("Empresa cadastrada com sucesso", response.data);
      // Limpar formulário ou mostrar sucesso
      setEmpresa({ id: 0, nome: "", cnpj: "", telefone: "" });
      setModalOpen(false); // Fecha o modal após cadastro
      window.location.reload();
    } catch (error: any) {
      console.error(
        "Erro ao cadastrar empresa",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-black hover:bg-gray-600 transition-all text-white"
      >
        Cadastrar Nova Empresa
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Cadastrar Nova Empresa"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              placeholder="Digite o Nome"
              type="text"
              label="Nome da Empresa"
              name="nome"
              value={empresa.nome}
              onChange={handleChange}
            />
            <InputCNPJ
              type="text"
              name="cpf"
              value={empresa.cnpj}
              onChange={handleChange}
            />
            <InputField
              placeholder="Digite o Número de Telefone"
              type="text"
              label="Telefone da Empresa"
              name="telefone"
              value={empresa.telefone}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" text="Cadastrar" />
        </form>
      </Modal>
    </div>
  );
}
