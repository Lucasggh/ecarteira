import express from "express";
import routes from "./src/routes/index.js";
import cors from "cors";
import { testConnection } from "./src/database/db.js";

const app = express();

app.use(cors({
    origin: ["https://ecarteira-taupe.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
}));

app.use(express.json());
app.use("/api", routes);

if (process.env.NODE_ENV !== "test") {
    app.listen(process.env.PORT, async () => {
        console.log("🚀 Servidor backend no ar!");
        console.log(`Porta do backend: ${process.env.PORT}`);
        await testConnection();
    });
}

export default app;