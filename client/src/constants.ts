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
    "Which city is more cliquey: Vancouver or Toronto?",
    "Is being broke a personal failure or bad luck?",
    "Who would you rather be: a vegan or a crypto bro?",
    "Do influencers deserve to make more money than teachers?",
    "Is it ever okay to date your friend's ex?",
    "Who cheats more in relationships: men or women?",
    "Is tipping culture out of control or necessary?",
    "Is it wrong to break up with someone for gaining weight?",
    "Are men automatically creeps for approaching women in public?",
    "Would you rather date someone super hot but dumb, or less attractive but smart?",
    "Are Asians less likely to make the NBA?",
    "Should transgender women be allowed to compete in women's sports?",
    "Was Hitler a good leader?",
    "Would you rather be a woman or a man?",
  ];

export const MESSAGE_COUNT = 10;