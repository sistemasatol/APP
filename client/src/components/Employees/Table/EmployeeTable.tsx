import React, { useEffect, useState } from "react";

interface Employee {
    id: number;
    name: string;
    cpf: string;
    enterprise: string; // Ajustado para ser string
    role: string; // Ajustado para ser string
    work: string; // Ajustado para ser string
}

const EmployeeTable: React.FC = () => {
    const [data, setData] = useState<Employee[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/employees")
            .then((response) => response.json())
            .then((json) => {
                console.log("Resposta da API:", json);
                const formattedData: Employee[] = json.map((employee: any) => ({
                    id: employee.id,
                    name: employee.name || "Nome não informado",
                    cpf: employee.cpf || "CPF não informado",
                    enterprise: employee.enterprise?.name || "Empresa não informada",
                    role: employee.role?.name || "Função não informada",
                    work: employee.work?.name || "Obra não informada",
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
                        <th className="py-3 px-6 text-left">CPF</th>
                        <th className="py-3 px-6 text-left">Empresa</th>
                        <th className="py-3 px-6 text-left">Função</th>
                        <th className="py-3 px-6 text-left">Obra</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {data.length > 0 ? (
                        data.map((employee) => (
                            <tr
                                key={employee.id}
                                className="border-b border-gray-200 hover:bg-gray-100"
                            >
                                <td className="py-3 px-6 text-left">{employee.name}</td>
                                <td className="py-3 px-6 text-left">{employee.cpf}</td>
                                <td className="py-3 px-6 text-left">{employee.enterprise}</td>
                                <td className="py-3 px-6 text-left">{employee.role}</td>
                                <td className="py-3 px-6 text-left">{employee.work}</td>
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

export default EmployeeTable;
