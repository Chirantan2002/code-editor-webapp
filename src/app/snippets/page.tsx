"use client";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton";
import NavigationHeader from "../../components/NavigationHeader";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Grid, Layers, Search, Tag, X } from "lucide-react";
import Image from "next/image";
import SnippetCard from "./_components/SnippetCard";
import type { Snippet } from "@/types";
import DeleteSnippetModal from "./_components/DeleteModal";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

const SnippetsPage = () => {
  const snippets = useQuery(api.snippets.getSnippets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [snippetToDelete, setSnippetToDelete] = useState<Snippet | null>(null);

  //   const snippets = [
  //     { title: "Hello JS", language: "javascript", userName: "alice" },
  //     { title: "Hello Py", language: "python", userName: "bob" },
  //   ];

  // Loading state...
  if (snippets === undefined) {
    return (
      <div className="min-h-screen">
        <NavigationHeader />
        <SnippetsPageSkeleton />
      </div>
    );
  }

  const languages = [...new Set(snippets.map((s) => s.language))];
  const popularLanguages = languages.slice(0, 5);
  console.log("snippets", snippets);
  console.log("languages", languages);
  console.log("popularLanguages", popularLanguages);
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLanguage =
      !selectedLanguage || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-sm text-gray-400 mb-6"
          >
            <AnimatedShinyText className="inline-flex items-center justify-center transition ease-out duration-300  space-x-2">
              <BookOpen className="size-4" />
              <span className="font-mono font-semibold">
                Community Code Library
              </span>
            </AnimatedShinyText>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl font-bold leading-tight bg-gradient-to-r from-[#41D1AF] via-[#ABED5A] to-[#391AB8] text-transparent bg-clip-text sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight lg:text-7xl lg:leading-tight"
          >
            Discover & Share Code Snippets
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-gray-400 mb-8"
          >
            Explore a curated collection of code snippets from the community
          </motion.p>
        </div>

        {/* Filter Section */}
        <div className="relative max-w-5xl mx-auto mb-12 space-y-6">
          {/* Search Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r grom-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search snippets by title, language, or author..."
                className="w-full pl-12 pr-4 py-4 bg-[#1e1e2e]/80 hover:bg-[#1e1e2e] text-white rounded-xl border border-[#313244] hover:border-[#414155] transition-all duration-200 placholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800 ">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Languages:</span>
            </div>

            {popularLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() =>
                  setSelectedLanguage(lang === selectedLanguage ? null : lang)
                }
                className={`
                    group relative px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer
                    ${
                      selectedLanguage === lang
                        ? "text-blue-400 bg-blue-500/10 ring-2 ring-blue-500/50"
                        : "text-gray-400 hover:text-gray-300 bg-[#1e1e2e] hover:bg-[#262637] ring-1 ring-gray-800"
                    }
                  `}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={`/${lang}.png`}
                    alt={lang}
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                  <span className="text-sm">{lang}</span>
                </div>
              </button>
            ))}

            {selectedLanguage && (
              <button
                onClick={() => setSelectedLanguage(null)}
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}

            <div className="ml-auto flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {filteredSnippets.length} Snippets found
              </span>

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-md transition-all ${
                    view === "grid"
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-md transition-all ${
                    view === "list"
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-gray-400 hover:text-gray"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/*  */}
        </div>

        {/* Snippets Grid */}
        <motion.div
          className={`grid gap-6
            ${view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-3xl mx-auto"}
            `}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSnippets.map((snippet) => (
              <SnippetCard
                key={snippet._id}
                snippet={snippet}
                onRequestDelete={() => setSnippetToDelete(snippet)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {snippetToDelete && (
          <DeleteSnippetModal
            snippet={snippetToDelete}
            onClose={() => setSnippetToDelete(null)}
          />
        )}
      </div>
    </div>
  );
};

export default SnippetsPage;
