function flatten(obj, prefix = "", out = []) {
  if (obj == null) return out;

  if (typeof obj !== "object") {
    out.push({ k: prefix, v: String(obj) });
    return out;
  }

  if (Array.isArray(obj)) {
    out.push({ k: prefix, v: obj.join(", ") });
    return out;
  }

  for (const [k, v] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flatten(v, next, out);
    else out.push({ k: next, v: Array.isArray(v) ? v.join(", ") : String(v ?? "") });
  }
  return out;
}

export default function FieldTable({ data }) {
  const rows = flatten(data).filter((r) => r.v && r.v !== "undefined" && r.k);

  return (
    <div className="mt-2 max-h-64 overflow-auto rounded-xl ring-1 ring-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 bg-slate-50 text-xs text-slate-600">
          <tr>
            <th className="px-3 py-2 font-medium">Field</th>
            <th className="px-3 py-2 font-medium">Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((r) => (
              <tr key={r.k} className="border-t border-slate-100">
                <td className="px-3 py-2 font-mono text-xs text-slate-700">{r.k}</td>
                <td className="px-3 py-2 text-slate-900">{r.v}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-3 py-3 text-slate-600" colSpan={2}>
                No fields extracted yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
