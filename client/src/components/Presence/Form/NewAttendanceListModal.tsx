import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "../../Global_Components/InputField";
import Modal from "../../Employees/Form/Modal";

interface Work {
  name: string;
  id: number;
}

interface Responsible {
  name: string;
  id: number;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function NewPresenceListModal() {
  const [works, setWorks] = useState<Work[]>([]);
  const [responsibles, setResponsibles] = useState<Responsible[]>([]);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [selectedResponsible, setSelectedResponsible] = useState<Responsible | null>(null);
  const [date, setDate] = useState<string>(() => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return `${year}-${month}-${day}`;
  });

  const [employeeName, setEmployeeName] = useState<string>("");
  const [presents, setPresents] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const responseResponsibles = await axios.get(`${backendUrl}/employees`);
        const responseWorks = await axios.get(`${backendUrl}/works`);
        setWorks(responseWorks.data);
        setResponsibles(responseResponsibles.data);
      } catch (error) {
        console.error("Erro ao buscar obras e/ou funcionários", error);
      }
    };

    fetchWorks();
  }, []);

  const handleAddEmployee = () => {
    if (employeeName.trim() !== "") {
      setPresents((prevPresents) => [...prevPresents, employeeName.trim()]);
      setEmployeeName("");
    }
  };

  const handleSavePresenceList = async () => {
    const presenceListData = {
      responsible: selectedResponsible?.name,
      data: date,
      work: { id: selectedWork?.id },
      employees: presents,
      employeesNumber: presents.length,
    };

    try {
      const response = await axios.post(`${backendUrl}/attendanceLists`, presenceListData);
      console.log("Lista de Presença salva com sucesso", response);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar a Lista de Presença", error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setModalOpen(true)}
        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
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
              <label htmlFor="responsible" className="block text-sm font-medium mb-2">
                Responsável
              </label>
              <select
                id="responsible"
                className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setSelectedResponsible(responsibles.find((r) => r.id === Number(e.target.value)) || null)
                }
              >
                <option value="">Escolha um Responsável</option>
                {responsibles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="work" className="block text-sm font-medium mb-2">
                Obra
              </label>
              <select
                id="work"
                className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              disabled
              className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {selectedWork && (
            <div>
              <InputField
                name="name"
                placeholder="Nome do Funcionário"
                type="text"
                label="Nome do Funcionário"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddEmployee}
                className="mt-4 w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
              >
                Adicionar à Lista
              </button>
            </div>
          )}

          {presents.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Funcionários Presentes</h3>
              <ul className="space-y-2">
                {presents.map((employee, index) => (
                  <li
                    key={index}
                    className="p-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm"
                  >
                    {employee}
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
            <button
              type="button"
              onClick={handleSavePresenceList}
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
