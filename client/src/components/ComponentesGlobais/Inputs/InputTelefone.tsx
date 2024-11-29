import { PatternFormat, PatternFormatProps } from "react-number-format"


const InputTelefone = (props: Partial<PatternFormatProps>) => {
  return (
    <div>
      <label htmlFor="telefoneInput">Telefone</label>
      <PatternFormat
        format="(##) #####-####"
        name="telefone"
        className="mt-1 mb-4 block w-full px-4 py-2 border border-gray-300 shadow-sm"
        placeholder="(99) 99999-9999"
        aria-label="Telefone"
      />

    </div>
  )
}

export default InputTelefone