import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "What can you do?",
    prompt: "What can you do?",
    icon: "circle-question",
  },
];

export const PLACEHOLDER_INPUT = "Ask anything...";

export const GREETING = "Let's get you ready for the DAI exam";

const parseEnvNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const PEEK_MIN_DELAY_MS = parseEnvNumber(
  process.env.NEXT_PUBLIC_PEEK_MIN_DELAY_MS,
  30_000
);

export const PEEK_MAX_DELAY_MS = parseEnvNumber(
  process.env.NEXT_PUBLIC_PEEK_MAX_DELAY_MS,
  120_000
);

export const PEEK_DURATION_MS = parseEnvNumber(
  process.env.NEXT_PUBLIC_PEEK_DURATION_MS,
  2_500
);

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  color: {
    grayscale: {
      hue: 220,
      tint: 6,
      shade: theme === "dark" ? -1 : -4,
    },
    accent: {
      primary: theme === "dark" ? "#f1f5f9" : "#0f172a",
      level: 1,
    },
  },
  radius: "round",
  // Add other theme options here
  // chatkit.studio/playground to explore config options
});
