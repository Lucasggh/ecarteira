import { useForm } from "react-hook-form";
import axios from "axios"
import isEmail from "validator/lib/isEmail";
import InputForm from "../Components/Input";
import { useNavigate } from "react-router";
import { useState } from "react";
const api = axios.create({
  baseURL:"http://localhost:3067/api"
})
function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error,setError] = useState(false)

async function onsubmit(data) {
  try {
    const response = await api.post("/login", 
    { email: data.email,
      password: data.password
    }
  );
    const token = response.data.data.token;
    localStorage.setItem("token",token)
    setError(false)
    console.log(response.data);
    navigate("/app/home")
  } catch (err) {
    console.error(err);
    setError(true)
  }
}
    return ( 
<div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f5f2]">
  <form
    onSubmit={handleSubmit(onsubmit)}
    className="flex flex-col bg-[#ffffff] p-4 rounded-xl border border-[#e5ded8] gap-4 items-center w-[400px] relative shadow-md"
  >
    <InputForm label="Email: " name="cpf" error={errors.email?.message}>
      <input
        type="text"
        className="bg-[#f1ebe5] rounded-sm flex-1 p-2 border-b-2 border-[#d6bfa9] text-[#3e3e3e]"
        {...register("email", {
          required: "Email é obrigatorio",
          validate: (v) => isEmail(v) || "Email é inválido",
        })}
        placeholder="Digite seu email"
      />
    </InputForm>

    <InputForm label="Senha: " error={errors.password?.message}>
      <input
        type="text"
        className="bg-[#f1ebe5] rounded-sm flex-1 p-2 border-b-2 border-[#d6bfa9] text-[#3e3e3e]"
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

    {error ? <p className="absolute bottom-32 text-red-400 text-sm">
      Credenciais inválidas, Email e Senha estão corretos?
    </p> : <div className="absolute"></div>}

    <button
      type="submit"
      className="w-fit px-4 py-2 rounded-md border border-[#d6bfa9] bg-[#d6bfa9] text-white hover:bg-[#c9ad94] transition-all duration-300 hover:scale-105"
    >
      Entrar
    </button>

    <div className="flex flex-col justify-center items-center text-[#3e3e3e]">
      <p>Não possui uma conta?</p>
      <button
        type="button"
        className="border-b border-[#c9ad94] hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        Realizar cadastro
      </button>
    </div>
  </form>
</div>
  );
}

export default Login;