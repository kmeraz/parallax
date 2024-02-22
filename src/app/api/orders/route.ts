import { API_KEY } from "@/app/api";
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const request_body = await request.json();
  const { quote_id, user_id, from_amount } = request_body;
  const res = await fetch("https://api.fly.dev/api/orders", {
    method: "POST",
    headers: {
      "X-Api-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quote_id,
      user_id,
      from_amount,
    }),
  });
  const response = await res.json()
  return NextResponse.json(response);
}

export async function GET(request: NextRequest) {
  const user_id = request.nextUrl.searchParams.get("user_id")
  const res = await fetch(
    `https://api.fly.dev/api/users/${user_id}/orders`,
    {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    }
  );
  const response = await res.json();

  return NextResponse.json(response);
}
