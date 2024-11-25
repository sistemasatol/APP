import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import Modal from "./Modal";
import axios from "axios";

interface Role {
  name: string;
  id: number
}

export default function NewRoleModal() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [role, setRole] = useState<Role>({
    name: "", id: -1
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRole((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/roles`, {
        name: role.name,
      });
      console.log("Função cadastrada com sucesso", response.data);
      // Limpar formulário ou mostrar sucesso
      setRole({ name: "", id: -1});
      setModalOpen(false); // Fecha o modal após cadastro
      window.location.reload(); 
    } catch (error: any) {
      console.error(
        "Erro ao cadastrar função",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Cadastrar Nova Função
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Cadastrar Nova Função"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              placeholder="Digite o Nome"
              type="text"
              label="Nome da Função"
              name="name"
              value={role.name}
              onChange={handleChange}
            />
           
          </div>

          <Button type="submit" text="Cadastrar" />
        </form>
      </Modal>
    </div>
  );
}
