import express from "express";
import cors from "cors";
import morgan from "morgan";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";
import * as programController from "./controllers/programController.js";
import * as workoutController from "./controllers/workoutController.js";
import * as sessionController from "./controllers/sessionController.js";
import * as exerciseController from "./controllers/exerciseController.js";
import * as exerciseLogController from "./controllers/exerciseLogController.js";

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
app.get("/api/programs/public", programController.getPublic)
app.get("/api/programs/current", programController.getCurrent);
app.get("/api/programs/archived", programController.getArchived);
app.get("/api/programs/nonarchived", programController.getNonArchived);
app.get("/api/programs/:programId", programController.getOne);
app.post("/api/programs", programController.create);
app.patch("/api/programs/:programId/name", programController.updateName);
app.patch("/api/programs/:programId/active", programController.setActive);
app.patch("/api/programs/:programId/inactive", programController.setInactive);
app.patch("/api/programs/:programId/public", programController.makePublic);
app.patch("/api/programs/:programId/private", programController.makePrivate);
app.patch("/api/programs/:programId/archive", programController.archive);
app.delete("/api/programs", programController.deleteAll);
app.delete("/api/programs/:programId");

app.get("/api/workouts", workoutController.getAll);
app.get("/api/workouts/program/:programId/day", workoutController.getByDay);
app.get("/api/workouts/program/:programId", workoutController.getByProgram);
app.get("/api/workouts/:workoutId", workoutController.getOne);
app.post("/api/workouts/:programId", workoutController.create);
app.delete("/api/workouts", workoutController.deleteAll);
app.delete("/api/workouts/:workoutId", workoutController.deleteOne);

app.get("/api/sessions", sessionController.getAll);
app.get("/api/sessions/workout/:workoutId", sessionController.getByWorkout);
app.get("/api/sessions/:sessionId", sessionController.getOne);
app.post("/api/sessions/:workoutId", sessionController.create);
app.patch("/api/sessions/date", sessionController.changeDate);
app.patch("/api/sessions/notes", sessionController.addNotes);
app.delete("/api/sessions", sessionController.deleteAll);
app.delete("/api/sessions/:sessionId", sessionController.deleteOne);

app.get("/api/exercises", exerciseController.getAll);
app.get("/api/exercises/workout/:workoutId", exerciseController.getByWorkout);
app.get("/api/exercises/:exerciseId", exerciseController.getOne);
app.post("/api/exercises/:workoutId", exerciseController.create);
app.patch("/api/exercises/:exerciseId/modify", exerciseController.modify);
app.patch("/api/exercises/:exerciseId/name", exerciseController.changeName);
app.patch("/api/exercises/:exerciseId/position", exerciseController.changePosition);
app.delete("/api/exercises", exerciseController.deleteAll);
app.delete("/api/exercises/:exerciseId");

app.get("/api/logs", exerciseLogController.getAll);
app.get("/api/logs/session/:sessionId", exerciseLogController.getBySession);
app.get("/api/logs/exercise/:exerciseId", exerciseLogController.getByExercise);
app.get("/api/logs/:exerciseLogId", exerciseLogController.getOne);
app.post("/api/logs", exerciseLogController.create);
app.patch("/api/logs/:exerciseLogId", exerciseLogController.modify);
app.delete("/api/logs", exerciseLogController.deleteAll);
app.delete("/api/logs/:exerciseLogId", exerciseLogController.deleteOne);

export default app;