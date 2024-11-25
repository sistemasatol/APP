import React from 'react'
import { InputField } from '../../Global_Components'

type Props = {
    entity: string | number | null | undefined;
    onChange: () => void;

}

export default function NewEmployeeForm({ }: Props) {
    return (
        <div><form onSubmit={handleSubmit} className="space-y-2 max-w-4xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
                <InputField
                    placeholder="Digite o Nome"
                    type="text"
                    label="Nome"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                />
                <InputField
                    placeholder="Digite o Sobrenome"
                    type="text"
                    label="Sobrenome"
                    name="lastName"
                    value={employee.lastName}
                    onChange={handleChange}
                />

                <InputField
                    placeholder="Digite o CPF"
                    type="text"
                    label="CPF"
                    name="cpf"
                    value={employee.cpf}
                    onChange={handleChange}
                />
                <InputField
                    placeholder="Digite o Número de Telefone"
                    type="text"
                    label="Telefone"
                    name="phoneNumber"
                    value={employee.phoneNumber}
                    onChange={handleChange}
                />

                <InputField
                    placeholder="Digite a Data de Nascimento"
                    type="date"
                    label="Data de Nascimento"
                    name="birthDate"
                    value={employee.birthDate}
                    onChange={handleChange}
                />



                <SelectInputField
                    label="Obra"
                    value={employee.work_id}
                    onChange={(e) => handleSelectChange(e, "work_id")}
                    options={works}
                />
                <SelectInputField
                    label="Função"
                    value={employee.role_id}
                    onChange={(e) => handleSelectChange(e, "role_id")}
                    options={roles}
                />
                <SelectInputField
                    label="Empresa"
                    value={employee.enterprise_id}
                    onChange={(e) => handleSelectChange(e, "enterprise_id")}
                    options={enterprises}
                />

            </div>

            <Button type="submit" text="Cadastrar" />
        </form></div>
    )
}