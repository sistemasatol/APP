import { Outlet } from "react-router-dom";

import MenuLateral from "../components/MenuLateral/MenuLateral";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <MenuLateral />
      <div className="flex flex-col flex-1">
      
        <main className="flex-grow p-6">
          <Outlet /> 
        </main>
   
      </div>
    </div>
  );
};

export default Layout;