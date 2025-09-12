import { Blocks } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative border-t border-gray-800/50 mt-auto">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex justify-center items-center gap-2 text-gray-400">
            <Blocks className="size-4" />
            <div className="inline-flex items-center gap-2 font-mono">
              <span className="text-sm border-r-2 border-gray-600/70 pr-2">
                Copyright © {new Date().getFullYear()}
              </span>
              <span className="text-sm">Made by - Chirantan with 💓</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/support"
              className="relative after:absolute after:content-[''] after:bg-[#40c9ff]/50 after:h-[2px] after:w-0 after:left-0 after:-bottom-0.5 hover:after:w-full text-sm text-gray-400 hover:text-gray-300 after:transition-all after:duration-200 after:ease-in-out font-mono"
            >
              Support
            </Link>
            <Link
              href="/privacy"
              className="relative after:absolute after:content-[''] after:bg-[#40c9ff]/50 after:h-[2px] after:w-0 after:left-0 after:-bottom-0.5 hover:after:w-full text-sm text-gray-400 hover:text-gray-300 after:transition-all after:duration-200 after:ease-in-out font-mono"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="relative after:absolute after:content-[''] after:bg-[#40c9ff]/50 after:h-[2px] after:w-0 after:left-0 after:-bottom-0.5 hover:after:w-full text-sm text-gray-400 hover:text-gray-300 after:transition-all after:duration-200 after:ease-in-out font-mono"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
