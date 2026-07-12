from typing import Dict

async def Intake_agent(title: str, abstract: str) -> Dict[str, object]:
    text = f"{title} {abstract}".lower()
    field = "General Research"

    if "deep learning" in text or "machine learning" in text:
        field = "Artificial Intelligence"
    elif "cybersecurity" in text:
        field = "Cybersecurity"

    keywords = []
    possible_keywords = [
        "deep learning",
        "machine learning",
        "optimization",
        "cybersecurity",
        "classification",
    ]
    for keyword in possible_keywords:
        if keyword in text:
            keywords.append(keyword)

    return {
        "agent": "intake agent",
        "field": field,
        "keywords": keywords,
        "confidence": 0.91,
    }
