import asyncio
import logging
import os
from dotenv import load_dotenv

# «” Ì—«œ „ﬂ »«  «·„‰’… «·—”„Ì…
from thenvoi import Agent
from thenvoi.adapters import CustomAdapter

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def verify_setup():
    load_dotenv()

    # «·»Ì«‰«  «·Œ«’… »ﬂ Ê«·„À» … ··Â«ﬂ«ÀÊ‰
    agent_id = "**********"
    api_key = "***********"
    
    ws_url = os.getenv("THENVOI_WS_URL", "wss://app.band.ai/api/v1/socket/websocket")
    rest_url = os.getenv("THENVOI_REST_URL", "https://app.band.ai/")

    logger.info(f"?? Attempting to connect to Band Platform...")
    logger.info(f"?? Agent ID: {agent_id}")

    # „Õ«ﬂÌ „Œ’’ „ Ê«›ﬁ „⁄ „⁄«ÌÌ— «·‹ SDK
    class SimpleAdapter(CustomAdapter):
        async def handle_call(self, *args, **kwargs):
            return "Active"

    adapter = SimpleAdapter()

    try:
        # ≈‰‘«¡ «·⁄„Ì·
        agent = Agent.create(
            adapter=adapter,
            agent_id=agent_id,
            api_key=api_key,
            ws_url=ws_url,
            rest_url=rest_url,
        )

        # »œ¡ «·« ’«· «·”Õ«»Ì «·ÕÌ Ê«·«‰ Ÿ«— ﬁ·Ì·« ·· √ﬂÌœ
        await agent.start()
        logger.info("? Connection established with the WebSocket server!")
        
        # Ã·» «·«”„ «·„”Ã· ⁄·Ï «·„‰’… ·· √ﬂœ „‰ ﬁ—«¡ Â
        agent_name = getattr(agent, "agent_name", "Research Ethics Agent")
        logger.info(f"? Connected successfully as: {agent_name}")
        logger.info("?? Setup verified successfully! Your environment is ready.")
        
        await agent.stop()

    except Exception as e:
        logger.error(f"? Failed to connect to Band Platform. Error: {str(e)}")

if __name__ == "__main__":
    asyncio.run(verify_setup())
