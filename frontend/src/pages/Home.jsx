import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3067/api",
});

function Home() {
  const location = useLocation();
  const [balance, setBalance] = useState("R$0");
  const [name,setName] = useState("user")
  useEffect(() => {
    const fetchBalance = async () => {
      if (location.pathname === "/home") {
        try {
          const response = await api.get("/balance", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
          setName(response.data.name)
          setBalance(`R$${response.data.balance}`);
          console.log(response.data.balance);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchBalance();
  }, [location.pathname]);

  return (
    <div className="relative">
      <div className="bg-[rgba(250,249,246,0.4)] bg-opacity-40 min-h-screen p-4 w-[70%] mx-auto border-x-2 border-[rgba(250,249,246,0.4)] ">
        <p> Olá {name}</p>
        <div className="bg-[#f8f5f2] w-fit p-2 rounded-md">{balance}</div>
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
