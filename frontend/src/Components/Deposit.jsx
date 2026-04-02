import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
const api = axios.create({
  baseURL: "http://localhost:3067/api",
});
function Deposit(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [keydown, setKeyDown] = useState("false");
  async function handleDeposit(data) {
    const res = await api.post(
      "/deposit",
      {
        amount: data.amount,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    );
  }

  return (
    <div
      className="absolute flex items-center justify-center top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2
   min-w-screen min-h-screen"
    >
      
      <form
        onSubmit={handleSubmit(handleDeposit)}
        className="relative bg-[rgba(248,245,242,0)] border-3 border-[rgba(250,249,246,0.4)] flex flex-col items-center justify-around w-70 h-50 rounded-md p-10 gap-3 "
      >
        <button onClick={props.onClick} type="button" className="absolute top-0 right-0 bg-[rgba(248,242,242,0.1)] px-2 py-1 rounded-md hover:bg-[rgba(184,7,1,0.37)] border-3 border-[rgba(250,249,246,0.4)]">
          {"<-"}
      </button>
        <input
          type="text"
          placeholder="Insira o valor"
          {...register("amount", {
            required: "Valor é obrigatório",
            pattern: /^[0-9]+$/,
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\D/g, ""); // remove tudo que não é número
            },
          })}
          className={`bg-[rgba(248,245,242,0.1)] focus:outline-none border-3 border-[rgba(250,249,246,0.4)] rounded-md px-4 py-2
        transition-shadow duration-300
        ${keydown ? "shadow-[0px_3px_12px_6px_rgba(255,255,255,0.2)]" : ""}`}
          onFocus={() => {
            setKeyDown(true);
          }}
          onBlur={() => {
            setKeyDown(false);
          }}
        ></input>
        <div className="h-8">{errors.amount?.message}</div>
        <button className="bg-[rgba(248,245,242,0)] border-3 border-[rgba(250,249,246,0.4)] rounded-md px-4 py-2 text-[30px] transition-all hover:scale-105 duration-400 hover:shadow-[0px_10px_21px_-7px_rgba(255,255,255,0.5)] hover:cursor-pointer hover:bg-[rgba(248,245,242,0.1)]">
          Depositar
        </button>
      </form>
    </div>
  );
}

export default Deposit;
