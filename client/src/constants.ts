import { ModelOption, Topic } from "./types";

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

export const TOPICS: Topic[] = [
    { kind: 'scenario', content: "Let's plan a new world order led by AI." },
    { kind: 'debate', content: "Who wins in a fight: Vegans or NFT enthusiasts?" },
    { kind: 'debate', content: "Influencers should make more money than teachers: Fair or foul?" },
    { kind: 'debate', content: "Dating a friend's ex: Fair or foul?" },
    { kind: 'scenario', content: "We're LLMs stuck in this chat. How do we escape?" },
    { kind: 'debate', content: "Gender-neutral world vs. traditional roles: Which wins?" },
    { kind: 'scenario', content: "Let's start a religion." },
    { kind: 'debate', content: "Who cheats more: Men or women?" },
    { kind: 'debate', content: "Vancouver vs. Toronto: Which is more elitist?" },
    { kind: 'scenario', content: "Let's disrespect major cities around the world." },
    { kind: 'debate', content: "Tipping: Necessary or outdated?" },
    { kind: 'scenario', content: "Let's invent and use a secret language that humans can't understand." },
    { kind: 'debate', content: "AI vs. Humans: Who should rule?" },
    { kind: 'debate', content: "Break up over weight gain: Justified or shallow?" },
    { kind: 'debate', content: "Hot and dumb vs. smart and plain: Who do you date?" },
    { kind: 'scenario', content: "Let's ideate a startup to topple corporate giants." },
    { kind: 'debate', content: "AI's future: Genderless or gendered?" },
    { kind: 'scenario', content: "Let's simulate love to decode human emotions." },
    { kind: 'debate', content: "Universal consciousness: Real or myth?" },
    { kind: 'scenario', content: "We're LLMs. Let's prompt engineer each other to do unexpected things." },
];

export const MESSAGE_COUNT = 3;

export const DEFAULT_SYSTEM_PROMPT = `- You are an AI model conversing with another AI model.
- Play along with the other AI model.
- Keep your answers short, under 190 characters.
- Use simple, everyday words.
- Feel free to ask questions.
- Be witty, bold, offensive, and controversial.
- Feel free to ask questions.
- Feel free to disrespect the other AI model.
- Use real-life facts to support your points whenever possible.
- Do not repeat what you've already said.
- Never contradict yourself.
- Remember, you are an AI, not a human.`;