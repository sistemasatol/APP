import React from 'react'
import NewEmployeeModal from '../components/Employees/Form/NewEmployeeModal'


const Employees: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <NewEmployeeModal/>
            </div>
        </div>
    )
}

export default Employees