import { useForm } from "react-hook-form";
import { isValidCPF } from "cnpj-cpf-validator";
function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({mode:"onChange"});

  const onsubmit = (data) => {
    console.log(data);
  };
  const cpf = watch("cpf")
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <label htmlFor="name"> Nome </label>
        <input
          id="name"
          type="text"
          name="name"
          {...register("name", {
            required: "Nome é obrigatório",
          })}
        ></input>
        {errors.name?.message && <p>{errors.name?.message}</p>}
        <label htmlFor="cpf"> Cpf </label>
        <input
          type="text"
          name="cpf"
          {...register("cpf", {
            required: "Cpf é obrigatório",
            validate: (v) => isValidCPF(v) || "CPF inválido"
          })}
        ></input>
        {errors.cpf?.message && <p>{errors.cpf?.message}</p>}
        {!errors.cpf && cpf && <p>cpf valido</p>}
        <label htmlFor="email"> email </label>
        <input type="email" name="email"></input>
        <button type="submit">criar conta</button>
      </form>
    </div>
  );
}

export default Login;
