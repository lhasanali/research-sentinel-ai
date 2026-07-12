async def Reviewer_agent(
    intake_result,
    ethics_result,
    citation_result
):

    final_score = 80
    reasons = []

    # Ethics impact
    if ethics_result["risk_level"] == "Medium":
        final_score -= 15
        reasons.append("Ethical concerns detected in research context")
    else:
        reasons.append("No ethical issues detected")

    # Citation impact
    citation_score = citation_result["citation_score"]

    if citation_score > 70:
        reasons.append("High citation relevance and research quality")
    else:
        reasons.append("Moderate citation strength")

    final_score += (citation_score - 50) // 5

    # Decision logic
    if final_score >= 85:
        decision = "Accept"
    elif final_score >= 70:
        decision = "Minor Revision"
    else:
        decision = "Major Revision"

    # 🧠 EXPLAINABILITY LAYER
    explanation = " | ".join(reasons)

    return {
        "agent": "Reviewer Agent",
        "score": final_score,
        "decision": decision,
        "reason": explanation,
        "confidence": 0.92
    }