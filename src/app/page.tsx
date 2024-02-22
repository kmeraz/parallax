"use client";
import { Fragment, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/app/userContext";

const App = ({ children }: { children: any }) => {
  const router = useRouter();
  const { state: currentUser } = useCurrentUser();

  useEffect(() => {
    currentUser?.id
      ? router.push("/home/exchange")
      : router.push("/login");
  }, [currentUser.id, router])
  
  return <Fragment>{children}</Fragment>;
};

export default App;
