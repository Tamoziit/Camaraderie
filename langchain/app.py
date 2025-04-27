import os
import json
import re
from fastapi import FastAPI, Request
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain, SequentialChain
from archetypes import archetypes


load_dotenv()

app = FastAPI()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0.1,
    max_output_tokens=100
)

archetypes_json = json.dumps(archetypes)

travel_assistant_prompt = ChatPromptTemplate.from_template(
    """
You are a travel assistant. Given the user's answers JSON below, write:
1) A concise descriptive paragraph capturing their travel style.
2) A single sentence stating their primary travel intent.

User answers JSON:
{user_profile_json}

Return valid JSON with keys exactly:
- paragraph: string
- intent: string
"""
)

travel_expert_classification_prompt = ChatPromptTemplate.from_template(
    """
You are a travel expert classifier. Compare the user's travel paragraph and intent below with these archetype definitions:
{archetypes_json}

User summary JSON:
{layer1_output}

Choose the best matching archetype.
Return valid JSON with keys exactly:
- archetype: string  # one of the archetypes
- confidence: number  # between 0 and 1
"""
)

travel_assistant_chain = LLMChain(
    llm=llm,
    prompt=travel_assistant_prompt,
    output_key="layer1_output"
)

travel_expert_classification_chain = LLMChain(
    llm=llm,
    prompt=travel_expert_classification_prompt,
    output_key="classification"
)

archetype_classifier = SequentialChain(
    chains=[travel_assistant_chain, travel_expert_classification_chain],
    input_variables=["user_profile_json", "archetypes_json"],
    output_variables=["classification"],
    verbose=False
)

class UserProfile(BaseModel):
    likes: list[str]
    dislikes: list[str]
    travelPreferences: dict
    canTolerate: list[str]
    cannotTolerate: list[str]

@app.post("/classify")
async def classify_user(user_profile: UserProfile):
    user_profile_json = user_profile.json()
    
    result = archetype_classifier({
        "user_profile_json": user_profile_json,
        "archetypes_json": archetypes_json
    })

    raw_classification = result["classification"]

    cleaned = re.sub(
        r"```.*?```",
        lambda m: m.group(0).strip('```json\n').strip('```'),
        raw_classification,
        flags=re.DOTALL
    )
    
    try:
        classification_cleaned = json.loads(cleaned)
    except json.JSONDecodeError:
        return {"error": "Failed to parse classification response"}

    return classification_cleaned
