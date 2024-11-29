import { PatternFormat, PatternFormatProps } from "react-number-format"


const InputCPF = (props: Partial<PatternFormatProps>) => {
  return (
    <div>
      <label htmlFor="cpfInput">CPF</label>
      <PatternFormat
        format="###.###.###-##"
        name="cpf"
        className="mt-1 mb-4 block w-full px-4 py-2 border border-gray-300 shadow-sm"
        placeholder="999.999.999-99"
        aria-label="CPF"
      />

    </div>
  )
}

export default InputCPF