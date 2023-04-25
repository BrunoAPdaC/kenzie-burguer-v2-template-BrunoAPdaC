import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../../Providers/UserContext";

const schema = z.object({
  email: z.string().nonempty("E-mail é obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
});

type ILogin = z.infer<typeof schema>;

interface newData {
  email: string;
  password: string;
}
interface IuserLogin {
  id: string;
  name: string;
  email: string;
}

function LoginForm() {
  const { navigate } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(schema),
  });

  async function handleLogin(data: ILogin) {
    try {
      const response = await api.post("/login", data);
      const tokenA = response.data.accessToken;
      console.log(tokenA);
      toast.success("Login feito com sucesso");
      localStorage.setItem("@TokenUser", tokenA);
      navigate("/shop");
    } catch (error: any) {
      toast.error(error.response.data);
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(handleLogin)}>
      <Input
        type="email"
        id="email"
        register={register("email")}
        error={errors.email?.message}
        label={"E-mail"}
      />
      <Input
        label={"Senha"}
        id="Senha"
        type="password"
        register={register("password")}
        error={errors.password?.message}
      />
      <StyledButton $buttonSize="default" $buttonStyle="green">
        Entrar
      </StyledButton>
    </StyledForm>
  );
}

export default LoginForm;
