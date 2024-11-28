import React, { useState, useEffect } from "react";
import SearchInput from "../ComponentesGlobais/SearchInput"; // Importe o componente de pesquisa
import AtualizarFuncionario from "../Forms/Atualizar/AtualizarFuncionario"; // Importe o Modal de Edição
import ConfirmarExclusaoFuncionario from "../Deletar/ConfirmarExclusaoFuncionario"; // Importe o Modal de Exclusão
import { Funcionario } from "../../types";

const ListaDeFuncionarios: React.FC = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState<Funcionario[]>([]);
  const [filteredData, setFilteredData] = useState<Funcionario[]>([]); // Estado para os dados filtrados
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario | null>(null); // Estado para controlar o funcionário selecionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal de edição
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para controlar a visibilidade do modal de exclusão
  const [funcionarioToDelete, setFuncionarioToDelete] = useState<Funcionario | null>(null); // Funcionário a ser excluído

  useEffect(() => {
    fetch(`${backendUrl}/funcionarios`)
      .then((response) => response.json())
      .then((json) => {
        const formattedData: Funcionario[] = json.map((funcionario: any) => ({
          id: funcionario.id,
          nome: funcionario.nome || "Nome não informado",
          sobrenome: funcionario.sobrenome || "Nome não informado",
          cpf: funcionario.cpf || "CPF não informado",
          telefone: funcionario.telefone || "Telefone não informado",
          nascimento: funcionario.nascimento || "Data de Nascimento não informado",
          empresa: funcionario.empresa || { nome: "Empresa não informada", id: -1 },
          cargo: funcionario.cargo || { nome: "Função não informada", id: -1 },
          obra: funcionario.obra || { nome: "Obra não informada", id: -1 },
        }));
        setData(formattedData);
        setFilteredData(formattedData); // Inicializa a lista filtrada com todos os dados
      })
      .catch((error) => console.error("Erro ao carregar dados:", error));
  }, []);

  // Função para lidar com a pesquisa
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() === "") {
      setFilteredData(data); // Se não houver pesquisa, mostra todos os dados
    } else {
      const filtered = data.filter((funcionario) =>
        funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        funcionario.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
        funcionario.empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        funcionario.cargo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        funcionario.obra.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered); // Atualiza os dados filtrados
    }
  };

  const handleEdit = (funcionario: Funcionario) => {
    setSelectedFuncionario(funcionario);
    setIsModalOpen(true);
  };

  const handleDelete = (funcionario: Funcionario) => {
    setFuncionarioToDelete(funcionario);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setFuncionarioToDelete(null);
  };

  const handleUpdateFuncionario = (updatedFuncionario: Funcionario) => {
    setData((prevData) =>
      prevData.map((funcionario) =>
        funcionario.id === updatedFuncionario.id ? updatedFuncionario : funcionario
      )
    );
  };

  const handleConfirmDelete = async () => {
    if (funcionarioToDelete) {
      try {
        await fetch(`${backendUrl}/funcionarios/${funcionarioToDelete.id}`, {
          method: "DELETE",
        });
        // Atualize a lista de funcionários após a exclusão
        setData((prevData) => prevData.filter((funcionario) => funcionario.id !== funcionarioToDelete.id));
        setFilteredData((prevData) => prevData.filter((funcionario) => funcionario.id !== funcionarioToDelete.id));
        console.log("Funcionário excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir funcionário", error);
      }
    }
    handleCloseDeleteModal(); // Fecha o modal de confirmação após a exclusão
  };

  return (
    <div className="overflow-x-auto">
      {/* Componente de busca */}
      <SearchInput onSearch={handleSearch} />

      <table className="min-w-full bg-white border border-gray-300 mt-4">
        <thead>
          <tr className="bg-white text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nome</th>
            <th className="py-3 px-6 text-left">CPF</th>
            <th className="py-3 px-6 text-left">Empresa</th>
            <th className="py-3 px-6 text-left">Função</th>
            <th className="py-3 px-6 text-left">Obra</th>
            <th className="py-3 px-6 text-left">Ações</th>
          </tr>
        </thead>
        
        <tbody className="text-gray-600 text-sm font-light">
          {filteredData.length > 0 ? (
            filteredData.map((funcionario) => (
              <tr key={funcionario.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{funcionario.nome}</td>
                <td className="py-3 px-6 text-left">{funcionario.cpf}</td>
                <td className="py-3 px-6 text-left">{funcionario.empresa.nome}</td> 
                <td className="py-3 px-6 text-left">{funcionario.cargo.nome}</td>
                <td className="py-3 px-6 text-left">{funcionario.obra.nome}</td>
                <td className="py-3 px-6 text-left">
                  <button
                    onClick={() => handleEdit(funcionario)} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(funcionario)} 
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-3 px-6 text-gray-500">
                Nenhum dado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de Edição */}
      {isModalOpen && selectedFuncionario && (
        <AtualizarFuncionario
          funcionario={selectedFuncionario}
          onClose={handleCloseModal}
          onUpdate={handleUpdateFuncionario}
        />
      )}

      {/* Modal de Confirmação de Exclusão */}
      {isDeleteModalOpen && funcionarioToDelete && (
        <ConfirmarExclusaoFuncionario
          funcionario={funcionarioToDelete}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default ListaDeFuncionarios;
