import express from "express";
import cors from "cors";
import { analyzeRouter } from "./routes/analyze.js";

const app = express();

// If you use CRA proxy, CORS isn't required, but keeping it doesn't hurt.
app.use(cors({
  origin: [
    "http://localhost:3000",
    // "https://your-frontend-domain.com",
  ],
}));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api", analyzeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
