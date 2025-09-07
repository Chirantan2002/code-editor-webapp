// Example: pages/api/execute.ts (Next.js API route)
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { language, code, input } = req.body;

  // Map your language to piston runtime as before
  // const runtime = ...;

  const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: runtime.language, // or runtime.language
      version: runtime.version,
      files: [{ content: code }],
      stdin: input || "", // <-- Pass user input here
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}