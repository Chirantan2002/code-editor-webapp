import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useUser, SignIn } from "@clerk/nextjs";

const ShareSnippetDialog = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const { language } = useCodeEditorStore((state) => state);
  const { getCode } = useCodeEditorStore((state) => state);
  const createSnippet = useMutation(api.snippets.createSnippet);
  const { isSignedIn } = useUser();

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error("You must be signed in to share a snippet.");
      return;
    } // Prevent sharing if not signed in
    setIsSharing(true);
    try {
      const code = await getCode();
      await createSnippet({ title, language, code });
      onClose();
      setTitle("");
      toast.success("Snippet shared successfully!");
    } catch (error) {
      toast.error(`Failed to share snippet! ${error}`);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e2e] rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            {!isSignedIn ? "Sign in" : "Share Snippet"}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-300 cursor-pointer transition-colors duration-200"
            onClick={onClose}
          >
            {!isSignedIn ? (
              <X className="w-6 h-6 text-red-300 hover:animate-pulse hover:scale-130 transition-colors duration-200" />
            ) : (
              <X className="w-6 h-6" />
            )}
          </button>
        </div>
        {!isSignedIn ? (
          <SignIn routing="hash" />
        ) : (
          <form onSubmit={handleShare}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-400 mb-2 cursor-pointer"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className=" w-full px-3 py-2 bg-[#181825] border border-[#313244] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter snippet title"
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border-2 border-gray-600 hover:border-gray-400 rounded-lg text-gray-400 hover:text-gray-300 cursor-pointer transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSharing}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 cursor-pointer transition-colors duration-200"
              >
                {isSharing ? "Sharing..." : "Share"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ShareSnippetDialog;
