import express from "express";
import cors from "cors";
import morgan from "morgan";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";
import * as programController from "./controllers/programController.js";

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


app.get("/api/programs", programController.getAll);
app.get("/api/programs/current", programController.getCurrent);
app.get("/api/programs/archived", programController.getArchived);
app.get("/api/programs/nonarchived", programController.getNonArchived);
app.get("/api/programs/:programId", programController.getOne);
app.post("/api/programs", programController.create);
app.patch("/api/programs/:programId/name", programController.updateName);
app.patch("/api/programs/:programId/active", programController.setActive);
app.patch("/api/programs/:programId/inactive", programController.setInactive);
app.patch("/api/programs/:programId", programController.archive);
app.delete("/api/programs", programController.deleteAll);
app.delete("/api/programs/:programId");

export default app;