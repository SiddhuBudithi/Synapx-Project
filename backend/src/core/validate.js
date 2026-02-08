const MANDATORY_FIELDS = [
  "policyNumber",
  "policyholderName",
  "incident.date",
  "incident.location",
  "incident.description",
  "claimType",
  "attachments",
  "initialEstimate"
];

function getPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export function validateFields(fields) {
  const missingFields = [];
  const inconsistencies = [];

  for (const key of MANDATORY_FIELDS) {
    const val = getPath(fields, key);
    const missing =
      val === undefined ||
      val === null ||
      (typeof val === "string" && val.trim() === "") ||
      (Array.isArray(val) && val.length === 0);

    if (missing) missingFields.push(key);
  }

  const dmg = fields?.asset?.estimatedDamage;
  if (dmg !== undefined && (dmg < 0 || dmg > 1_000_000_000)) {
    inconsistencies.push("asset.estimatedDamage looks unrealistic");
  }

  const ie = fields?.initialEstimate;
  if (ie !== undefined && (ie < 0 || ie > 1_000_000_000)) {
    inconsistencies.push("initialEstimate looks unrealistic");
  }

  return { missingFields, inconsistencies };
}
