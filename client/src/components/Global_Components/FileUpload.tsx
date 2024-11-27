import React, { useState } from "react";
import * as XLSX from "xlsx";

interface FileUploadProps {
  // Texto exibido no botão de upload
  buttonText: string;
  // Texto informativo sobre os tipos de arquivo aceitos
  fileInfoText: string;
  // Tipos de arquivo aceitos
  accept: string;
  // Função chamada quando o arquivo for processado
  onFileProcessed: (data: any[]) => void;
  // Função chamada quando os dados forem enviados à API
  onSubmit: (data: any[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  buttonText,
  fileInfoText,
  accept,
  onFileProcessed,
  onSubmit,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileData, setFileData] = useState<any[]>([]);

  // Função para processar o arquivo de Excel
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Pega o primeiro arquivo
    if (file) {
      setFileName(file.name); // Atualiza o nome do arquivo
      processFile(file); // Processa o arquivo
    }
  };

  // Função para processar o arquivo de Excel
  const processFile = (file: File) => {
    const reader = new FileReader(); // Lê o arquivo
    reader.onload = (e) => {
      const ab = e.target?.result;
      if (ab instanceof ArrayBuffer) {
        const wb = XLSX.read(ab, { type: "array" }); // Lê o conteúdo da planilha
        const sheet = wb.Sheets[wb.SheetNames[0]]; // Pega a primeira aba da planilha
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Converte a planilha para um array de objetos
        setFileData(data); // Atualiza o estado com os dados extraídos
        onFileProcessed(data); // Chama a função de callback fornecida
      }
    };
    reader.readAsArrayBuffer(file); // Lê o arquivo como ArrayBuffer
  };

  // Função para enviar os dados para a API
  const handleSubmit = async () => {
    try {
      await onSubmit(fileData); // Chama o método de envio de dados passado como prop
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
    }
  };

  return (
    <div>
      <label className="px-4 py-2 bg-black hover:bg-gray-600 transition-all text-white cursor-pointer">
        {buttonText} <br />
        <small>{fileInfoText}</small>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={accept}
        />
      </label>

      {fileName && (
        <p className="mt-2 text-gray-600">Arquivo selecionado: {fileName}</p>
      )}

      {fileData.length > 0 && (
        <div>
          <h3 className="mt-4">Dados extraídos:</h3>
          <pre>{JSON.stringify(fileData, null, 2)}</pre> {/* Exibe os dados extraídos da planilha */}
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white"
          >
            Enviar para a API
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
