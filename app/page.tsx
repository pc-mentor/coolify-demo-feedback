import { FeedbackApp } from "@/components/FeedbackApp";

const TALK_TITLE =
  process.env.TALK_TITLE ??
  "Vibe Coding ist nur die halbe Miete: Build, Deploy & Betrieb auf eigenem Server";
const TALK_SPEAKER = process.env.TALK_SPEAKER ?? "Stefan Schwarz · AI-Guys";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <header className="mb-10 flex max-w-2xl flex-col items-center text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Wie hat dir der Vortrag gefallen?
        </p>
        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{TALK_TITLE}</h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{TALK_SPEAKER}</p>
      </header>

      <FeedbackApp />
    </div>
  );
}
