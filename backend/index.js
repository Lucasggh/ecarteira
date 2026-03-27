import "dotenv/config";
import express from "express";
import routes from "./src/routes.js";
import cors from "cors"
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api", routes)

app.listen(process.env.SERVER_PORT, () => {
    console.log("🚀 Servidor backend no ar!")
    console.log(`Porta do backend: ${process.env.SERVER_PORT}`)
})