from fastapi import APIRouter
from agent.Sample_agent.core.agent import run_agent_logic

router = APIRouter()

@router.get("/run")
async def run_agent():
    result = run_agent_logic()
    return {"agent_result": result}