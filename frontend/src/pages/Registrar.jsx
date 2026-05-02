import { useForm } from "react-hook-form";
import { isValidCPF } from "cnpj-cpf-validator";
import isEmail from "validator/lib/isEmail";
import InputForm from "../Components/Input.js";
import { useNavigate } from "react-router";
import axios from "axios"
const api = axios.create({
  baseURL: "https://ecarteira.onrender.com/api"
})
function Registrar() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function onsubmit (data) {
    const response = await api.post("/auth/register",
      {
        name:data.name,
        email:data.email,
        cpf:data.cpf,
        password:data.password,
        role:"user"
    })
    console.log(response.data)
    console.log(response.status)
    console.log(response.headers)

  };
  return (
<div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f5f2]">
  <form
    onSubmit={handleSubmit(onsubmit)}
    className="flex flex-col bg-[#ffffff] p-4 rounded-xl border border-[#e5ded8] gap-4 items-center w-100 shadow-md"
  >
    <InputForm label="Nome:" error={errors.name?.message} name="name">
      <input
        type="text"
        {...register("name", { required: "Nome é obrigatório" })}
        className="bg-[#f1ebe5] rounded-sm flex-1 p-2 border-b-2 border-[#d6bfa9]"
        placeholder="Digite seu nome"
      />
    </InputForm>

    <InputForm label="CPF:" name="cpf" error={errors.cpf?.message}>
      <input
        type="text"
        {...register("cpf", {
          required: "CPF é obrigatório",
          validate: (v) => isValidCPF(v) || "CPF inválido",
        })}
        className="bg-[#f1ebe5] rounded-sm flex-1 p-2 border-b-2 border-[#d6bfa9]"
        placeholder="Digite seu CPF"
      />
    </InputForm>

    <InputForm label="Email: " error={errors.email?.message}>
      <input
        type="text"
        className="bg-[#f1ebe5] rounded-sm flex-1 p-2 border-b-2 border-[#d6bfa9]"
        {...register("email", {
          required: "Email é obrigatorio",
          validate: (v) => isEmail(v) || "Email é inválido",
        })}
        placeholder="Digite seu email"
      />
    </InputForm>

    <InputForm
      label="Senha: "
      name="password"
      error={errors.password?.message}
      info={
        <p className="text-[13px] mt-1 text-[#6b6b6b]">
          Senha deve conter 8+ caracteres, maiúscula, minúscula, número e especial.
        </p>
      }
    >
      <input
        type="text"
        className="bg-[#f1ebe5] rounded-sm flex-1 p-2 border-b-2 border-[#d6bfa9]"
        {...register("password", {
          required: "Senha é obrigatoria",
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
            message: "Senha fraca",
          },
        })}
        placeholder="Digite sua senha"
      />
    </InputForm>

    <button
      type="submit"
      className="w-fit px-4 py-2 rounded-md border border-[#d6bfa9] bg-[#d6bfa9] text-white hover:bg-[#c9ad94] transition-all duration-300 hover:scale-105"
    >
      Criar conta
    </button>

    <div className="flex flex-col justify-center items-center text-[#3e3e3e]">
      <p>Já tem uma conta?</p>
      <button
        type="button"
        className="border-b border-[#c9ad94] hover:cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Realizar login
      </button>
    </div>
  </form>
</div>
  );
}

export default Registrar;
