async def Ethics_agent(title: str, abstract: str):

    text = f"{title} {abstract}".lower()

    issues = []

    if "human" in text:
        issues.append(
            "Human subjects detected"
        )

    if "medical" in text:
        issues.append(
            "Medical content detected"
        )

    if "patient" in text:
        issues.append(
            "Patient-related data detected"
        )

    risk_level = "Low"

    if len(issues) > 0:
        risk_level = "Medium"

    return {
        "agent": "Ethics Agent",
        "risk_level": risk_level,
        "issues": issues,
        "confidence": 0.88
    } 