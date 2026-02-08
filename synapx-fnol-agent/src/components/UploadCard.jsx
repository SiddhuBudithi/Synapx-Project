import { useRef } from "react";

export default function UploadCard({ onUpload, loading }) {
  const inputRef = useRef(null);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-lg font-medium">Upload FNOL</h2>
      <p className="mt-1 text-sm text-slate-600">Supported: .pdf, .txt (max 10MB)</p>

      <input
        ref={inputRef}
        className="mt-4 block w-full text-sm"
        type="file"
        accept=".pdf,.txt"
        disabled={loading}
        onChange={(e) => {
          const f = e.target.files && e.target.files[0];
          if (f) onUpload(f);
        }}
      />

      <button
        className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        disabled={loading}
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        {loading ? "Analyzing..." : "Choose file"}
      </button>

      <p className="mt-3 text-xs text-slate-500">
        Tip: upload a sample FNOL PDF (like an ACORD loss notice) to demo the end-to-end flow.
      </p>
    </div>
  );
}
