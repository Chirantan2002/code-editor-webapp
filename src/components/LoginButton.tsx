import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

function LoginButton() {
  return (
    <div className="flex items-center justify-center">
      <SignInButton mode="modal">
        <button className="inline-flex items-center gap-2 px-6 py-4 text-green-400 hover:bg-green-400 hover:text-black font-semibold border-2 border-green-400 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out ml-auto cursor-pointer">
          <LogIn className="w-4 h-4 transition-transform" />
          <span className="tracking-wide">Sign In</span>
        </button>
      </SignInButton>
    </div>
  );
}
export default LoginButton;
