import React, { useEffect, useState } from "react";
import axios from "axios";
import EditEmployeeModal from "../Form/EditEmployeeModal";
import DeleteConfirmationModal from "../Form/DeleteConfirmationModal";

interface Employee {
    id: number;
    name: string;
    lastName: string;
    cpf: string;
    phoneNumber: string;
    birthDate: string;
    work_id: number;
    enterprise_id: number;
    role_id: number;
    workName: string;
    enterpriseName: string;
    roleName: string;
}

const EmployeeTable: React.FC = () => {
    const [data, setData] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

    useEffect(() => {
        // Fetching employees data
        fetch("http://localhost:8080/api/employees")
            .then((response) => response.json())
            .then(async (json) => {
                const employees: Employee[] = await Promise.all(
                    json.map(async (employee: any) => {
                        // Fetching work, enterprise, and role details based on IDs
                        const workResponse = await axios.get(`http://localhost:8080/api/works/${employee.work_id}`);
                        const enterpriseResponse = await axios.get(`http://localhost:8080/api/enterprises/${employee.enterprise_id}`);
                        const roleResponse = await axios.get(`http://localhost:8080/api/roles/${employee.role_id}`);

                        return {
                            id: employee.id,
                            name: employee.name || "Nome não informado",
                            lastName: employee.lastName || "Sobrenome não informado",
                            cpf: employee.cpf || "CPF não informado",
                            phoneNumber: employee.phoneNumber || "Telefone não informado",
                            birthDate: employee.birthDate || "Data de nascimento não informada",
                            work_id: employee.work_id || 0,
                            enterprise_id: employee.enterprise_id || 0,
                            role_id: employee.role_id || 0,
                            workName: workResponse.data.name || "Obra não informada",
                            enterpriseName: enterpriseResponse.data.name || "Empresa não informada",
                            roleName: roleResponse.data.name || "Função não informada"
                        };
                    })
                );

                setData(employees);
            })
            .catch((error) => console.error("Erro ao carregar dados:", error));
    }, []);

    // Funções de manipulação de modais, edição e exclusão
    const handleEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsEditModalOpen(true);
    };

    const handleDelete = (employee: Employee) => {
        setEmployeeToDelete(employee);
        setIsDeleteModalOpen(true);
    };

    const deleteEmployee = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/employees/${id}`);
            setData(data.filter((employee) => employee.id !== id));
            setIsDeleteModalOpen(false);
            console.log("Colaborador excluído com sucesso");
        } catch (error) {
            console.error("Erro ao excluir colaborador", error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Nome</th>
                        <th className="py-3 px-6 text-left">Sobrenome</th>
                        <th className="py-3 px-6 text-left">CPF</th>
                        <th className="py-3 px-6 text-left">Telefone</th>
                        <th className="py-3 px-6 text-left">Data de Nascimento</th>
                        <th className="py-3 px-6 text-left">Obra</th>
                        <th className="py-3 px-6 text-left">Empresa</th>
                        <th className="py-3 px-6 text-left">Função</th>
                        <th className="py-3 px-6 text-left">Ações</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {data.length > 0 ? (
                        data.map((employee) => (
                            <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{employee.name}</td>
                                <td className="py-3 px-6 text-left">{employee.lastName}</td>
                                <td className="py-3 px-6 text-left">{employee.cpf}</td>
                                <td className="py-3 px-6 text-left">{employee.phoneNumber}</td>
                                <td className="py-3 px-6 text-left">{employee.birthDate}</td>
                                <td className="py-3 px-6 text-left">{employee.workName}</td>
                                <td className="py-3 px-6 text-left">{employee.enterpriseName}</td>
                                <td className="py-3 px-6 text-left">{employee.roleName}</td>
                                <td className="py-3 px-6 text-left">
                                    <button onClick={() => handleEdit(employee)} className="text-blue-600 mr-2">
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(employee)} className="text-red-600">
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} className="text-center py-3 px-6 text-gray-500">
                                Nenhum dado encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modais */}
            {isEditModalOpen && selectedEmployee && (
                <EditEmployeeModal
                    employee={selectedEmployee}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={(updatedEmployee: Employee) => {
                        setData(data.map((employee) =>
                            employee.id === updatedEmployee.id ? updatedEmployee : employee
                        ));
                        setIsEditModalOpen(false);
                    }}
                />
            )}

            {isDeleteModalOpen && employeeToDelete && (
                <DeleteConfirmationModal
                    employee={employeeToDelete}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => deleteEmployee(employeeToDelete.id)}
                />
            )}
        </div>
    );
};

export default EmployeeTable;
