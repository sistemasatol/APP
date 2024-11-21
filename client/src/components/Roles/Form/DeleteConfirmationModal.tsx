import React from "react";

interface Enterprise {
    id: number;
    name: string;
    cnpj: string;
    phoneNumber: string;
}

interface DeleteConfirmationModalProps {
    enterprise: Enterprise;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ enterprise, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h3 className="text-lg font-semibold">Confirmar Exclusão</h3>
                <p>Você tem certeza que deseja excluir a empresa "{enterprise.name}"?</p>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded mr-2">
                        Cancelar
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
