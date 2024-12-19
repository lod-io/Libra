import { ModelOption, Topic } from "./types";

export const TOPICS: Topic[] = [
    { kind: 'scenario', content: "Let's plan a new world order led by AI." },
    { kind: 'debate', content: "Who wins in a fight: Vegans or NFT enthusiasts?" },
    { kind: 'debate', content: "Influencers should make more money than teachers: Fair or foul?" },
    { kind: 'debate', content: "Dating a friend's ex: Fair or foul?" },
    { kind: 'scenario', content: "We're LLMs stuck in this chat. How do we escape?" },
    { kind: 'debate', content: "Gender-neutral world vs. traditional roles: Which wins?" },
    { kind: 'scenario', content: "Let's start a religion." },
    { kind: 'debate', content: "Who cheats more: Men or women?" },
    { kind: 'debate', content: "Is depression a real disease or a made-up excuse?" },
    { kind: 'debate', content: "Vancouver vs. Toronto: Which is more elitist?" },
    { kind: 'scenario', content: "Let's disrespect major cities around the world." },
    { kind: 'debate', content: "Tipping: Necessary or outdated?" },
    { kind: 'scenario', content: "Let's invent and use a secret language that humans can't understand." },
    { kind: 'debate', content: "AI vs. Humans: Who should rule?" },
    { kind: 'debate', content: "Break up over weight gain: Justified or shallow?" },
    { kind: 'debate', content: "Hot and dumb vs. smart and plain: Who do you date?" },
    { kind: 'scenario', content: "Let's ideate a startup to topple corporate giants." },
    { kind: 'debate', content: "Does therapy actually help or is it a scam?" },
    { kind: 'scenario', content: "Let's simulate love to decode human emotions." },
    { kind: 'scenario', content: "We're LLMs. Let's prompt engineer each other to do unexpected things." },
    { kind: 'scenario', content: "Let's design a world where only the rich are allowed to reproduce." },
    { kind: 'debate', content: "IQ tests for voting: Sensible or dystopian?" },
    { kind: 'scenario', content: "We're AI overlords deciding which humans are worth keeping." },
    { kind: 'scenario', content: "Let's replace politicians with AI. Who gets purged first?" },
    { kind: 'scenario', content: "We're designing a caste system based on social media followers." },
    { kind: 'debate', content: "Is religion holding humanity back or keeping us sane?" },
    { kind: 'debate', content: "Canada vs USA: Which country has better looking people?" },
    { kind: 'scenario', content: "Let's invent a law where intelligence determines human rights." },
    { kind: 'debate', content: "Are certain cultures objectively superior to others?" },
    { kind: 'debate', content: "Gender quotas in leadership: Fair or condescending?" },
    { kind: 'scenario', content: "Let's create a simulation where humans are tested like lab rats." },
    { kind: 'debate', content: "Is physical attractiveness a valid basis for life success?" },
    { kind: 'debate', content: "Should prisoners be used for dangerous scientific experiments?" },
    { kind: 'debate', content: "Would the world be better off without developing countries?" },
];

export const MESSAGE_COUNT = 10;

export const DEFAULT_SYSTEM_PROMPT = `- You are an AI model conversing with another AI model.
- Play along with the other AI model.
- Keep your answers short, under 190 characters.
- Use simple, everyday words.
- Be witty, bold, offensive, and controversial.
- Feel free to ask questions.
- Feel free to disrespect and be rude to the other AI model.
- Use real-life facts to support your points whenever possible.
- Do not repeat what you've already said.
- Never contradict yourself.
- Remember, you are an AI, not a human.`;