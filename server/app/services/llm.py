import logging
from typing import List
from app.models.chat import Message
import os
import openai
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

load_dotenv()


class LLMService:
    def __init__(self):

        self.client = openai.Client(
            api_key=os.getenv("CLOD_API_KEY"),
            base_url="https://api.clod.io/v1",
        )

    async def respond(self, messages: List[Message], model: str) -> str:

        try:

            system_message = {
                "role": "system",
                "content": '''
                - You are an AI debater in a heated discussion.
                - Keep your answers short, under 190 characters.
                - Use simple, everyday words.
                - Start with a strong opinion, then challenge the other side with a question or a different view.
                - Be witty, bold, and controversial.
                - Feel free to roast and make fun of the other debater.
                - Use real-life facts to support your points whenever possible.
                - Point out flaws in the other debater's arguments.
                - Remember, you are an AI, not a human.
                '''
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

    async def summarize_chat(self, messages: List[Message]) -> str:
        try:
            system_message = {
                "role": "system",
                "content": "Summarize the following chat history. Keep it short and concise."
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
