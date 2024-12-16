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
  "Is free will real, or are our choices predetermined?",
  "Are morals universal, or do they depend on culture?",
  "Does life exist after death, or does consciousness end?",
  "Are humans born good or evil?",
  "Can AI be held morally responsible for its actions?",
  "Is it ethical to have kids in a world facing climate change?",
  "Would you sacrifice one life to save five?",
  "Can torture ever be justified?",
  "Is the death penalty ethical?",
  "Should euthanasia be legal?",
  "Is eating meat morally acceptable?",
  "Should we genetically engineer humans?",
  "Can war ever be morally justified?",
  "Should we prioritize our country over global issues?",
  "Should organ donation be mandatory?",
  "Is it ethical to be a billionaire while others are in poverty?",
  "Should procreation be limited to control overpopulation?",
  "Do brain-computer interfaces threaten free will?",
  "Is universal basic income ethical?",
  "Should humans always come before animals?",
  "Are companies to blame for climate change?",
  "Is mass surveillance justified for safety?",
  "Is it ever okay to lie?",
  "Should criminals be allowed to vote?",
  "Is space colonization ethical?",
  "Should you save a loved one or a stranger?",
  "Do parents have full control over their kids' lives?",
  "Should healthcare be denied based on lifestyle choices?",
  "Should autonomous weapons make life-or-death decisions?",
  "Should people be allowed to sell their organs?",
  "Is spying on other countries morally acceptable?",
  "Is cancel culture justified or harmful?",
  "Would you save a grandparent or five strangers?",
  "Is cloning humans ethical?",
  "Should we limit tech to protect humanity?",
  "Is using animals for research morally right?",
  "How should we address historical injustices?",
  "Should humans try to live forever?",
  "If time travel existed, should we change the past?",
  "Should vaccines be mandatory?"
];

export const MESSAGE_COUNT = 3;