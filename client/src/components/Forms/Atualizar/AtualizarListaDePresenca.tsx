import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../../ComponentesGlobais/InputField";
import Modal from "../../ComponentesGlobais/Modal";
import { AtualizarListaDePresencaProps, Obra } from "../../../types";


const backendUrl = import.meta.env.VITE_BACKEND_URL;



export default function AtualizarListaDePresenca({
    isOpen,
    onClose,
    presenca,
    refreshList,
}: AtualizarListaDePresencaProps) {
    const [obras, setObras] = useState<Obra[]>([]);
    const [selectedObra, setSelectedObra] = useState<Obra | null>(null);
    const [criadoem, setCriadoEm] = useState<string>("");
    const [funcionarios, setFuncionarios] = useState<string[]>([]);
    const [newFuncionario, setNewFuncionario] = useState<string>(""); // Estado para o valor do novo funcionário
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const obrasResponse = await axios.get(`${backendUrl}/obras`);
                setObras(obrasResponse.data);
            } catch (error) {
                console.error("Erro ao buscar dados para o modal de edição", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (presenca) {
            setSelectedObra(presenca.obra);
            setCriadoEm(presenca.criadoEm);
            setFuncionarios(presenca.funcionarios || []);
        }
    }, [presenca]);

    const handleSaveChanges = async () => {
        if (!presenca || !criadoem || !selectedObra) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        const upcriadoemdPresenca = {
            ...presenca,
            obra: { id: selectedObra.id },
            data: criadoem,
            funcionarios,
            funcionariosNumber: funcionarios.length,
        };

        setLoading(true);
        try {
            await axios.put(`${backendUrl}/listas-de-presenca/${presenca.id}`, upcriadoemdPresenca);
            refreshList();
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar a Lista de Presença", error);
            alert("Não foi possível salvar as alterações. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddFuncionario = () => {
        if (newFuncionario.trim() !== "") {
            setFuncionarios((prev) => [...prev, newFuncionario.trim()]);
            setNewFuncionario(""); // Limpa o campo de input
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar Lista de Presença">
            <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="obra" className="block text-sm font-medium mb-2">
                            Obra
                        </label>
                        <select
                            id="obra"
                            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedObra?.id || ""}
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
                    <div>
                        <label htmlFor="criadoem" className="block text-sm font-medium mb-2">
                            Data
                        </label>
                        <input
                            type="criadoem"
                            id="criadoem"
                            value={criadoem}
                            disabled
                            onChange={(e) => setCriadoEm(e.target.value)}
                            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    
                    <InputField
                        name="funcionarios"
                        placeholder="Nome do Funcionário"
                        type="text"
                        label="Adicionar Funcionário"
                        value={newFuncionario}
                        onChange={(e) => setNewFuncionario(e.target.value)} // Atualiza o valor do input
                    />
                    <button
                        type="button"
                        onClick={handleAddFuncionario}
                        className="px-4 py-2 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                    >
                        Adicionar Funcionário
                    </button>
                    <ul className="space-y-2 mt-2">
                    <label htmlFor="funcionarios" className="block text-sm font-medium mb-2">
                        Funcionários Presentes
                    </label>
                        {funcionarios.map((emp, index) => (
                            <li
                                key={index}
                                className="flex justify-between p-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm"
                            >
                                {emp}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFuncionarios((prev) => prev.filter((_, i) => i !== index))
                                    }
                                    className="text-red-500 hover:underline"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSaveChanges}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                        disabled={loading}
                    >
                        {loading ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
