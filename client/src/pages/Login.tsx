import React from 'react'
import LoginForm from '../components/Login/LoginForm'


const Login: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <LoginForm />
            </div>
        </div>
    )
}

export default Login