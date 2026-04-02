import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3067/api",
});
const buttons = [
  "sacar","depositar","transferir"
]
function Home() {
  const location = useLocation();
  const [balance, setBalance] = useState("R$0");
  const [name,setName] = useState("user")


  useEffect(() => {
    const fetchBalance = async () => { {
        try {
          const response = await api.get("/balance", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
          setName(localStorage.getItem("userName"))
          setBalance(`R$${response.data.balance}`);
          console.log(response.data.balance);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="relative">



      <div className="bg-[rgba(250,249,246,0.2)] bg-opacity-40 min-h-screen p-4 w-[70%] mx-auto border-x-3 border-[rgba(250,249,246,0.4)] grid grid-cols-2 justify-items-center p-20">
          <p className="text-[50px]"> Olá {name}</p>
          <div className="bg-[rgba(248,245,242,0.1)] w-fit p-2 rounded-md h-20 text-[40px] text-center border-3 border-[rgba(250,249,246,0.4)]">RS:9999999</div>

          <ul className="col-span-2 bg-[rgba(248,245,242,0.1)] border-3 border-[rgba(250,249,246,0.4)] rounded-md flex flex-row gap-10 p-5 h-40">
            {buttons.map((button,index)=>{
              return(
                  <li key={index} className="bg-[rgba(248,245,242,0.1)] border-3 border-[rgba(250,249,246,0.4)] rounded-md p-2 w-40 flex itens-center justify-center transition-all hover:scale-105 duration-400 hover:shadow-[0px_10px_21px_-7px_rgba(0,0,0,0.5)]">
                    <button className="text-[30px]">
                      {button}
                    </button>
                  </li>
              )
            })}
          </ul>
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
