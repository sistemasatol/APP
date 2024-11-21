import React, { useState, useEffect } from "react";
import EditEmployeeModal from "../Form/EditEmployeeModal"; // Importe o Modal de Edição
import DeleteConfirmationModal from "../Form/DeleteConfirmationModal"; // Importe o Modal de Exclusão

// Definir o tipo de dado para os funcionários
interface Employee {
    id: number;
    name: string;
    lastName: string;
    cpf: string;
    phoneNumber: string;
    birthDate: string;
    enterprise: { name: string; id: number }; // Atualizado para refletir o objeto com id e nome
    role: { name: string; id: number }; // Atualizado para refletir o objeto com id e nome
    work: { name: string; id: number }; // Atualizado para refletir o objeto com id e nome
}

const EmployeeTable: React.FC = () => {
    const [data, setData] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null); // Estado para controlar o funcionário selecionado
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade do modal de edição
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para controlar a visibilidade do modal de exclusão
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null); // Funcionário a ser excluído

    useEffect(() => {
        fetch("http://localhost:8080/api/employees")
            .then((response) => response.json())
            .then((json) => {
                const formattedData: Employee[] = json.map((employee: any) => ({
                    id: employee.id,
                    name: employee.name || "Nome não informado",
                    lastName: employee.lastName || "Nome não informado",
                    cpf: employee.cpf || "CPF não informado",
                    phoneNumber: employee.phoneNumber || "Telefone não informado",
                    birthDate: employee.birthDate || "Data de Nascimento não informado",
                    enterprise: employee.enterprise || { name: "Empresa não informada", id: -1 },
                    role: employee.role || { name: "Função não informada", id: -1 },
                    work: employee.work || { name: "Obra não informada", id: -1 },
                }));
                setData(formattedData);
            })
            .catch((error) => console.error("Erro ao carregar dados:", error));
    }, []);

    const handleEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const handleDelete = (employee: Employee) => {
        setEmployeeToDelete(employee);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setEmployeeToDelete(null);
    };

    const handleUpdateEmployee = (updatedEmployee: Employee) => {
        setData((prevData) =>
            prevData.map((employee) =>
                employee.id === updatedEmployee.id ? updatedEmployee : employee
            )
        );
    };

    const handleConfirmDelete = async () => {
        if (employeeToDelete) {
            try {
                await fetch(`http://localhost:8080/api/employees/${employeeToDelete.id}`, {
                    method: "DELETE",
                });
                // Atualize a lista de funcionários após a exclusão
                setData((prevData) => prevData.filter((employee) => employee.id !== employeeToDelete.id));
                console.log("Funcionário excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir funcionário", error);
            }
        }
        handleCloseDeleteModal(); // Fecha o modal de confirmação após a exclusão
    };

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
                        <th className="py-3 px-6 text-left">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {data.length > 0 ? (
                        data.map((employee) => (
                            <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{employee.name}</td>
                                <td className="py-3 px-6 text-left">{employee.cpf}</td>
                                <td className="py-3 px-6 text-left">{employee.enterprise.name}</td> {/* Ajustado para exibir nome da empresa */}
                                <td className="py-3 px-6 text-left">{employee.role.name}</td> {/* Ajustado para exibir nome da função */}
                                <td className="py-3 px-6 text-left">{employee.work.name}</td> {/* Ajustado para exibir nome da obra */}
                                <td className="py-3 px-6 text-left">
                                    <button
                                        onClick={() => handleEdit(employee)} // Ao clicar no botão de editar
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(employee)} // Ao clicar no botão de excluir
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
            {isModalOpen && selectedEmployee && (
                <EditEmployeeModal
                    employee={selectedEmployee}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdateEmployee}
                />
            )}

            {/* Modal de Confirmação de Exclusão */}
            {isDeleteModalOpen && employeeToDelete && (
                <DeleteConfirmationModal
                    employee={employeeToDelete}
                    onClose={handleCloseDeleteModal}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default EmployeeTable;
