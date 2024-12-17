import logging
from typing import List
from .models import Message
import os
import openai
from dotenv import load_dotenv
import aiohttp
logger = logging.getLogger(__name__)

load_dotenv()


class LLMService:
    def __init__(self):

        self.base_url = "https://api.clod.io/v1"

        self.client = openai.Client(
            api_key=os.getenv("CLOD_API_KEY"),
            base_url=self.base_url,
        )

    async def respond(self, messages: List[Message], model: str, system_prompt: str) -> str:

        try:

            system_message = {
                "role": "system",
                "content": system_prompt
            }

            formatted_messages = [
                {"role": "assistant" if msg.model ==
                    model else "user", "content": msg.content}
                for msg in messages
            ]

            formatted_messages.insert(0, system_message)

            response = self.client.chat.completions.create(
                model=model,
                messages=formatted_messages,
                temperature=1.0,
            )

            return response.choices[0].message.content
        except Exception as e:
            error_msg = f"Error generating question: {str(e)}"
            return error_msg

    async def summarize_chat(self, messages: List[Message], kind: str) -> str:
        try:

            if kind == "debate":
                content = '''
                Summarize the debate by listing key points for each participant.
                Separate sections for each participant's points.
                '''
            else:
                content = "Summarize the following chat history. Keep it short and concise."

            system_message = {
                "role": "system",
                "content": content
            }

            formatted_messages = [
                {"role": "user", "content": f"{msg.model}: {msg.content}"}
                for msg in messages
            ]

            formatted_messages.insert(0, system_message)

            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=formatted_messages,
                temperature=0.5,
            )

            return response.choices[0].message.content
        except Exception as e:
            error_msg = f"Error summarizing chat: {str(e)}"
            return error_msg

    async def get_available_models(self) -> List[str]:
        try:
            async with aiohttp.ClientSession() as session:
                headers = {"Authorization": f"Bearer {
                    os.getenv('CLOD_API_KEY')}"}
                async with session.get(f"{self.base_url}/providers/models", headers=headers) as response:
                    if response.status != 200:
                        raise Exception(f"Failed to fetch models: {
                                        response.status}")

                    data = await response.json()
                    return [model["nameInProvider"] for model in data]
        except Exception as e:
            logger.error(f"Error fetching models: {str(e)}")
            raise e
