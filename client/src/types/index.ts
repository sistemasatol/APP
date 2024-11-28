export interface Cargo {
    id: number;
    nome: string;
}

export interface Empresa {
    id: number;
    nome: string;
    cnpj: string;
    telefone: string;
}

export interface Funcionario {
    id?: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    telefone: string;
    nascimento: string;
    obra: Obra; //fk
    empresa: Empresa; //fk
    cargo: Cargo; //fk
}
export interface Obra {
    nome: string,
    id: number
}

export interface Presenca {
    id?: number;
    obra: Obra | null;
    criadoEm: string;
    qtdFuncionarios: number;
    funcionarios: string[];
}

export interface Responsavel {
    name: string;
    id: number;
  }
  
export interface ButtonProps {
    type: 'submit' | 'button';
    text: string;
}

export interface DropdownProps {
    label: string;
    options: { id: number; name: string }[];
    value: number | null;
    onChange: (value: number | null) => void;
}

export interface InputFieldProps {
    label: string;
    type: string;
    value: string | number | undefined;
    name: string; // Adicionado para suporte à identificação do campo
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export interface SearchInputProps {
    onSearch?: (searchTerm: string) => void; // Define the type for the search term
}

export interface SelectInputFieldProps {
    label: string;
    value?: number | string; // O valor selecionado, representando o ID da opção
    options: { id: number; nome: string }[]; // Lista de opções para o select
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Função chamada ao alterar o valor
}

export interface ConfirmarExclusaoCargoProps {
    cargo: Cargo;
    onClose: () => void;
    onConfirm: () => void;
}

export interface ConfirmarExclusaoEmpresaProps {
    empresa: Empresa;
    onClose: () => void;
    onConfirm: () => void;
}

export interface ConfirmarExclusaoFuncionarioProps {
    funcionario: Funcionario;
    onClose: () => void;
    onConfirm: () => void;
}

export interface ConfirmarExclusaoObraProps {
    obra: Obra;
    onClose: () => void;
    onConfirm: () => void;
}

export interface AtualizarCargoProps {
    cargo: Cargo;
    onClose: () => void;
    onUpdate: (updatedCargo: Cargo) => void;
}

export interface AtualizarEmpresaProps {
    empresa: Empresa;
    onClose: () => void;
    onUpdate: (updatedEmpresa: Empresa) => void;
}

export interface AtualizarListaDePresencaProps {
    isOpen: boolean;
    onClose: () => void;
    presenca: Presenca | null;
    refreshList: () => void;
}

export interface AtualizarObraProps {
    obra: Obra;
    onClose: () => void;
    onUpdate: (updatedObra: Obra) => void;
}


