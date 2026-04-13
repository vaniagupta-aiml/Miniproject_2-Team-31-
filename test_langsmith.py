from dotenv import load_dotenv
import os

# Load variables from the .env file before importing any LangChain or LangGraph classes.
load_dotenv()

langchain_api_key = os.getenv("LANGCHAIN_API_KEY")
langchain_project = os.getenv("LANGCHAIN_PROJECT")
langchain_tracing = os.getenv("LANGCHAIN_TRACING_V2")

print("Loaded environment variables:")
print("  LANGCHAIN_API_KEY set:", bool(langchain_api_key))
print("  LANGCHAIN_PROJECT:", langchain_project)
print("  LANGCHAIN_TRACING_V2:", langchain_tracing)

if not langchain_api_key:
    raise SystemExit("ERROR: LANGCHAIN_API_KEY is not set in your .env file.")

# TODO: replace the following with your actual LangChain/LangGraph imports and logic.
# Example:
# from langchain.chat_models import ChatOpenAI
# from langchain.schema import HumanMessage
#
# client = ChatOpenAI(temperature=0.7, openai_api_key=langchain_api_key)
# response = client([HumanMessage(content="Hello from LangSmith test script")])
# print(response.content)
