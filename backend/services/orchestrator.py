import os
import json
from typing import Dict, Any, List
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, END

class GraphState(TypedDict):
    title: str
    abstract: str
    intake_analysis: str
    ethics_analysis: str
    citation_analysis: str
    pipeline_results: List[Dict[str, Any]]
    collaboration_logs: List[Dict[str, Any]]

class Orchestrator:
    def __init__(self):
        # تهيئة عميل الـ LLM الفعلي من مكتبة LangChain OpenAI
        # تأكد من وجود OPENAI_API_KEY في ملف .env الخاص بك
        from langchain_openai import ChatOpenAI
        self.llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)
        
        # بناء الـ State Machine باستخدام LangGraph
        workflow = StateGraph(GraphState)
        
        workflow.add_node("intake", self.intake_node)
        workflow.add_node("ethics", self.ethics_node)
        workflow.add_node("citation", self.citation_node)
        workflow.add_node("reviewer", self.reviewer_node)
        
        workflow.set_entry_point("intake")
        workflow.add_edge("intake", "ethics")
        workflow.add_edge("ethics", "citation")
        workflow.add_edge("citation", "reviewer")
        workflow.add_edge("reviewer", END)
        
        self.app = workflow.compile()

    # --- 1. Intake Agent Node (التصنيف الفعلي) ---
    async def intake_node(self, state: GraphState) -> Dict[str, Any]:
        prompt = f"""
        You are the Intake Agent for an academic peer-review multi-agent system.
        Analyze the following research title and abstract. Classify its computer science domain and output a JSON response.
        
        Title: {state['title']}
        Abstract: {state['abstract']}
        
        Respond ONLY with a valid JSON object matching this structure:
        {{
            "category": "Domain Name",
            "confidence": 0.95,
            "reason": "Brief reason for classification"
        }}
        """
        response = await self.llm.ainvoke(prompt)
        data = json.loads(response.content)
        
        log = {"from": "Intake Agent", "message": f"Classified research domain under: {data['category']}"}
        result = {
            "agent": "Intake Agent",
            "confidence": data['confidence'],
            "status": "Success",
            "score": 90,
            "reason": data['reason']
        }
        return {
            "intake_analysis": data['category'],
            "pipeline_results": [result],
            "collaboration_logs": [log]
        }

    # --- 2. Ethics Agent Node (تحليل الأخلاقيات الحقيقي) ---
    async def ethics_node(self, state: GraphState) -> Dict[str, Any]:
        prompt = f"""
        You are the Ethics Agent. Evaluate the ethical compliance, data privacy, and potential harms of this research based on its abstract.
        
        Title: {state['title']}
        Abstract: {state['abstract']}
        
        Respond ONLY with a valid JSON object matching this structure:
        {{
            "status": "Approved" or "Flagged" or "Low Risk",
            "score": 0-100,
            "confidence": 0.85,
            "reason": "Detailed ethical risk assessment summary"
        }}
        """
        response = await self.llm.ainvoke(prompt)
        data = json.loads(response.content)
        
        log = {"from": "Ethics Agent", "message": f"Ethical Evaluation completed. Status: {data['status']}"}
        result = {
            "agent": "Ethics Agent",
            "confidence": data['confidence'],
            "status": data['status'],
            "score": data['score'],
            "reason": data['reason']
        }
        return {
            "ethics_analysis": data['reason'],
            "pipeline_results": state["pipeline_results"] + [result],
            "collaboration_logs": state["collaboration_logs"] + [log]
        }

    # --- 3. Citation Agent Node (قوة الاستشهاد والخلفية العلمية) ---
    async def citation_node(self, state: GraphState) -> Dict[str, Any]:
        prompt = f"""
        You are the Citation & Literature Agent. Evaluate the grounding, methodology claims, and citation framing based on the abstract.
        
        Title: {state['title']}
        Abstract: {state['abstract']}
        
        Respond ONLY with a valid JSON object matching this structure:
        {{
            "status": "Strong" or "Moderate" or "Weak",
            "score": 0-100,
            "confidence": 0.85,
            "reason": "Critique of the methodology and reference framing"
        }}
        """
        response = await self.llm.ainvoke(prompt)
        data = json.loads(response.content)
        
        log = {"from": "Citation Agent", "message": f"Literature alignment analyzed. Quality: {data['status']}"}
        result = {
            "agent": "Citation Agent",
            "confidence": data['confidence'],
            "status": data['status'],
            "score": data['score'],
            "reason": data['reason']
        }
        return {
            "citation_analysis": data['reason'],
            "pipeline_results": state["pipeline_results"] + [result],
            "collaboration_logs": state["collaboration_logs"] + [log]
        }

    # --- 4. Reviewer Agent Node (صانع القرار النهائي التجميعي) ---
    async def reviewer_node(self, state: GraphState) -> Dict[str, Any]:
        prompt = f"""
        You are the Meta-Reviewer Agent. Synthesize the findings of the previous specialist agents to render a final editorial decision.
        
        Research Title: {state['title']}
        Domain Classification: {state['intake_analysis']}
        Ethics Report: {state['ethics_analysis']}
        Citation Quality: {state['citation_analysis']}
        
        Respond ONLY with a valid JSON object matching this structure:
        {{
            "decision": "Accept" or "Minor Revision" or "Major Revision" or "Reject",
            "final_score": 0-100,
            "confidence": 0.95,
            "comprehensive_reason": "Provide a masterful, single-sentence summary of why this decision was reached based on the integrated agent logs."
        }}
        """
        response = await self.llm.ainvoke(prompt)
        data = json.loads(response.content)
        
        log = {"from": "Reviewer Agent", "message": f"Final Editorial Decision: {data['decision']} (Score: {data['final_score']})"}
        result = {
            "agent": "Reviewer Agent",
            "confidence": data['confidence'],
            "status": data['decision'],
            "score": data['final_score'],
            "reason": data['comprehensive_reason']
        }
        return {
            "pipeline_results": state["pipeline_results"] + [result],
            "collaboration_logs": state["collaboration_logs"] + [log]
        }

    # --- دالة التشغيل المستدعاة من السيرفر ---
    async def run(self, title: str, abstract: str) -> Dict[str, Any]:
        initial_state = {
            "title": title,
            "abstract": abstract,
            "intake_analysis": "",
            "ethics_analysis": "",
            "citation_analysis": "",
            "pipeline_results": [],
            "collaboration_logs": []
        }
        
        final_output = await self.app.ainvoke(initial_state)
        
        return {
            "pipeline": final_output["pipeline_results"],
            "collaboration": final_output["collaboration_logs"]
        }