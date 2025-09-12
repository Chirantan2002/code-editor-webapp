import { Zap } from "lucide-react";
import Link from "next/link";

export default function UpgradeButton() {
  const CHEKOUT_URL = "Payment_link";

  return (
    <div className="flex items-center justify-center">
      <Link
        href={CHEKOUT_URL}
        className="inline-flex items-center justify-center gap-2 px-4 py-4 text-green-400 hover:bg-green-400 hover:text-black font-semibold border-2 border-green-400 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out ml-auto cursor-pointer"
      >
        <Zap className="w-5 h-5" />
        Upgrade to Pro
      </Link>
    </div>
  );
}
