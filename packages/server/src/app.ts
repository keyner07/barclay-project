import Express, { json, urlencoded } from "express";
import apiRoutes from "./routes/api";
import cors from "cors";

const app = Express();

// Middlewares

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));

// Routes

app.use("/", apiRoutes);

app.get("*", async (req, res) => {
    res.json("404 route not found");
});

export default app;
