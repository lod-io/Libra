import { Message, ChatResponse, ModelResponse } from "../types";

export const getLLMResponse = async (
  messages: Message[],
  model: string,
  system_prompt: string
): Promise<string> => {

    const apiMessages: Message[] = messages.map((msg) => ({
        model: msg.model,
        content: msg.content,
    }));
    
    const requestBody = {
        messages: apiMessages,
        model,
        system_prompt,
    };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/respond`, {
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
  kind: string,
  messages: Message[]
): Promise<string> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kind,
        messages
      }),
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

export const getAvailableModels = async (): Promise<string[]> => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/models`);
  const data: ModelResponse = await response.json();
  
  // Filter and remove duplicates
  const models = Array.from(new Set(data.models.map(model => {
    if (model.includes('/')) {
      return model.split('/').pop() ?? model;
    }
    return model;
  })));

  return models;
};