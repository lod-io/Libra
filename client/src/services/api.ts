import { Message, ChatResponse } from "../types";

export const getLLMResponse = async (
  messages: Message[],
  model: string
): Promise<string> => {

    const apiMessages: Message[] = messages.map((msg) => ({
        model: msg.model,
        content: msg.content,
    }));
    
    const requestBody = {
        messages: apiMessages,
        model,
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/chat/respond`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${response.statusText} - ${errorText}`);
    }

    const data: ChatResponse = await response.json();
    return data.content;
};

export const summarizeChat = async (
  messages: Message[]
): Promise<string> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/chat/summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`API error: ${response.statusText} - ${errorText}`);
    }

    const data: ChatResponse = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error summarizing chat:", error);
    throw error;
  }
}; 