import { useForm } from "react-hook-form";
import { isValidCPF } from "cnpj-cpf-validator";
import isEmail from "validator/lib/isEmail";
import InputForm from "../Components/Input";
import { useNavigate } from "react-router";
function Registrar() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-950">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex flex-col bg-blue-700 p-3 rounded-xl border-3 border-blue-900 gap-4 items-center w-[400px]"
      >
        <InputForm label="Nome:" error={errors.name?.message} name="name">
          <input
            type="text"
            {...register("name", {
              required: "Nome é obrigatório",
            })}
            className="bg-blue-300 rounded-sm flex-1 p-1 border-b-3 border-b-blue-900"
            placeholder="Digite seu nome"
          ></input>
        </InputForm>

        <InputForm label="CPF:" name="cpf" error={errors.cpf?.message}>
          <input
            type="text"
            {...register("cpf", {
              required: "CPF é obrigatório",
              validate: (v) => isValidCPF(v) || "CPF inválido",
            })}
            className="bg-blue-300 rounded-sm flex-1 p-1 border-b-3 border-b-blue-900"
            placeholder="Digite seu CPF"
          ></input>
        </InputForm>

        <InputForm label="Email: " name="cpf" error={errors.email?.message}>
          <input
            type="text"
            className="bg-blue-300 rounded-sm flex-1 p-1 border-b-3 border-b-blue-900"
            {...register("email", {
              required: "Email é obrigatorio",
              validate: (v) => isEmail(v) || "Email é inválido",
            })}
            placeholder="Digite seu email"
          ></input>
        </InputForm>

        <InputForm label="Senha: " name="password" error={errors.senha?.message} info={            <p className="text-[13px] mt-1">
              {" "}
              Senha deve contar 8+ caracteres, maiúscula, minúscula, número e
              especial(#@*&...).
            </p>}>
          <input
            type="text"
            className="bg-blue-300 rounded-sm flex-1 p-1 border-b-3 border-b-blue-900"
            {...register("senha", {
              required: "Senha é obrigatoria",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message: "Senha fraca",
              },
            })}
            placeholder="Digite sua senha"
          ></input>
        </InputForm>

        <button
          type="submit"
          className="w-fit p-2 rounded-md border-blue-400 border-2 bg-blue-600 hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
        >
          Criar conta
        </button>
        <div className="flex flex-col justify-center items-center">
          <p>Já tem uma conta?</p>
          <button type="button" className="border-b-blue-950 border-b-2 hover:cursor-pointer flex-1" onClick={() => navigate("/login")}>
            Realizar login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registrar;
