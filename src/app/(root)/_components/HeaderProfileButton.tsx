"use client";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import ModernButton from "../../../utils/ModernButton";

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
          <ModernButton text="Sign In"/>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default HeaderProfileButton;
