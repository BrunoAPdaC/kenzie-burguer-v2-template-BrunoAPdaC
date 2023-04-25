import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../../Providers/UserContext";

const schema = z
  .object({
    email: z.string().nonempty("Email é obrigatório"),
    password: z
      .string()
      .min(7, "Obrigatório ter no mínimo 7 caracteres")
      .regex(/(?=.*?[#?!@$%^&*-])/, "Obrigatório ter um caracter especial")
      .regex(/(?=.*?[A-Z])/, "Obrigatório ter uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "Obrigatório ter uma letra minúscula"),
    confirmPassword: z.string().nonempty("Confirmação de senha é obrigatório"),
    name: z.string().nonempty("Nome é obrigatório"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "A confirmação de senha tem que ser igual a senha",
    path: ["confirmPassword"],
  });

type IRegister = z.infer<typeof schema>;

interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const RegisterForm = () => {
  const { navigate } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(schema),
  });

  async function handleRegister(data: IRegisterForm) {
    try {
      const response = await api.post("/users", data);
      toast.success("Cadastrao realizado com sucesso");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  }
  console.log(errors);
  return (
    <StyledForm onSubmit={handleSubmit(handleRegister)}>
      <Input
        id="name"
        label={"Nome"}
        error={errors.name?.message}
        register={register("name")}
        type={"name"}
      />
      <Input
        id="email"
        label={"E-mail"}
        error={errors.email?.message}
        register={register("email")}
        type={"email"}
      />
      <Input
        id="password"
        label={"Senha"}
        error={errors.password?.message}
        register={register("password")}
        type={"password"}
      />
      <Input
        id="confirmPassword"
        label={"Confirmar Senha"}
        error={errors.confirmPassword?.message}
        register={register("confirmPassword")}
        type={"password"}
      />
      <StyledButton $buttonSize="default" $buttonStyle="gray">
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
