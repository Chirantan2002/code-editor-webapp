"use client";
import { SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import ModernButton from "../../../utils/ModernButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useMounted from "@/hooks/useMounted";

const HeaderProfileButton = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      // Redirect signed-in users to localhost:3000
      const redirectUrl =
        process.env.NEXT_PUBLIC_PRODUCTION_URI || "http://localhost:3000";
      router.push(redirectUrl);
    }
  }, [isSignedIn, router]);

  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <>
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-5 h-5",
            avatarImage: "w-5 h-5",
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <SignInButton mode="modal">
          <ModernButton text="Sign In" />
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default HeaderProfileButton;
