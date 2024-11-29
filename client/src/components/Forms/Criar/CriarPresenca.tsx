import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import InputField from "../../ComponentesGlobais/InputField";
import Modal from "../../ComponentesGlobais/Modal";
import { Funcionario, Obra } from "../../../types";
import UploadArquivos from "../../ComponentesGlobais/UploadArquivos";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function CriarPresenca() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [responsaveis, setResponsaveis] = useState<Funcionario[]>([]);
  const [selectedObra, setSelectedObra] = useState<Obra | null>(null);
  const [selectedResponsavel, setSelectedResponsavel] = useState<Funcionario | null>(null);
  const [nomeFuncionario, setNomeFuncionario] = useState<string>("");
  const [funcionarios, setFuncionarios] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [anexo, setAnexo] = useState<File | null>(null);  // Alterado para armazenar um único arquivo

  const handleFileSelect = (selectedFiles: File[]) => {
    // Alterado para tratar apenas um arquivo
    if (selectedFiles.length > 0) {
      setAnexo(selectedFiles[0]);
      console.log("Arquivo selecionado:", selectedFiles[0]);
    }
  };

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const responseResponsaveis = await axios.get(`${backendUrl}/funcionarios`);
        const responseObras = await axios.get(`${backendUrl}/obras`);
        setObras(responseObras.data);
        setResponsaveis(responseResponsaveis.data);
      } catch (error) {
        console.error("Erro ao buscar obras e/ou funcionários", error);
      }
    };

    fetchObras();
  }, []);

  const handleAddFuncionario = () => {
    if (nomeFuncionario.trim() !== "") {
      setFuncionarios((prevFuncionarios) => [...prevFuncionarios, nomeFuncionario.trim()]);
      setNomeFuncionario("");
    }
  };

  const handleSavePresencaList = async () => {
    if (!selectedResponsavel || !selectedObra) {
      alert("Por favor, selecione o responsável e a obra.");
      return;
    }

    const presenceListData = {
      responsavel: selectedResponsavel?.nome,
      obra: { id: selectedObra?.id },
      funcionarios: funcionarios,
      qtdFuncionarios: funcionarios.length,
    };

    const formData = new FormData();
    formData.append("listaDePresenca", new Blob([JSON.stringify(presenceListData)], { type: "application/json" }));

    if (anexo) {
      formData.append("anexo", anexo);
    }

    try {
      const response = await axios.post(`${backendUrl}/listas-de-presenca`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Lista de Presença salva com sucesso", response.data);
      setModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar a Lista de Presença", error);
      alert("Erro ao salvar a Lista de Presença");
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setModalOpen(true)}
        className="w-full sm:w-auto px-6 py-3 bg-black hover:bg-gray-600 transition-all text-white"
      >
        Criar Nova Lista de Presença
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Criar Nova Lista de Presença"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="responsavel" className="block text-sm font-medium mb-2">
                Responsável
              </label>
              <select
                id="responsavel"
                className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setSelectedResponsavel(responsaveis.find((r) => r.id === Number(e.target.value)) || null)
                }
              >
                <option value="">Escolha um Responsável</option>
                {responsaveis.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="obra" className="block text-sm font-medium mb-2">
                Obra
              </label>
              <select
                id="obra"
                className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setSelectedObra(obras.find((w) => w.id === Number(e.target.value)) || null)
                }
              >
                <option value="">Escolha uma Obra</option>
                {obras.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedObra && (
            <div>
              <InputField
                name="name"
                placeholder="Nome do Funcionário"
                type="text"
                label="Nome do Funcionário"
                value={nomeFuncionario}
                onChange={(e) => setNomeFuncionario(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddFuncionario}
                className="mt-4 w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
              >
                Adicionar à Lista
              </button>
            </div>
          )}

          {funcionarios.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Funcionários Presentes</h3>
              <ul className="space-y-2">
                {funcionarios.map((funcionario, index) => (
                  <li
                    key={index}
                    className="p-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm"
                  >
                    {funcionario}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all"
            >
              Cancelar
            </button>

            <UploadArquivos onFileSelect={handleFileSelect} />

            {anexo && (
              <div className="small">Arquivo selecionado: {anexo.name}</div>
            )}

            <button
              type="button"
              onClick={handleSavePresencaList}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              Salvar Lista
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
