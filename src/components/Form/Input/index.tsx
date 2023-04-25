import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";

interface IInputProps {
  label?: string;
  error?: string;
  id: string;
  type: "email" | "password" | "name";
  register: object;
}

const Input = ({ label, error, type, id, register }: IInputProps) => (
  <div>
    <StyledInputContainer>
      <input type={type} {...register} />
      <label htmlFor={id}>{label}</label>
    </StyledInputContainer>
    <StyledParagraph fontColor="red">{error}</StyledParagraph>
  </div>
);

export default Input;
