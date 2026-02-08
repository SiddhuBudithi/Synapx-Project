import FieldTable from "./FieldTable.jsx";

export default function ResultPanel({ result, loading, error }) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="h-4 w-72 rounded bg-slate-200" />
          <div className="h-24 rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-medium">Result</h2>
        <p className="mt-2 text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-medium">Result</h2>
        <p className="mt-2 text-sm text-slate-600">
          Upload a document to see extracted fields and routing.
        </p>
      </div>
    );
  }

  const { recommendedRoute, reasoning, missingFields, extractedFields } = result;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium">Routing Decision</h2>
          <p className="mt-1 text-sm text-slate-600">{reasoning}</p>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          {recommendedRoute}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-slate-900">Missing Fields</h3>
        {missingFields && missingFields.length ? (
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
            {missingFields.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-slate-600">None 🎉</p>
        )}
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-slate-900">Extracted Fields</h3>
        <FieldTable data={extractedFields} />
      </div>
    </div>
  );
}
