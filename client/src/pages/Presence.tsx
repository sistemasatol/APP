import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Employee {
  id: number;
  name: string;
  lastName: string;
  cpf: string;
}

interface Work {
  id: number;
  name: string;
}

interface Presence {
  employee: Employee;
  work: Work;
  entryTime: string;
  exitTime: string | null;
  date: string;
}

const Presence: React.FC = () => {
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;

  const [works, setWorks] = useState<Work[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);


  useEffect(() => {
    
    axios.get(`${backEndUrl}/works`).then((response) => {
      setWorks(response.data);
    });
  }, []);


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <label htmlFor="work-select" className="block text-xl font-semibold mb-2">Select Work</label>
        <select
          id="work-select"
          onChange={handleWorkChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        >
          <option value="">Select a Work</option>
          {works.map((work) => (
            <option key={work.id} value={work.id}>
              {work.name}
            </option>
          ))}
        </select>
      </div>

      {selectedWork && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {selectedWork.name} - {selectedDate}
          </h2>

          <div className="space-y-4">
            {employees.map((employee) => (
              <div
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm"
              >
                <div>
                  <span className="block font-medium text-lg">{employee.name} {employee.lastName}</span>
                  <span className="block text-sm text-gray-500">{employee.cpf}</span>
                </div>

                <div className="flex space-x-4">
                  <button
                 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    Mark Entry
                  </button>
                  <button
                    
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                  >
                    Mark Exit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Presence;
