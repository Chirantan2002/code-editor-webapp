"use client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const CopyButton = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard!");
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 cursor-pointer rounded-lg bg-white/10 group relative"
    >
      {isCopied ? (
        <Check className="size-5 text-green-400 rounded-lg transition-all duration-200 ease-in-out" />
      ) : (
        <Copy className="size-5 hover:text-gray-400 text-gray-300 rounded-lg transition-all duration-200 ease-in-out" />
      )}
    </button>
  );
};

export default CopyButton;
