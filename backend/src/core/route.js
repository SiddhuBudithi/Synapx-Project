const INVESTIGATION_KEYWORDS = ["fraud", "inconsistent", "staged"];

export function recommendRoute({ extractedFields, missingFields, inconsistencies }) {
  const desc = (extractedFields?.incident?.description || "").toLowerCase();
  const claimType = (extractedFields?.claimType || "").toLowerCase();
  const estimatedDamage =
    extractedFields?.asset?.estimatedDamage ?? extractedFields?.initialEstimate;

  const found = INVESTIGATION_KEYWORDS.filter((k) => desc.includes(k));
  if (found.length) {
    return {
      recommendedRoute: "Investigation Flag",
      reasoning: `Flagged because description contains: ${found.join(", ")}.`
    };
  }

  if (claimType === "injury") {
    return {
      recommendedRoute: "Specialist Queue",
      reasoning: "Routed to Specialist Queue because claim type is injury."
    };
  }

  if (missingFields.length > 0) {
    return {
      recommendedRoute: "Manual review",
      reasoning:
        `Missing mandatory fields: ${missingFields.join(", ")}.`, 
        // (inconsistencies.length ? ` Inconsistencies: ${inconsistencies.join("; ")}.` : "")
    };
  }

  if (typeof estimatedDamage === "number" && estimatedDamage < 25000) {
    return {
      recommendedRoute: "Fast-track",
      reasoning: `Fast-tracked because estimated damage (${estimatedDamage}) is below 25,000.`
    };
  }

  return {
    recommendedRoute: "Manual review",
    reasoning: "Default route applied."
  };
}
