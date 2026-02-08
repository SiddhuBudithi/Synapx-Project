const API_BASE = process.env.REACT_APP_API_BASE || "";

export async function analyzeFile(file) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Failed to analyze (${res.status})`);
  }
  return res.json();
}
