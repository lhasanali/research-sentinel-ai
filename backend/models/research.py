from pydantic import BaseModel

class ResearchInput(BaseModel):
    title: str
    abstract: str
