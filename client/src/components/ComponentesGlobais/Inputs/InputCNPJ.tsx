import { PatternFormat, PatternFormatProps } from "react-number-format"


const InputCNPJ = (props: Partial<PatternFormatProps>) => {
  return (
    <div>
      <label htmlFor="cnpjInput">CNPJ</label>
      <PatternFormat
        format="##.###.###/####-##"
        name="cnpj"
        className="mt-1 mb-4 block w-full px-4 py-2 border border-gray-300 shadow-sm"
        placeholder="##.###.###/####-##"
        aria-label="CNPJ"
      />
    </div>
  )
}

export default InputCNPJ