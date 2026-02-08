function matchOne(text, patterns) {
  for (const p of patterns) {
    const m = text.match(p);
    if (m && m[1]) return m[1].trim();
  }
  return undefined;
}

function matchNumber(text, patterns) {
  const s = matchOne(text, patterns);
  if (!s) return undefined;
  const cleaned = s.replace(/,/g, "").replace(/[^\d.]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : undefined;
}

function matchMany(text, patterns) {
  const out = [];
  for (const p of patterns) {
    const all = [...text.matchAll(p)];
    for (const m of all) if (m && m[1]) out.push(m[1].trim());
  }
  return [...new Set(out)].filter(Boolean);
}

export function extractFields(text) {
  const policyNumber = matchOne(text, [
    /POLICY NUMBER[:\s]*([A-Z0-9\-\/]+)/i,
    /Policy\s*Number[:\s]*([A-Z0-9\-\/]+)/i
  ]);

  const policyholderName = matchOne(text, [
    /Policyholder Name[:\s]*([A-Z][^\n]+)/i,
    /NAME OF INSURED.*?\s([A-Z][A-Za-z ,.'-]{2,})/i
  ]);

  const incidentDate = matchOne(text, [
    /Date of Loss(?: and Time)?[:\s]*([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4})/i,
    /Incident Date[:\s]*([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4})/i
  ]);

  const incidentTime = matchOne(text, [
    /Time of Loss[:\s]*([0-9]{1,2}:[0-9]{2}\s*(?:AM|PM)?)/i
  ]);

  const location = matchOne(text, [
    /Location of Loss[:\s]*([^\n]+)/i,
    /Incident Location[:\s]*([^\n]+)/i
  ]);

  const description = matchOne(text, [
    /Description of Accident[:\s]*([\s\S]{0,500})/i,
    /Incident Description[:\s]*([\s\S]{0,500})/i
  ]);

  const descriptionClean = description
    ? description.split("\n").slice(0, 6).join(" ").trim()
    : undefined;

  const email = matchOne(text, [/\b([^\s\n]+@[^\s\n]+\.[A-Za-z]{2,})\b/]);

  const phone = matchOne(text, [
    /\bPhone[:\s]*([0-9\-\+\(\) ]{8,})/i,
    /\bPHONE\b.*?([0-9\-\+\(\) ]{8,})/i
  ]);

  const claimant = matchOne(text, [
    /Claimant[:\s]*([A-Z][^\n]+)/i,
    /REPORTED BY[:\s]*([A-Z][^\n]+)/i
  ]);

  const thirdParties = matchMany(text, [
    /Third Party[:\s]*([A-Z][^\n]+)/gi
  ]);

  const assetType = matchOne(text, [
    /Asset Type[:\s]*([^\n]+)/i,
    /VEHICLE TYPE[:\s]*([^\n]+)/i
  ]);

  const assetId = matchOne(text, [
    /Asset ID[:\s]*([A-Z0-9\-]+)/i,
    /\bV\.I\.N\.[:\s]*([A-HJ-NPR-Z0-9]{11,17})/i
  ]);

  const estimatedDamage = matchNumber(text, [
    /Estimated Damage[:\s]*([$₹€]?\s*[0-9,]+(?:\.[0-9]{1,2})?)/i,
    /ESTIMATE AMOUNT[:\s]*([$₹€]?\s*[0-9,]+(?:\.[0-9]{1,2})?)/i
  ]);

  const claimType =
    matchOne(text, [/Claim Type[:\s]*([^\n]+)/i]) ||
    (/\binjur(y|ies)\b/i.test(text) ? "injury" : undefined);

  const attachments = [];
  if (/\battach(ed|ment|ments)\b/i.test(text)) attachments.push("mentioned_attachments");
  if (/\bphoto(s)?\b/i.test(text)) attachments.push("photos");
  if (/\bpolice report\b/i.test(text)) attachments.push("police_report");

  const initialEstimate =
    matchNumber(text, [/Initial Estimate[:\s]*([$₹€]?\s*[0-9,]+(?:\.[0-9]{1,2})?)/i]) ||
    estimatedDamage;

  return {
    policyNumber,
    policyholderName,
    incident: {
      date: incidentDate,
      time: incidentTime,
      location,
      description: descriptionClean
    },
    parties: {
      claimant,
      thirdParties: thirdParties.length ? thirdParties : undefined,
      contactDetails: { phone, email }
    },
    asset: {
      assetType,
      assetId,
      estimatedDamage
    },
    claimType,
    attachments: attachments.length ? attachments : undefined,
    initialEstimate
  };
}
