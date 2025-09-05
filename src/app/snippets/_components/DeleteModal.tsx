import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { Snippet } from "@/types";
import DeleteDialogCard from "./DeleteDialogCard";
import { motion } from "framer-motion";

const DeleteSnippetModal = ({
  snippet,
  onClose,
}: {
  snippet: Snippet;
  onClose: () => void;
}) => {
  const deleteSnippet = useMutation(api.snippets.deleteSnippet);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSnippet({ snippetId: snippet._id });
      toast.success("Snippet deleted!");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete snippet!");
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: 0.2,
        type: "tween",
      }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60"
    >
      <DeleteDialogCard className="flex flex-col items-center  border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-16 justify-center items-left gap-[0.75em] backdrop-blur-[12px]">
        <p className="text-white mb-4 text-center text-lg font-semibold">
          Are you sure you want to delete this snippet?
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 border-2 border-red-600 text-white rounded-lg hover:bg-red-600 transition-all duration-300 cursor-pointer font-bold tracking-wide text-center"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 border-2 border-gray-600 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 cursor-pointer font-bold tracking-wide text-center"
          >
            Cancel
          </button>
        </div>
      </DeleteDialogCard>
    </motion.div>
  );
};

export default DeleteSnippetModal;
