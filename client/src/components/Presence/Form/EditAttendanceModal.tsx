import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../../Global_Components/InputField";
import Modal from "../../Employees/Form/Modal";

interface Work {
    name: string;
    id: number;
}

interface Attendance {
    id: number;
    work: Work | null;
    data: string;
    employeesNumber: number;
    employees: string[];
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    attendance: Attendance | null;
    refreshList: () => void;
}

export default function EditAttendanceModal({
    isOpen,
    onClose,
    attendance,
    refreshList,
}: EditModalProps) {
    const [works, setWorks] = useState<Work[]>([]);
    const [selectedWork, setSelectedWork] = useState<Work | null>(null);
    const [date, setDate] = useState<string>("");
    const [employees, setEmployees] = useState<string[]>([]);
    const [newEmployee, setNewEmployee] = useState<string>(""); // Estado para o valor do novo funcionário
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const worksResponse = await axios.get(`${backendUrl}/works`);
                setWorks(worksResponse.data);
            } catch (error) {
                console.error("Erro ao buscar dados para o modal de edição", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (attendance) {
            setSelectedWork(attendance.work);
            setDate(attendance.data);
            setEmployees(attendance.employees || []);
        }
    }, [attendance]);

    const handleSaveChanges = async () => {
        if (!attendance || !date || !selectedWork) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        const updatedAttendance = {
            ...attendance,
            work: { id: selectedWork.id },
            data: date,
            employees,
            employeesNumber: employees.length,
        };

        setLoading(true);
        try {
            await axios.put(`${backendUrl}/attendanceLists/${attendance.id}`, updatedAttendance);
            refreshList();
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar a Lista de Presença", error);
            alert("Não foi possível salvar as alterações. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddEmployee = () => {
        if (newEmployee.trim() !== "") {
            setEmployees((prev) => [...prev, newEmployee.trim()]);
            setNewEmployee(""); // Limpa o campo de input
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar Lista de Presença">
            <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="work" className="block text-sm font-medium mb-2">
                            Obra
                        </label>
                        <select
                            id="work"
                            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedWork?.id || ""}
                            onChange={(e) =>
                                setSelectedWork(works.find((w) => w.id === Number(e.target.value)) || null)
                            }
                        >
                            <option value="">Escolha uma Obra</option>
                            {works.map((w) => (
                                <option key={w.id} value={w.id}>
                                    {w.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium mb-2">
                            Data
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="employees" className="block text-sm font-medium mb-2">
                        Funcionários Presentes
                    </label>
                    <InputField
                        name="employees"
                        placeholder="Nome do Funcionário"
                        type="text"
                        label="Adicionar Funcionário"
                        value={newEmployee}
                        onChange={(e) => setNewEmployee(e.target.value)} // Atualiza o valor do input
                    />
                    <button
                        type="button"
                        onClick={handleAddEmployee}
                        className="px-4 py-2 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                    >
                        Adicionar Funcionário
                    </button>
                    <ul className="space-y-2 mt-2">
                        {employees.map((emp, index) => (
                            <li
                                key={index}
                                className="flex justify-between p-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm"
                            >
                                {emp}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setEmployees((prev) => prev.filter((_, i) => i !== index))
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
