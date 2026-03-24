import { useForm } from "react-hook-form";
import { isValidCPF } from "cnpj-cpf-validator";
import isEmail from "validator/lib/isEmail";
function Registrar() {
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
        <div className="w-full">
          <div className="flex w-full gap-3 bg-blue-600 rounded-md p-3 border-2 border-blue-400">
            <label htmlFor="name" className="w-10">
              {" "}
              Nome:{" "}
            </label>

            <input
              id="name"
              type="text"
              name="name"
              {...register("name", {
                required: "Nome é obrigatório",
              })}
              className="bg-blue-300 rounded-sm flex-1 p-1 border-b-3 border-b-blue-900"
              placeholder="Digite seu nome"
            ></input>
          </div>
          <div className="h-3">
            {errors.name?.message && (
              <p className="text-red-500 border-b-red-500 border-b-2 w-fit">
                {errors.name?.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="flex w-full gap-3 bg-blue-600 rounded-md p-3 border-2 border-blue-400">
            <label htmlFor="cpf" className="w-10">
              {" "}
              CPF:{" "}
            </label>
            <input
              type="text"
              name="cpf"
              {...register("cpf", {
                required: "CPF é obrigatório",
                validate: (v) => isValidCPF(v) || "CPF inválido",
              })}
              className="bg-blue-300 rounded-sm flex-1 p-1 border-b-3 border-b-blue-900"
              placeholder="Digite seu CPF"
            ></input>
          </div>
          <div className="h-3">
            {" "}
            {errors.cpf?.message && (
              <p className="text-red-500 border-b-red-500 border-b-2 w-fit">
                {errors.cpf?.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="flex gap-3 w-full bg-blue-600 rounded-md p-3 border-2 border-blue-400">
            <label htmlFor="email" className="w-10">
              {" "}
              Email:{" "}
            </label>
            <input
              type="text"
              name="email"
              className="bg-blue-300 rounded-sm flex-1 p-1 border-b-3 border-b-blue-900"
              {...register("email", {
                required: "Email é obrigatorio",
                validate: (v) => isEmail(v) || "Email é inválido",
              })}
              placeholder="Digite seu email"
            ></input>
          </div>
          <div className="h-3">
          {errors.email?.message && (
            <p className="text-red-500 border-b-red-500 border-b-2 w-fit">
              {errors.email?.message}
            </p>
          )}</div>
        </div>

        <div className="w-full">
          <div className=" bg-blue-600 rounded-md p-3 border-2 border-blue-400 flex flex-col">
            <div className="flex gap-3 w-full">
              <label htmlFor="senha" className="w-10">
                {" "}
                Senha:{" "}
              </label>
              <input
                type="text"
                name="senha"
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
              
            </div><p className="text-[13px] mt-1">
                {" "}
                Senha deve contar 8+ caracteres, maiúscula, minúscula, número e
                especial(#@*&...).
              </p>
            {errors.senha?.message && (
              <p className="text-red-500 border-b-red-500 border-b-2 w-fit ">
                {errors.senha?.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-fit p-2 rounded-md border-blue-400 border-2 bg-blue-600 hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
        >
          Criar conta
        </button>
        <div className="flex flex-col justify-center items-center">
          <p>Já tem uma conta?</p>
          <p className="border-b-blue-950 border-b-2 hover:cursor-pointer flex-1">
            Fazer login
          </p>
        </div>
      </form>
    </div>
  );
}

export default Registrar;
