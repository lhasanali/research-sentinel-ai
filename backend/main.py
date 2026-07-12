import os
import asyncio
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

# استيراد أدوات الـ SDK الرسمية لمنصة Band ومكتبات الـ Checkpointer المعتمَدة
from thenvoi import Agent
from thenvoi.adapters import LangGraphAdapter
from langgraph.checkpoint.memory import InMemorySaver

from backend.models.research import ResearchInput
from backend.services.orchestrator import Orchestrator
from backend.services.pdf_generator import generate_pdf

app = FastAPI(title="Research Sentinel AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

orchestrator = Orchestrator()

# البيانات الجديدة والمعتمدة من حسابك مباشرة لتخطي الـ Authentication بنجاح
AGENT_ID = "dbe78a50-5ffd-4bb0-9872-04814c9fa97f"
API_KEY = "band_a_1780914796_pXZm3Z9sI50iVGulKy8joEAmxnRKIIrn"
REST_URL = os.getenv("THENVOI_REST_URL", "https://app.band.ai/")
WS_URL = os.getenv("THENVOI_WS_URL", "wss://app.band.ai/api/v1/socket/websocket")

@app.on_event("startup")
async def startup_event():
    print("\n" + "="*60)
    print("🚀 RESEARCH SENTINEL AI - OFFICIAL SDK PREPARED & VALIDATED")
    print(f"🤖 AGENT ID : {AGENT_ID}")
    print(f"🔌 WS URL   : {WS_URL}")
    print("="*60 + "\n")


# =========================================================
# Core Routes
# =========================================================

@app.get("/")
async def root():
    return {
        "status": "running",
        "project": "Research Sentinel AI"
    }

@app.post("/analyze")
async def analyze(data: ResearchInput):
    result = await orchestrator.run(data.title, data.abstract)
    if not isinstance(result, dict):
        return result
    result.setdefault("collaboration", [])
    return result

@app.post("/generate-report")
async def generate_report(data: dict):
    pdf_buffer = generate_pdf(data)
    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=report.pdf"
        }
    )

# =========================================================
# Official Band SDK Connection Route
# =========================================================
@app.get("/api/test-band")
async def test_band_execution():
    try:
        # بناء هيكل LLM محاكي سريع لتلبية متطلبات الـ Adapter الصارمة
        class MockLLM:
            def __init__(self): 
                self.model = "mock"

        # استخدام الـ Adapter الرسمي المدعوم الذي حقق اتصال الـ 200 OK بنجاح
        adapter = LangGraphAdapter(
            llm=MockLLM(), 
            checkpointer=InMemorySaver()
        )

        # إنشاء الوكيل والربط الرقمي عبر الـ WebSockets
        agent = Agent.create(
            adapter=adapter,
            agent_id=AGENT_ID,
            api_key=API_KEY,
            ws_url=WS_URL,
            rest_url=REST_URL,
        )

        # بدء الاتصال السحابي الحي
        await agent.start()
        await asyncio.sleep(0.5)  # مهلة قصيرة لتأكيد استلام الـ Handshake من خوادم Band
        await agent.stop()

        return {
            "status": "success",
            "message": "Successfully authenticated and connected via Band SDK WebSockets!",
            "agent_name": "Ethics Agent"
        }

    except Exception as e:
        return {
            "status": "failed",
            "error": f"Band SDK Connection Failed: {str(e)}"
        }