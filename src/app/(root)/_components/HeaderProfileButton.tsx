"use client";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

const HeaderProfileButton = () => {
  return (
    <>
      <UserButton>
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
          <button className="bg-blue-500 px-4 py-1.5 rounded-lg cursor-pointer">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default HeaderProfileButton;
