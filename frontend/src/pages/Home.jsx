import { useEffect, useState } from "react";
import axios from "axios";
import Deposit from "../Components/Deposit";
import { useNavigate } from "react-router-dom";
const api = axios.create({
  baseURL: "https://ecarteira.onrender.com/api",
});
const buttons = [
  "Sacar","Depositar","Transferir"
]
function Home() {
  const [balance, setBalance] = useState("R$0");
  const [name,setName] = useState("user")
  const navigate = useNavigate()
  const [deposit,setDeposit] = useState(false)
  const fetchBalance = async () => { 
      console.log("fetchBalance")
        try {
            const response = await api.get("/transactions", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            });
            console.log("respondeu api")
            setName(localStorage.getItem("userName"))
            setBalance(`R$${response.data.balance ? response.data.balance : 0}`);
            console.log(response.data.balance);
        } catch (err) {
          if(err.response.data.err) navigate("/login")
          
        }
    };
  useEffect(() => {
    fetchBalance();
  }, []);

  async function HandleButtons(button){
    console.log(button)
    if(button == "Depositar"){
      setDeposit(!deposit)
    }
  }

  return (
    <div className="relative min-h-screen cursor-default">

      <div className="min-h-screen backdrop-blur-md bg-[rgba(250,249,246,0.1)] bg-opacity-40 border-x-3 border-[rgba(250,249,246,0.4)] w-[70%] mx-auto">
        <div className="h-fit w-full flex items-center jus=">
            {deposit ?(<Deposit onClick={()=>{setDeposit(!deposit); fetchBalance()}}/>) : (<div className="h-fit w-full grid grid-cols-2 grid-rows-[auto_auto] items-start justify-items-center p-20 gap-20">
              <p className="text-[50px]"> Olá {name}</p>
              <div className="bg-[rgba(248,245,242,0)] border-3 border-[rgba(250,249,246,0.4)] w-fit p-2 rounded-md h-20 text-[40px] text-center  hover:shadow-[0px_10px_21px_-7px_rgba(255,255,255,0.5)] transition-all hover:scale-105 duration-400 hover:bg-[rgba(248,245,242,0.1)]">{balance}</div>
              <ul className="col-span-2 bg-[rgba(248,245,242,0)] border-3 border-[rgba(250,249,246,0.4)] rounded-md flex flex-row gap-10 p-5 h-40">
                {buttons.map((button,index)=>{
                  return(
                      <li key={index} className="bg-[rgba(248,245,242,0)]  border-3 border-[rgba(250,249,246,0.4)] rounded-md p-2 w-40 flex items-center justify-center transition-all hover:scale-105 duration-400 hover:shadow-[0px_10px_21px_-7px_rgba(255,255,255,0.5)] hover:cursor-pointer hover:bg-[rgba(248,245,242,0.1)]">
                        <button className="text-[30px] hover:cursor-pointer" onClick={(e) =>{HandleButtons(e.currentTarget.innerText)}}>
                          {button}
                        </button>
                      </li>
                  )
                })}
              </ul>
            </div>)}
            
        </div>
      </div>















      <video
        src="background.mp4"
        autoPlay
        loop
        muted
        className="w-full absolute top-0 left-0 h-full -z-10 object-cover"
      />
    </div>
  );
}

export default Home;
