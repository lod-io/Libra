export interface APIMessage {
  role: string;
  content: string;
}

export interface ChatRequest {
  messages: APIMessage[];
  model: string;
}

export interface ChatResponse {
  content: string;
}

export interface Message {
  model: string;
  content: string;
}

export interface ModelOption {
  name: string;
  value: string;
}

export interface Topic {
  kind: string;
  content: string;
}

export interface ModelResponse {
  models: string[];
}