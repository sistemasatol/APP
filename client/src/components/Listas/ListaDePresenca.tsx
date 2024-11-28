import { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO, isValid } from "date-fns";
import AtualizarListaDePresenca from "../Forms/Atualizar/AtualizarListaDePresenca";
import { Obra, Presenca } from "../../types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function PresencasTable() {
    const [listaDePresenca, setListaDePresenca] = useState<Presenca[]>([]);
    const [obras, setObras] = useState<Obra[]>([]);

    const fetchListaDePresenca = async () => {
        try {
            const response = await axios.get(`${backendUrl}/listas-de-presenca`);
            console.log(response.data); // Verifique o que é retornado
            setListaDePresenca(response.data);
        } catch (error) {
            console.error("Erro ao buscar listas de presença", error);
        }
    };

    useEffect(() => {
        const fetchObras = async () => {
            try {
                const response = await axios.get(`${backendUrl}/obras`);
                setObras(response.data);
            } catch (error) {
                console.error("Erro ao buscar obras", error);
            }
        };

        fetchListaDePresenca();
        fetchObras();
    }, []);

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedPresenca, setSelectedPresenca] = useState<Presenca | null>(null);

    const handleOpenEditModal = (presenca: Presenca) => {
        setSelectedPresenca(presenca);
        setEditModalOpen(true);
    };

    const refreshListaDePresenca = () => {
        // Recarregar a lista
        fetchListaDePresenca();
    };

    return (
        <div className="p-4">
            {/* Exibindo a lista de presença */}
            <div className="overflow-x-auto relative mt-6">
                <table className="min-w-full bg-white border border-gray-300 table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm leading-normal">
                            <th className="py-3 px-6 text-center">Data</th>
                            <th className="py-3 px-6 text-center">Obra</th>
                            <th className="py-3 px-6 text-center">Nº de Funcionários</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-xs sm:text-sm font-light">
                        {listaDePresenca.map((presenca) => {
                            // Verificar se criadoEm não é null e é uma data válida
                            let dataFormatada = "Não informado";
                            if (presenca.criadoEm) {
                                const dateObj = parseISO(presenca.criadoEm);
                                if (isValid(dateObj)) {
                                    dataFormatada = format(dateObj, "dd/MM/yyyy");
                                }
                            }

                            return (
                                <tr
                                    onClick={() => handleOpenEditModal(presenca)}
                                    className="cursor-pointer hover:bg-slate-100"
                                    key={presenca.id}
                                    aria-label={`Editar lista de presença da obra ${presenca.obra?.nome || "Não informado"}`}
                                >
                                    <td className="px-4 text-center py-2 border">{dataFormatada}</td>
                                    <td className="px-4 text-center py-2 border">
                                        {presenca.obra ? presenca.obra.nome : "Não informado"}
                                    </td>
                                    <td className="px-4 text-center py-2 border">
                                        {presenca.qtdFuncionarios || 0}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <AtualizarListaDePresenca
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                presenca={selectedPresenca}
                refreshList={refreshListaDePresenca}
            />
        </div>
    );
}
