import express from "express";
import cors from "cors";
import morgan from "morgan";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(morgan("dev"));

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.use(async (req, res, next) => {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (!session) {
        return next();
    }
    (req as any).userId = session.user.id;
    return next();
});

app.use("/api", (req, res, next) => {
    const userId = (req as any).userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    return next();
});


app.get("/api", (req, res) => {
    res.send({ message: "test" });
});

export default app;