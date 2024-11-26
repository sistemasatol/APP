import { Outlet } from "react-router-dom";

import SideBar from "../components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
     
      <SideBar />
      <div className="flex flex-col flex-1">
      
        <main className="flex-grow p-6">
          <Outlet /> 
        </main>
   
      </div>
    </div>
  );
};

export default Layout;