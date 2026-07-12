async def Citation_agent(title: str, abstract: str):

    text = f"{title} {abstract}".lower()

    score = 50

    if "research" in text:
        score += 10

    if "study" in text:
        score += 10

    if "analysis" in text:
        score += 10

    if "evaluation" in text:
        score += 10

    return {
        "agent": "Citation Agent",
        "citation_score": score,
        "confidence": 0.85
    } 