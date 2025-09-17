"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";
import toast from "react-hot-toast";

const OutputPanel = () => {
  const output = useCodeEditorStore((state) => state.output);
  const error = useCodeEditorStore((state) => state.error);
  const isRunning = useCodeEditorStore((state) => state.isRunning);
  const [isOutputCopied, setIsOutputCopied] = useState(false);
  const [isInputCopied, setIsInputCopied] = useState(false);
  const userInput = useCodeEditorStore((s) => s.userInput);
  const setUserInput = useCodeEditorStore((s) => s.setUserInput);

  const hasOutputContent = output || error || isRunning;
  const hasInputContent = userInput !== "";

  const handleOutputCopy = async () => {
    if (!hasOutputContent) return;
    await navigator.clipboard
      .writeText(output)
      .then(() => setIsOutputCopied(true));
    setIsOutputCopied(true);
    toast.success("Output copied to clipboard!"); // ✅ Calling toast here
    setTimeout(() => setIsOutputCopied(false), 2000);
  };

  const handleInputCopy = async () => {
    if (!hasInputContent) return;
    await navigator.clipboard
      .writeText(userInput)
      .then(() => setIsInputCopied(true));
    setIsInputCopied(true);
    toast.success("Input copied to clipboard!"); // ✅ Calling toast here
    setTimeout(() => setIsInputCopied(false), 2000);
  };

  return (
    <div className="relative bg-[#181825] rounded-xl p-4 ring-1 ring-gray-800/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
            <Terminal className="w-4 h-4 text-blue-400/50" />
          </div>
          <span className="text-sm font-medium font-mono text-gray-300/80">
            Input
          </span>
        </div>

        {hasInputContent && (
          <button
            onClick={handleInputCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-green-500 border-2 border-transparent hover:border-green-500 transition-all duration-300 ease-in-out bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 cursor-pointer"
          >
            {isInputCopied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="font-semibold tracking-wide">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="font-semibold">Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Input Console */}
      <div className="mb-3">
        <textarea
          placeholder="Enter input here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full h-24 p-2 rounded-lg bg-[#1e1e2e] text-gray-200 border border-[#313244] font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>

      {/* Output Area */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
              <Terminal className="w-4 h-4 text-blue-400/50" />
            </div>
            <span className="text-sm font-medium text-gray-300/80 font-mono">
              Output
            </span>
          </div>
          {hasOutputContent && (
            <button
              onClick={handleOutputCopy}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-gray-400 hover:text-green-500 border-2 border-transparent hover:border-green-500 transition-all duration-300 ease-in-out bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800/50 hover:ring-gray-700/50 cursor-pointer"
            >
              {isOutputCopied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="font-semibold tracking-wide">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="font-semibold">Copy</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* <OutputPanelSkeleton /> */}
        <div className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-4 h-[400px] overflow-auto font-mono text-sm">
          {isRunning ? (
            <RunningCodeSkeleton />
          ) : error ? (
            <div className="flex items-start gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-1" />
              <div className="space-y-1">
                <div className="font-medium">Execution Error</div>
                <pre className="whitespace-pre-wrap text-red-400/80">
                  {error}
                </pre>
              </div>
            </div>
          ) : output ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Execution Successful</span>
              </div>
              <pre className="whitespace-pre-wrap text-gray-300">{output}</pre>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 ring-1 ring-gray-700/50 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-center">
                Run your code to see the output here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputPanel;
