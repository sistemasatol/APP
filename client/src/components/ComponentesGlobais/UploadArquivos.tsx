import React, { useState, ChangeEvent } from "react";

// Tipagem das propriedades esperadas para o componente
interface FileUploaderProps {
  onFileSelect: (files: File[]) => void; // Callback para enviar os arquivos
  multiple?: boolean; // Se o upload será múltiplo
  allowedTypes?: string[]; // Tipos de arquivos permitidos
  maxFileSize?: number; // Tamanho máximo dos arquivos (em bytes)
}

const UploadArquivos: React.FC<FileUploaderProps> = ({
  onFileSelect,
  multiple = false,
  allowedTypes = [],
  maxFileSize = 5 * 1024 * 1024, // 5MB por padrão
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Função para lidar com a seleção de arquivos
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      // Validação de tipo
      if (allowedTypes.length && !allowedTypes.includes(file.type)) {
        alert(`Arquivo ${file.name} não é do tipo permitido.`);
        return false;
      }

      // Validação de tamanho
      if (file.size > maxFileSize) {
        alert(`Arquivo ${file.name} excede o tamanho máximo permitido.`);
        return false;
      }

      return true;
    });

    setSelectedFiles(validFiles);
    onFileSelect(validFiles); // Envia os arquivos para o componente pai
  };

  // Função para remover arquivos
  const handleRemoveFile = (fileName: string) => {
    const filteredFiles = selectedFiles.filter((file) => file.name !== fileName);
    setSelectedFiles(filteredFiles);
    onFileSelect(filteredFiles); // Envia os arquivos restantes para o componente pai
  };

  return (
    <div className="file-uploader">
      <input
        type="file"
        multiple={multiple}
        accept={allowedTypes.join(",")}
        onChange={handleFileChange}
      />
      {selectedFiles.length > 0 && (
        <ul>
          {selectedFiles.map((file) => (
            <li key={file.name}>
              {file.name} - {(file.size / 1024).toFixed(2)} KB
              <button onClick={() => handleRemoveFile(file.name)}>Remover</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UploadArquivos;
