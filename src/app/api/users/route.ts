import { NextResponse } from "next/server";

import { API_KEY } from "@/app/api";

export async function GET() {
  const res = await fetch("https://plx-hiring-api.fly.dev/api/users", {
    method: "GET",
    headers: {
      "X-Api-Key": API_KEY,
    },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
