import { useState } from "react";
import InputField from "./InputField";

import Button from "./Button";

export default function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        console.log('Login: ', { email, password });
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 m-5 justify-center">


            <p className="text-blue-800 font-light text-center justify-center text-5xl mt-3">Log In</p>

            <hr style={{marginBottom: "2rem"}} className="mb-6" />

            <InputField
                placeholder="Digite seu Email"
                type="text"
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
                placeholder="Digite sua Senha"
                type="password"
                label="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div className="text-red-500">{error}</div>}

            <span className="w-full justify-end"><a className="font-thin text-right" href="">Esqueceu a senha? Clique aqui!</a></span>

            <Button
                type="submit"
                text="Entrar"
            />

        </form>
    )
}


