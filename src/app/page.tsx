"use client";

import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/app/userContext";
import { useEffect, ReactNode } from "react";

const App = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { state: currentUser } = useCurrentUser();

  useEffect(() => {
    currentUser?.id
      ? router.push("/home/exchange")
      : router.push("/login");
  }, [currentUser.id])
  
  return children;
};

export default App;
