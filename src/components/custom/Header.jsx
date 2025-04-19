import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
function Header() {
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <div className="flex justify-between p-3 px-5 shadow-md">
      <Link href={"/"}>
        <img src="/logo.svg" width={100} height={100} alt="" />
      </Link>
      {isSignedIn ? (
        <div className="flex items-center gap-2">
          <Link href={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link href={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
