
import express from "express";
import routes from "./src/routes/index.js";
import cors from "cors"
const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json())
app.use("/api", routes)

if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.SERVER_PORT, () => {
        console.log("🚀 Servidor backend no ar!")
        console.log(`Porta do backend: ${process.env.SERVER_PORT}`)
    });
}

export default app;