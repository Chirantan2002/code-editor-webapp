"use client";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import toast from "react-hot-toast";
import { ArrowRight, MessageSquare } from "lucide-react";
import useMounted from "@/hooks/useMounted";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ snippetId }: { snippetId: Id<"snippets"> }) => {
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );
  const comments =
    useQuery(api.snippets.getCommentsBySnippetId, { snippetId }) || [];
  const addComment = useMutation(api.snippets.addComment);
  const deleteComment = useMutation(api.snippets.deleteComment);

  const handleSubmitComment = async (content: string) => {
    setIsSubmitting(true);
    try {
      await addComment({ snippetId, content });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: Id<"snippetComments">) => {
    setDeletingCommentId(commentId);

    try {
      await deleteComment({ commentId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setDeletingCommentId(null);
    }
  };

  const mount = useMounted();
  if (!mount) return null;

  return (
    <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl overflow-clip">
      <div className="px-6 sm:px-8 py-6 border-b border-[#ffffff0a]">
        <h2 className="text-lg font-semibold text-white flex items-center gap-3">
          <MessageSquare className="size-5" />
          Discussion ({comments.length})
        </h2>
      </div>

      <div className="p-6 sm:p-8">
        {user ? (
          <CommentForm
            onSubmit={handleSubmitComment}
            isSubmitting={isSubmitting}
          />
        ) : (
          <div className="bg-[#0a0a0f] rounded-xl p-6 text-center mb-8 border border-[#ffffff0a]">
            <p className="text-[#808086] mb-4 font-mono">
              Sign in to join the discussion...
            </p>
            <SignInButton mode="modal">
              <button className="px-6 py-2 text-green-400 border-2 border-green-400 rounded-lg hover:bg-green-400 hover:text-black transition-colors duration-200 ease-in-out cursor-pointer">
                <span className="font-bold flex text-center gap-2">
                  Sign in <ArrowRight />
                </span>
              </button>
            </SignInButton>
          </div>
        )}

        <div className="space-y-6">
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onDelete={() => handleDeleteComment(comment._id)}
              isDeleting={deletingCommentId === comment._id}
              currentUserId={user?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
