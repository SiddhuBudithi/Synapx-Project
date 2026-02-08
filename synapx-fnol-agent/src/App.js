import { useState } from "react";
import { analyzeFile } from "./api.js";
import UploadCard from "./components/UploadCard.jsx";
import ResultPanel from "./components/ResultPanel.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";


export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onUpload(file) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeFile(file);
      setResult(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* DARK BAND FOR HEADER (so white text is visible) */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-50">
        <Header />
      </div>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-5xl p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">FNOL Claims Processing Agent</h1>
          <p className="text-slate-600">
            Upload an FNOL PDF/TXT to extract fields, detect missing info, and route the claim.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <UploadCard onUpload={onUpload} loading={loading} />
          <ResultPanel result={result} loading={loading} error={error} />
        </div>

        <footer className="mt-10 text-sm text-slate-500">
          Output format: extractedFields, missingFields, recommendedRoute, reasoning.
        </footer>        
      </main>

      <Footer />
    </div>
  );
}
