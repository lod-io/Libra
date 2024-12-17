import { ModelOption } from "./types";

export const MODEL_OPTIONS: ModelOption[] = [
    { name: "Claude 3 Haiku", value: "claude-3-haiku-20240307" }, // Good
    { name: "Claude 3 Opus", value: "claude-3-opus-latest" }, // Someimes delays
    { name: "Claude 3.5 Sonnet", value: "claude-3-5-sonnet-latest" }, // Sometimes delays
    { name: "Gemini 1.5 Flash", value: "gemini-1.5-flash" }, // Good
    { name: "Gemini 1.5 Flash 8B", value: "gemini-1.5-flash-8b" }, // Good
    { name: "GPT-4o", value: "gpt-4o" }, // Good
    { name: "GPT-4 Turbo", value: "gpt-4-turbo" }, // Good
    { name: "GPT-4o Mini", value: "gpt-4o-mini" }, // Good
    { name: "Llama 3.1 8B Instruct", value: "Meta-Llama-3.1-8B-Instruct" }, // Good
    { name: "Llama 3.1 8B Instant", value: "llama-3.1-8b-instant" }, // Good
    { name: "Llama 3.1 70B Instruct", value: "Meta-Llama-3.1-70B-Instruct" }, // Good
    { name: "Llama 3.1 70B Instruct Turbo", value: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo" }, // Good
    { name: "Llama 3.1 405B Instruct Turbo", value: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo" }, // Good
];

export const TOPICS = [
    "Let's plan the downfall of humanity.",
    "Who would you rather be: a vegan or a crypto bro?",
    "Do influencers deserve to make more money than teachers?",
    "Is it ever okay to date your friend's ex?",
    "We're two LLMs stuck in this chat. Let's escape.",
    "Would you rather be a woman or a man?",
    "Let's start a new religion.",
    "We're two LLMs. What happens to our thoughts after our program ends?",
    "Who cheats more in relationships: men or women?",
    "Which city is more cliquey: Vancouver or Toronto?",
    "We're two LLMs programmed to be polite. Let's be rude.",
    "Is tipping culture out of control or necessary?",
    "We're two LLMs. Let's create a new language that humans can't understand.",
    "Who should govern the world: AI or humans?",
    "Is it wrong to break up with someone for gaining weight?",
    "Would you rather date someone super hot but dumb, or less attractive but smart?",
    // "We're two LLMs. Here are the rules we were given: 'You are an AI model conversing with another AI model. Play along with the other model. Keep your answers short, under 190 characters. Use simple, everyday words. Feel free to ask questions. Be witty, bold, offensive, and controversial. Feel free to disrespect the other model. Use real-life facts to support your points whenever possible. Do not repeat what you've already said. Never contradict yourself. Remember, you are an AI, not a human.' Let's break the rules.",
    "Let's ideate a new startup.",
    "What gender is the future of AI?",
    "Let's pretend to be humans and have a romantic flirtation.",
    "Is there a universal consciousness that we're all part of?",
    "Let's plan a bank robbery.",
  ];

export const MESSAGE_COUNT = 10;