import { Message, ChatResponse } from "../types";

export const getLLMResponse = async (
  messages: Message[],
  model: string
): Promise<string> => {
    console.log("Input messages:", messages);

    const apiMessages: Message[] = messages.map((msg) => ({
        model: msg.model,
        content: msg.content,
    }));
    
    console.log("Formatted API messages:", apiMessages);
    
    const requestBody = {
        messages: apiMessages,
        model,
    };
    console.log("Request body:", requestBody);

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