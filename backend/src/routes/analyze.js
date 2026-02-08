import { Router } from "express";
import multer from "multer";
import { createRequire } from "module";

import { normalizeText } from "../core/normalize.js";
import { extractFields } from "../core/extract.js";
import { validateFields } from "../core/validate.js";
import { recommendRoute } from "../core/route.js";

const require = createRequire(import.meta.url);

// ✅ pdf-parse can export in different shapes depending on version.
// This safely finds the actual function.
const pdfParseModule = require("pdf-parse");
const pdfParse =
  typeof pdfParseModule === "function"
    ? pdfParseModule
    : typeof pdfParseModule?.default === "function"
    ? pdfParseModule.default
    : typeof pdfParseModule?.pdfParse === "function"
    ? pdfParseModule.pdfParse
    : typeof pdfParseModule?.parse === "function"
    ? pdfParseModule.parse
    : null;

export const analyzeRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

analyzeRouter.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filename = (req.file.originalname || "").toLowerCase();
    
    // const isPdf = filename.endsWith(".pdf");
    const isPdf = req.file.originalname.toLowerCase().endsWith(".pdf");
    const isTxt = filename.endsWith(".txt");

    if (!isPdf && !isTxt) {
      return res.status(400).json({ error: "Only PDF or TXT supported" });
    }

    // ✅ Fail fast with a helpful message if pdf-parse is still not resolved
    if (isPdf && typeof pdfParse !== "function") {
      const keys = pdfParseModule && typeof pdfParseModule === "object"
        ? Object.keys(pdfParseModule)
        : [];
      return res.status(500).json({
        error: `pdf-parse export is not a function. Available keys: ${keys.join(", ")}`,
      });
    }

    let rawText = "";
    if (isPdf) {
      const parsed = await pdfParse(req.file.buffer);
      rawText = parsed?.text || "";
    } else {
      rawText = req.file.buffer.toString("utf-8");
    }

    const normalized = normalizeText(rawText);
    const extractedFields = extractFields(normalized);
    const { missingFields, inconsistencies } = validateFields(extractedFields);

    const { recommendedRoute, reasoning } = recommendRoute({
      extractedFields,
      missingFields,
      inconsistencies,
    });

    return res.json({
      extractedFields,
      missingFields,
      recommendedRoute,
      reasoning,
    });
  } catch (err) {
    console.error("Analyze error:", err);
    return res.status(500).json({ error: err?.message || "Failed to analyze document" });
  }
});
