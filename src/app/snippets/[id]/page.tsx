"use client";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import SnippetLoadingSkeleton from "./_components/SnippetLoadingSkeleton";
import NavigationHeader from "@/components/NavigationHeader";
import Image from "next/image";
import { Clock, CodeXml, MessageSquare, User } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import CopyButton from "./_components/CopyButton";
import Comments from "./_components/Comments";

const SnippetDetailsPage = () => {
  const params = useParams();
  const snippetId = params.id;
  const snippet = useQuery(api.snippets.getSnippetById, {
    snippetId: snippetId as Id<"snippets">,
  });
  const comments = useQuery(api.snippets.getCommentsBySnippetId, {
    snippetId: snippetId as Id<"snippets">,
  });

  if (snippet === undefined) return <SnippetLoadingSkeleton />;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />
      <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-12 rounded-xl bg-[#ffffff08] p-2.5">
                  <Image
                    src={`/${snippet.language}.png`}
                    alt={`${snippet.language} icon`}
                    width={24}
                    height={24}
                    className="w-full h-full object-cotain"
                  />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-lime-600">
                    {snippet.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <User className="w-4 h-4" />
                      <span>{snippet.userName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(snippet._creationTime).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8b8b8d]">
                      <MessageSquare className="w-4 h-4" />
                      <span>
                        {comments?.length}{" "}
                        {comments?.length === 1 ? "comment" : "comments"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 bg-[#ffffff08] text-[#adb5bd] rounded-lg font-mono text-sm font-medium border-2 border-[#415a77] hover:text-green-400/90 hover:border-green-500/90 transition-colors duration-200 ease-in-out uppercase">
                {snippet.language}
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="mb-8 rounded-2xl overflow-clip border border-[#ffffff0a] bg-[#121218]">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#ffffff0a]">
              <div className="flex items-center gap-2 text-[#808086]">
                <CodeXml className="w-5 h-5 hover:text-green-400/90 transition-colors duration-200 ease-in-out" />
                <span className="font-medium font-mono hover:text-green-400/90 transition-colors duration-200 ease-in-out">
                  Source Code
                </span>
              </div>
              <CopyButton code={snippet.code} />
            </div>
            <Editor
              height="600px"
              language={LANGUAGE_CONFIG[snippet.language].monacoLanguage}
              value={snippet.code}
              theme="vs-dark"
              beforeMount={defineMonacoThemes}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                readOnly: true,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
              }}
            />
          </div>

          {/* Comments */}
          <Comments snippetId={snippet._id} />
        </div>
      </main>
    </div>
  );
};

export default SnippetDetailsPage;
