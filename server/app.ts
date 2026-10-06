import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.get("/api", (req, res) => {
    res.send({ message: "test" });
});

export default app;