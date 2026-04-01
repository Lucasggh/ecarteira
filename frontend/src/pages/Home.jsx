import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3067/api",
});

function Home() {
  const location = useLocation();
  const [balance, setBalance] = useState("R$0");

  useEffect(() => {
    const fetchBalance = async () => {
      if (location.pathname === "/app/home") { // ajuste para sua rota real
        try {
          const response = await api.get("/balance", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
          setBalance(`R$${response.data.balance}`);
          console.log(response.data.balance)
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchBalance();
  }, [location.pathname]);

  return <div className="bg-[#f8f5f2] min-h-screen">{balance}</div>;
}

export default Home;