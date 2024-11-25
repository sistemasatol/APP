import { useState, useEffect } from "react";
import axios from "axios";
import { format, parse, isValid } from "date-fns";
import EditAttendanceModal from "../Form/EditAttendanceModal";

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

export default function AttendanceList() {
    const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);
    const [works, setWorks] = useState<Work[]>([]);

    const fetchAttendanceList = async () => {
        try {
            const response = await axios.get(`${backendUrl}/attendanceLists`);
            console.log(response.data); // Verifique aqui o que é retornado
            setAttendanceList(response.data);
        } catch (error) {
            console.error("Erro ao buscar listas de presença", error);
        }
    };

    useEffect(() => {


        const fetchWorks = async () => {
            try {
                const response = await axios.get(`${backendUrl}/works`);
                setWorks(response.data);
            } catch (error) {
                console.error("Erro ao buscar obras", error);
            }
        };

        fetchAttendanceList();
        fetchWorks();
    }, []);

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);

    const handleOpenEditModal = (attendance: Attendance) => {
        setSelectedAttendance(attendance);
        setEditModalOpen(true);
    };

    const refreshAttendanceList = () => {
        // Recarregar a lista
        fetchAttendanceList();
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
                        {attendanceList.map((attendance) => {
                            let parsedDate: Date | string = attendance.data;

                            if (typeof attendance.data === "string" && attendance.data.includes("/")) {
                                const dateObj = parse(attendance.data, "dd/MM/yyyy", new Date());
                                parsedDate = isValid(dateObj) ? dateObj : "Data inválida";
                            }

                            return (
                                <tr
                                    onClick={() => handleOpenEditModal(attendance)}
                                    className="cursor-pointer hover:bg-slate-100"
                                    key={attendance.id}
                                    aria-label={`Editar lista de presença da obra ${attendance.work?.name || "Não informado"
                                        }`}
                                >
                                    <td className="px-4 text-center py-2 border">
                                        {typeof parsedDate === "string"
                                            ? parsedDate
                                            : format(parsedDate, "dd/MM/yyyy")}
                                    </td>
                                    <td className="px-4 text-center py-2 border">
                                        {attendance.work ? attendance.work.name : "Não informado"}
                                    </td>
                                    <td className="px-4 text-center py-2 border">{attendance.employeesNumber}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <EditAttendanceModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                attendance={selectedAttendance}
                refreshList={refreshAttendanceList}
            />

        </div>
    );
}
