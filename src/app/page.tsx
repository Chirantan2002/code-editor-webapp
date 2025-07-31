import {
  SignedOut,
  SignedIn,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="container mx-auto space-x-4">
      <SignUpButton>
        <button className="bg-red-500 p-4 font-semibold text-lg rounded-md mt-4 cursor-pointer hover:bg-purple-500 transition-colors ease-in-out duration-300">
          Sign Up
        </button>
      </SignUpButton>
      <SignOutButton>
        <button className="bg-red-500 p-4 font-semibold text-lg rounded-md mt-4 cursor-pointer hover:bg-purple-500 transition-colors ease-in-out duration-300">
          Sign Out
        </button>
      </SignOutButton>
    </div>
  );
}
