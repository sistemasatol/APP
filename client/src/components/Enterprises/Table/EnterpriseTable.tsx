import React, { useEffect, useState } from "react";

interface Enterprise {
    id: number;
    name: string;
    cnpj: string;
    phoneNumber: string; 
}

const EnterpriseTable: React.FC = () => {
    const [data, setData] = useState<Enterprise[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/enterprises")
            .then((response) => response.json())
            .then((json) => {
                console.log("Resposta da API:", json);
                const formattedData: Enterprise[] = json.map((enterprise: any) => ({
                    id: enterprise.id,
                    name: enterprise.name || "Nome não informado",
                    cnpj: enterprise.cnpj || "CNPJ não informado",
                    phoneNumber: enterprise.phoneNumber || "Número de Telefone não informado",
                }));
                setData(formattedData);
            })
            .catch((error) => console.error("Erro ao carregar dados:", error));
    }, []);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Nome</th>
                        <th className="py-3 px-6 text-left">CNPJ</th>
                        <th className="py-3 px-6 text-left">Telefone</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {data.length > 0 ? (
                        data.map((enterprise) => (
                            <tr
                                key={enterprise.id}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6 text-left">{enterprise.name}</td>
                                <td className="py-3 px-6 text-left">{enterprise.cnpj}</td>
                                <td className="py-3 px-6 text-left">{enterprise.phoneNumber}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="text-center py-3 px-6 text-gray-500"
                            >
                                Nenhum dado encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EnterpriseTable;
