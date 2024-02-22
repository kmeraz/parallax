import { API_KEY } from "@/app/api";

import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch("https://api.fly.dev/api/quotes", {
    method: "POST",
    headers: {
      "X-Api-Key": API_KEY,
    },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
