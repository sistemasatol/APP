import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SideBar() {
  const [isNavBarActive, setIsNavBarActive] = useState(true);

  const links = [
    {
      label: "RH",
      isParent: true,
      children: [
        { path: "/funcionarios", label: "Funcionários" },
        { path: "/funcoes", label: "Funções" },
        { path: "/obras", label: "Obras" },
        { path: "/empresas", label: "Empresas" }
      ]
    },
    {
      label: "Lista de Presença",
      isParent: false,
      children: [],
      path: "/lista-de-presenca"
    }
  ];

  return (
    <aside
      className={`hidden md:block w-64 bg-white border-r border-gray-300 transition-transform ${isNavBarActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col`}
    >
      <div className="p-4 bg-gray-200 border-b border-gray-300">
        <h2 className="text-2xl font-light text-gray-700">Atol Incorporadora</h2>
      </div>
      <nav className="flex-1 p-4 space-y-4">
        {links.map(({ label, isParent, children, path }) => (
          <div key={label}>
            {isParent ? (
              <div className="font-bold text-gray-700">{label}</div>
            ) : (
              <Link
                to={path}
                className="block py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
              >
                {label}
              </Link>
            )}

            {/* Renderizar links filhos */}
            {children.length > 0 && (
              <div className="pl-4 space-y-2">
                {children.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className="block py-2 px-3 text-gray-600 hover:bg-gray-100"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
