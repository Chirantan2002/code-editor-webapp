import { CodeIcon, SendIcon } from "lucide-react";
import { useState } from "react";
import CommentContent from "./CommentContent";

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  isSubmitting: boolean;
}

const CommentForm = ({ onSubmit, isSubmitting }: CommentFormProps) => {
  const [comment, setComment] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const handleKeyDown = async () => {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await onSubmit(comment);
    setComment("");
    setIsPreview(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="bg-[#0a0a0f] rounded-xl border border-[#ffffff0a] overflow-clip">
        {/* Comment Header */}
        <div className="flex justify-end gap-2 px-4 pt-2">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`text-sm px-3 py-1 rounded-md transition-colors cursor-pointer ${isPreview ? "bg-blue-500/10 text-blue-400" : "hover:bg-[#ffffff0a] text-gray-400"}`}
          >
            {isPreview ? "Edit" : "Preview"}
          </button>
        </div>

        {/* Comment Form */}
        {isPreview ? (
          <div className="min-h-[120px] p-4 text-[#e1e1e3]">
            <CommentContent content={comment} />
          </div>
        ) : (
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add to the discussion..."
            className="w-full bg-transparent border-0 text-[#e1e1e3] placholder:text-[#808086] outline-none resize-none min-h-[120px] p-4 font-mono text-md"
          />
        )}

        {/* Comment Form Footer */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-[#080809] border-t border-[#ffffff0a]">
          <div className="hidden sm:block text-xs text-[#808086] space-y-1">
            <div className="flex items-center gap-2">
              <CodeIcon className="w-3.5 h-3.5" />
              <span>Format code with ```language</span>
            </div>
            <div className="text-[#808086]/60 pl-5">
              Tab key inserts spaces • Preview your comment before posting
            </div>
          </div>

          {/* Comment Form Submit */}
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="flex items-center gap-2 px-4 py-2 text-green-400 hover:bg-green-400 hover:text-black font-semibold border-2 border-green-400 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out ml-auto cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div
                  className="w-4 h-4 border-2 border-white/30 
                border-t-white rounded-full animate-spin"
                />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <SendIcon className="size-4" />
                <span>Comment</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
