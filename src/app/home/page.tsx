"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = ({ children }: { children: ReactNode}) => {
  const router = useRouter();
  useEffect(() => {
    router.push("/home/exchange");
  }, [router]);
  return children;
};

export default Home;
