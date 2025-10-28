"use client";
import { SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import ModernButton from "../../../utils/ModernButton";
import useMounted from "@/hooks/useMounted";

const HeaderProfileButton = () => {
  const { isSignedIn } = useUser();

  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <>
      {isSignedIn ? (
        <div className="flex items-center justify-center border-2 border-neutral-200/70 rounded-full p-0.5">
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
        </div>
      ) : (
        <SignedOut>
          <SignInButton mode="modal">
            <ModernButton text="Sign In" />
          </SignInButton>
        </SignedOut>
      )}
    </>
  );
};

export default HeaderProfileButton;
