from dotenv import load_dotenv
import os

# Load .env before any LangChain/LangGraph imports.
load_dotenv()

LANGCHAIN_API_KEY = os.getenv("LANGCHAIN_API_KEY")
LANGCHAIN_PROJECT = os.getenv("LANGCHAIN_PROJECT")
LANGCHAIN_TRACING_V2 = os.getenv("LANGCHAIN_TRACING_V2")

print("Environment loaded:")
print("  LANGCHAIN_API_KEY set:", bool(LANGCHAIN_API_KEY))
print("  LANGCHAIN_PROJECT:", LANGCHAIN_PROJECT)
print("  LANGCHAIN_TRACING_V2:", LANGCHAIN_TRACING_V2)

if not LANGCHAIN_API_KEY:
    raise SystemExit("ERROR: LANGCHAIN_API_KEY is not set in .env")

# TODO: add your real LangChain/LangGraph code here.
# Example:
# from langchain.chat_models import ChatOpenAI
# from langchain.schema import HumanMessage
#
# llm = ChatOpenAI(temperature=0.7, openai_api_key=LANGCHAIN_API_KEY)
# response = llm([HumanMessage(content="Hello from LangSmith test script")])
# print(response.content)
